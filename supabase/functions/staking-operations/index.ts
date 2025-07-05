import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
}

const STAKING_APYS = {
  flexible: 8.5,
  '30_day': 12.0,
  '90_day': 18.5
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const operation = url.pathname.split('/').pop()

    switch (req.method) {
      case 'POST': {
        if (operation === 'stake') {
          const { userId, amount, poolType } = await req.json()

          // Validate user has sufficient balance
          const { data: user } = await supabase
            .from('user_profiles')
            .select('optk_balance')
            .eq('id', userId)
            .single()

          if (!user || user.optk_balance < amount) {
            throw new Error('Insufficient OPTK balance')
          }

          const apy = STAKING_APYS[poolType as keyof typeof STAKING_APYS]
          if (!apy) {
            throw new Error('Invalid pool type')
          }

          // Calculate end date for locked pools
          let endDate = null
          if (poolType === '30_day') {
            endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          } else if (poolType === '90_day') {
            endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          }

          // Create staking record
          const { data: stake, error } = await supabase
            .from('staking')
            .insert({
              user_id: userId,
              amount,
              pool_type: poolType,
              apy,
              end_date: endDate,
              status: 'active'
            })
            .select()
            .single()

          if (error) throw error

          // Deduct from user balance
          await supabase
            .from('user_profiles')
            .update({ 
              optk_balance: user.optk_balance - amount
            })
            .eq('id', userId)

          // Create transaction record
          await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              type: 'stake',
              amount,
              transaction_hash: `stake_${stake.id}`,
              status: 'confirmed'
            })

          return new Response(
            JSON.stringify({ stake }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'unstake') {
          const { userId, stakeId } = await req.json()

          // Get staking record
          const { data: stake, error: stakeError } = await supabase
            .from('staking')
            .select('*')
            .eq('id', stakeId)
            .eq('user_id', userId)
            .eq('status', 'active')
            .single()

          if (stakeError || !stake) {
            throw new Error('Staking record not found')
          }

          // Check if locked period has ended
          if (stake.end_date && new Date(stake.end_date) > new Date()) {
            throw new Error('Staking period has not ended yet')
          }

          // Calculate final rewards
          const stakingDays = Math.floor((Date.now() - new Date(stake.start_date).getTime()) / (1000 * 60 * 60 * 24))
          const finalRewards = (stake.amount * stake.apy / 100 / 365) * stakingDays

          // Update staking record
          await supabase
            .from('staking')
            .update({
              status: 'completed',
              rewards_earned: finalRewards
            })
            .eq('id', stakeId)

          // Return staked amount + rewards to user
          const { data: user } = await supabase
            .from('user_profiles')
            .select('optk_balance')
            .eq('id', userId)
            .single()

          await supabase
            .from('user_profiles')
            .update({ 
              optk_balance: (user?.optk_balance || 0) + stake.amount + finalRewards
            })
            .eq('id', userId)

          // Create transaction record
          await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              type: 'unstake',
              amount: stake.amount + finalRewards,
              transaction_hash: `unstake_${stakeId}`,
              status: 'confirmed'
            })

          return new Response(
            JSON.stringify({ 
              amount_returned: stake.amount,
              rewards_earned: finalRewards,
              total: stake.amount + finalRewards
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'claim-rewards') {
          const { userId, stakeId } = await req.json()

          // Get staking record
          const { data: stake, error: stakeError } = await supabase
            .from('staking')
            .select('*')
            .eq('id', stakeId)
            .eq('user_id', userId)
            .eq('status', 'active')
            .single()

          if (stakeError || !stake) {
            throw new Error('Staking record not found')
          }

          // Calculate rewards since last claim
          const daysSinceLastReward = Math.floor((Date.now() - new Date(stake.last_reward_date).getTime()) / (1000 * 60 * 60 * 24))
          const newRewards = (stake.amount * stake.apy / 100 / 365) * daysSinceLastReward

          if (newRewards <= 0) {
            throw new Error('No rewards available to claim')
          }

          // Update staking record
          await supabase
            .from('staking')
            .update({
              rewards_earned: stake.rewards_earned + newRewards,
              last_reward_date: new Date().toISOString()
            })
            .eq('id', stakeId)

          // Add rewards to user balance
          const { data: user } = await supabase
            .from('user_profiles')
            .select('optk_balance')
            .eq('id', userId)
            .single()

          await supabase
            .from('user_profiles')
            .update({ 
              optk_balance: (user?.optk_balance || 0) + newRewards
            })
            .eq('id', userId)

          // Create transaction record
          await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              type: 'mining_reward',
              amount: newRewards,
              transaction_hash: `staking_reward_${stakeId}_${Date.now()}`,
              status: 'confirmed'
            })

          return new Response(
            JSON.stringify({ rewards_claimed: newRewards }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }

      case 'GET': {
        if (operation === 'user-stakes') {
          const userId = url.searchParams.get('userId')
          
          const { data: stakes, error } = await supabase
            .from('staking')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(
            JSON.stringify({ stakes }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid operation' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  } catch (err) {
    console.error('Staking operation error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
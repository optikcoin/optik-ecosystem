import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
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
        if (operation === 'start-mining') {
          const { userId, poolName = 'OPTK Main Pool' } = await req.json()

          // Check if user already has active mining
          const { data: existingMining } = await supabase
            .from('mining')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single()

          if (existingMining) {
            throw new Error('Mining already active')
          }

          // Create or update mining record
          const { data: mining, error } = await supabase
            .from('mining')
            .upsert({
              user_id: userId,
              pool_name: poolName,
              status: 'active',
              hash_rate: 0,
              earnings_today: 0,
              last_mining_date: new Date().toISOString()
            })
            .select()
            .single()

          if (error) throw error

          return new Response(
            JSON.stringify({ mining, message: 'Mining started successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'stop-mining') {
          const { userId } = await req.json()

          const { error } = await supabase
            .from('mining')
            .update({ 
              status: 'inactive',
              hash_rate: 0
            })
            .eq('user_id', userId)

          if (error) throw error

          return new Response(
            JSON.stringify({ message: 'Mining stopped successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'claim-mining-rewards') {
          const { userId } = await req.json()

          // Get mining record
          const { data: mining, error: miningError } = await supabase
            .from('mining')
            .select('*')
            .eq('user_id', userId)
            .single()

          if (miningError || !mining) {
            throw new Error('Mining record not found')
          }

          if (mining.earnings_today <= 0) {
            throw new Error('No rewards available to claim')
          }

          // Add earnings to user balance
          const { data: user } = await supabase
            .from('user_profiles')
            .select('optk_balance')
            .eq('id', userId)
            .single()

          await supabase
            .from('user_profiles')
            .update({ 
              optk_balance: (user?.optk_balance || 0) + mining.earnings_today
            })
            .eq('id', userId)

          // Update mining record
          await supabase
            .from('mining')
            .update({
              total_earnings: mining.total_earnings + mining.earnings_today,
              earnings_today: 0
            })
            .eq('user_id', userId)

          // Create transaction record
          await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              type: 'mining_reward',
              amount: mining.earnings_today,
              transaction_hash: `mining_${userId}_${Date.now()}`,
              status: 'confirmed'
            })

          return new Response(
            JSON.stringify({ 
              rewards_claimed: mining.earnings_today,
              message: 'Mining rewards claimed successfully'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }

      case 'PUT': {
        if (operation === 'update-mining-stats') {
          const { userId, hashRate, earningsToday } = await req.json()

          const { error } = await supabase
            .from('mining')
            .update({
              hash_rate: hashRate,
              earnings_today: earningsToday,
              last_mining_date: new Date().toISOString()
            })
            .eq('user_id', userId)

          if (error) throw error

          return new Response(
            JSON.stringify({ message: 'Mining stats updated successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }

      case 'GET': {
        if (operation === 'user-mining') {
          const userId = url.searchParams.get('userId')
          
          const { data: mining, error } = await supabase
            .from('mining')
            .select('*')
            .eq('user_id', userId)
            .single()

          if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            throw error
          }

          return new Response(
            JSON.stringify({ mining: mining || null }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'mining-stats') {
          // Get global mining statistics
          const { data: stats, error } = await supabase
            .from('mining')
            .select('hash_rate, total_earnings, status')

          if (error) throw error

          const totalHashRate = stats?.reduce((sum, m) => sum + (m.hash_rate || 0), 0) || 0
          const activeMiners = stats?.filter(m => m.status === 'active').length || 0
          const totalEarnings = stats?.reduce((sum, m) => sum + (m.total_earnings || 0), 0) || 0

          return new Response(
            JSON.stringify({ 
              total_hash_rate: totalHashRate,
              active_miners: activeMiners,
              total_earnings: totalEarnings
            }),
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
    console.error('Mining operation error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
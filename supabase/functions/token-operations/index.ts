import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
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
        if (operation === 'create') {
          const { 
            userId, 
            name, 
            symbol, 
            description, 
            totalSupply, 
            decimals,
            imageUrl,
            websiteUrl,
            telegramUrl,
            twitterUrl,
            liquidityPoolSol,
            liquidityPoolTokens
          } = await req.json()

          // Validate user has active subscription
          const { data: user } = await supabase
            .from('user_profiles')
            .select('subscription_tier, subscription_status')
            .eq('id', userId)
            .single()

          if (!user || user.subscription_status !== 'active') {
            throw new Error('Active subscription required to create tokens')
          }

          // Generate mock contract address (in real implementation, this would deploy to blockchain)
          const contractAddress = `${symbol.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

          // Create token record
          const { data: token, error } = await supabase
            .from('tokens')
            .insert({
              creator_id: userId,
              name,
              symbol: symbol.toUpperCase(),
              description,
              total_supply: totalSupply,
              decimals,
              contract_address: contractAddress,
              image_url: imageUrl,
              website_url: websiteUrl,
              telegram_url: telegramUrl,
              twitter_url: twitterUrl,
              liquidity_pool_sol: liquidityPoolSol,
              liquidity_pool_tokens: liquidityPoolTokens,
              status: 'pending',
              launch_date: new Date().toISOString()
            })
            .select()
            .single()

          if (error) throw error

          // Create initial transaction record
          await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              token_id: token.id,
              type: 'buy',
              amount: liquidityPoolTokens,
              price: liquidityPoolSol / liquidityPoolTokens,
              total_value: liquidityPoolSol,
              transaction_hash: `deploy_${contractAddress}`,
              status: 'confirmed'
            })

          return new Response(
            JSON.stringify({ token, contract_address: contractAddress }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'trade') {
          const { userId, tokenId, type, amount, price } = await req.json()

          const totalValue = amount * price
          const fee = totalValue * 0.003 // 0.3% fee

          // Create transaction record
          const { data: transaction, error } = await supabase
            .from('transactions')
            .insert({
              user_id: userId,
              token_id: tokenId,
              type,
              amount,
              price,
              total_value: totalValue,
              fee,
              transaction_hash: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              status: 'confirmed'
            })
            .select()
            .single()

          if (error) throw error

          // Update user's OPTK balance (simplified)
          if (type === 'sell') {
            await supabase
              .from('user_profiles')
              .update({ 
                optk_balance: supabase.raw(`optk_balance + ${totalValue - fee}`)
              })
              .eq('id', userId)
          }

          return new Response(
            JSON.stringify({ transaction }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }

      case 'GET': {
        if (operation === 'list') {
          const { data: tokens, error } = await supabase
            .from('tokens')
            .select(`
              *,
              user_profiles!creator_id (
                first_name,
                last_name,
                email
              )
            `)
            .eq('status', 'active')
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(
            JSON.stringify({ tokens }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (operation === 'user-tokens') {
          const userId = url.searchParams.get('userId')
          
          const { data: tokens, error } = await supabase
            .from('tokens')
            .select('*')
            .eq('creator_id', userId)
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(
            JSON.stringify({ tokens }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        break
      }

      case 'PUT': {
        if (operation === 'update-price') {
          const { tokenId, newPrice, volume24h, priceChange24h } = await req.json()

          const { error } = await supabase
            .from('tokens')
            .update({
              current_price: newPrice,
              trading_volume_24h: volume24h,
              price_change_24h: priceChange24h,
              updated_at: new Date().toISOString()
            })
            .eq('id', tokenId)

          if (error) throw error

          return new Response(
            JSON.stringify({ success: true }),
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
    console.error('Token operation error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
/**
 * Supabase Edge Function for new quote notifications
 * Sends notifications when a new solar quote is submitted
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { quoteId } = await req.json()

    // Fetch the quote details
    const { data: quote, error } = await supabaseClient
      .from('solar_quotes')
      .select('*')
      .eq('id', quoteId)
      .single()

    if (error) {
      throw error
    }

    // Here you would typically send an email notification
    // For now, we'll just log the quote details
    console.log('New quote received:', {
      id: quote.id,
      name: quote.name,
      email: quote.email,
      property_type: quote.property_type,
      energy_bill: quote.energy_bill,
    })

    // You could integrate with email services like:
    // - SendGrid
    // - Resend
    // - AWS SES
    // - Mailgun

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
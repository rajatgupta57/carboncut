import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Only POST method allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(
    Deno.env.get('PUBLIC_SUPABASE_URL')!,
    Deno.env.get('PUBLIC_SUPABASE_ANON_KEY')!
  )

  try {
    const input = await req.json()

    // Basic required field check
    if (!input.user_session_id || !input.timestamp) {
      return new Response(JSON.stringify({ success: false, message: 'Missing session_id or timestamp' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { data, error } = await supabase
      .from('carbon_footprint_records')
      .insert([input])
      .select('id, total_emissions, eco_score, timestamp')
      .single()

    if (error) {
      console.error(error)
      return new Response(JSON.stringify({ success: false, message: 'Database error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        message: 'Calculation saved successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, message: 'Invalid JSON or server error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})

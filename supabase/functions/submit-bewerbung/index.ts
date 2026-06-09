import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MINUTES = 30;

async function checkRateLimit(supabase: ReturnType<typeof createClient>, ip: string, endpoint: string): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);

  const { data: existing } = await supabase
    .from('rate_limits')
    .select('id, request_count, window_start')
    .eq('ip_address', ip)
    .eq('endpoint', endpoint)
    .single();

  if (!existing) {
    await supabase.from('rate_limits').insert({
      ip_address: ip, endpoint, request_count: 1, window_start: now.toISOString()
    });
    return false;
  }

  if (new Date(existing.window_start) < windowStart) {
    await supabase.from('rate_limits').update({
      request_count: 1, window_start: now.toISOString()
    }).eq('id', existing.id);
    return false;
  }

  if (existing.request_count >= RATE_LIMIT_MAX) return true;

  await supabase.from('rate_limits').update({
    request_count: existing.request_count + 1
  }).eq('id', existing.id);
  return false;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     req.headers.get('x-real-ip') || 'unknown';

    if (await checkRateLimit(supabase, clientIP, 'submit-bewerbung')) {
      return new Response(JSON.stringify({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }), {
        status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const ausbildungsphase = typeof body.ausbildungsphase === 'string' ? body.ausbildungsphase.trim() : '';

    if (name.length < 2 || name.length > 100) {
      return new Response(JSON.stringify({ error: 'Name muss zwischen 2 und 100 Zeichen lang sein.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    if (!/^[+]?[0-9\s()\-]{6,30}$/.test(phone)) {
      return new Response(JSON.stringify({ error: 'Ungültige Telefonnummer.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: 'Ungültige E-Mail-Adresse.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    if (ausbildungsphase.length > 500) {
      return new Response(JSON.stringify({ error: 'Text zu lang.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('bewerbungen')
      .insert([{
        name: name.slice(0, 100),
        phone: phone.slice(0, 30),
        email: email.slice(0, 255),
        ausbildungsphase: ausbildungsphase.slice(0, 500) || null,
        position: 'Fahrlehreranwärter Praktikum',
        source: 'karriere',
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ error: 'Fehler beim Speichern.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Email notification — best-effort; logs only if no provider configured.
    try {
      await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'bewerbung-notification',
          recipientEmail: 'potsdam@fahrschuleabf.de',
          idempotencyKey: `bewerbung-${data.id}`,
          templateData: { name, phone, email, ausbildungsphase },
        },
      }).catch((e) => console.log('Email notification skipped:', e?.message));
    } catch (e) {
      console.log('Email notification not configured:', (e as Error).message);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Ein unerwarteter Fehler ist aufgetreten.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

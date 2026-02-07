import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RATE_LIMIT_MAX = 10; // Max submissions per window
const RATE_LIMIT_WINDOW_MINUTES = 30; // 30 min window

// Persistent rate limiting using database
async function checkRateLimit(supabase: ReturnType<typeof createClient>, ip: string, endpoint: string): Promise<{ limited: boolean; error?: string }> {
  try {
    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);

    // Try to get existing rate limit record
    const { data: existingRecord, error: selectError } = await supabase
      .from('rate_limits')
      .select('id, request_count, window_start')
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      console.error('Rate limit select error:', selectError);
      // Fail open - allow request but log the error
      return { limited: false };
    }

    if (!existingRecord) {
      // No record exists, create new one
      const { error: insertError } = await supabase
        .from('rate_limits')
        .insert({
          ip_address: ip,
          endpoint: endpoint,
          request_count: 1,
          window_start: now.toISOString()
        });

      if (insertError) {
        console.error('Rate limit insert error:', insertError);
        return { limited: false }; // Fail open
      }
      return { limited: false };
    }

    // Check if window has expired
    const recordWindowStart = new Date(existingRecord.window_start);
    if (recordWindowStart < windowStart) {
      // Window expired, reset the counter
      const { error: updateError } = await supabase
        .from('rate_limits')
        .update({
          request_count: 1,
          window_start: now.toISOString()
        })
        .eq('id', existingRecord.id);

      if (updateError) {
        console.error('Rate limit update error:', updateError);
        return { limited: false }; // Fail open
      }
      return { limited: false };
    }

    // Window still active, check count
    if (existingRecord.request_count >= RATE_LIMIT_MAX) {
      return { limited: true };
    }

    // Increment counter
    const { error: incrementError } = await supabase
      .from('rate_limits')
      .update({ request_count: existingRecord.request_count + 1 })
      .eq('id', existingRecord.id);

    if (incrementError) {
      console.error('Rate limit increment error:', incrementError);
      return { limited: false }; // Fail open
    }

    return { limited: false };
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { limited: false }; // Fail open on unexpected errors
  }
}

// Server-side validation
function validateLeadData(data: unknown): { valid: boolean; error?: string; sanitized?: Record<string, unknown> } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, phone, license_class, source, email, message, utm_source, utm_medium, utm_campaign } = data as Record<string, unknown>;

  // Name validation
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: 'Name muss zwischen 2 und 100 Zeichen lang sein' };
  }

  // Phone validation
  if (typeof phone !== 'string' || !/^[+]?[0-9\s()\-]{6,30}$/.test(phone.trim())) {
    return { valid: false, error: 'Ungültige Telefonnummer' };
  }

  // License class validation
  const validLicenseClasses = ['b', 'a1', 'a2', 'a', 'be', 'B', 'A1', 'A2', 'A', 'BE'];
  if (license_class && !validLicenseClasses.includes(license_class as string)) {
    return { valid: false, error: 'Ungültige Führerscheinklasse' };
  }

  // Source validation - allow base sources and their variants
  const validSourcePrefixes = ['homepage', 'landingpage', 'kontakt'];
  if (source && typeof source === 'string') {
    const sourceBase = source.split('-')[0];
    if (!validSourcePrefixes.includes(sourceBase)) {
      return { valid: false, error: 'Ungültige Quelle' };
    }
  }

  // Optional email validation
  if (email && typeof email === 'string' && email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.trim().length > 255) {
      return { valid: false, error: 'Ungültige E-Mail-Adresse' };
    }
  }

  // Optional message validation
  if (message && (typeof message !== 'string' || message.trim().length > 1000)) {
    return { valid: false, error: 'Nachricht darf maximal 1000 Zeichen lang sein' };
  }

  // UTM parameter validation (max length)
  const utmParams = { utm_source, utm_medium, utm_campaign };
  for (const [key, value] of Object.entries(utmParams)) {
    if (value && (typeof value !== 'string' || value.length > 200)) {
      return { valid: false, error: `${key} darf maximal 200 Zeichen lang sein` };
    }
  }

  return {
    valid: true,
    sanitized: {
      name: (name as string).trim().slice(0, 100),
      phone: (phone as string).trim().slice(0, 30),
      license_class: license_class ? (license_class as string).toLowerCase() : null,
      source: source || 'landingpage',
      email: email ? (email as string).trim().slice(0, 255) : null,
      message: message ? (message as string).trim().slice(0, 1000) : null,
      utm_source: utm_source ? (utm_source as string).slice(0, 200) : null,
      utm_medium: utm_medium ? (utm_medium as string).slice(0, 200) : null,
      utm_campaign: utm_campaign ? (utm_campaign as string).slice(0, 200) : null,
      consent: true,
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Create Supabase client with service role for rate limiting and insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit using persistent database storage
    const rateLimitResult = await checkRateLimit(supabase, clientIP, 'submit-lead');
    if (rateLimitResult.limited) {
      return new Response(
        JSON.stringify({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and sanitize input
    const validation = validateLeadData(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert the lead
    const { data, error } = await supabase
      .from('leads')
      .insert([validation.sanitized])
      .select('id')
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return new Response(
        JSON.stringify({ error: 'Fehler beim Speichern. Bitte versuchen Sie es erneut.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Ein unerwarteter Fehler ist aufgetreten.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

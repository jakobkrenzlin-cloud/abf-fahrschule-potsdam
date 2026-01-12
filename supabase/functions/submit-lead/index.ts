import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting (per instance - sufficient for basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 5; // Max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  record.count++;
  return false;
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

  // Source validation
  const validSources = ['homepage', 'landingpage', 'kontakt'];
  if (source && !validSources.includes(source as string)) {
    return { valid: false, error: 'Ungültige Quelle' };
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
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (isRateLimited(clientIP)) {
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

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

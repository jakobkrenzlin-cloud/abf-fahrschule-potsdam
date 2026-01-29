-- Remove the overly permissive INSERT policy on leads table
-- The submit-lead Edge Function uses the service role key which bypasses RLS,
-- so we don't need an anon INSERT policy. This prevents direct database spam.

DROP POLICY IF EXISTS "leads_insert_only_anon" ON public.leads;
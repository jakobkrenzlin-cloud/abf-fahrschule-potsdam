-- Fix: Change restrictive policy to permissive for anonymous lead inserts
DROP POLICY IF EXISTS "leads_insert_only_anon" ON public.leads;

CREATE POLICY "leads_insert_only_anon" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
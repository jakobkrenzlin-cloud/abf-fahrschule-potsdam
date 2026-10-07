ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS appointment_start timestamptz NULL,
  ADD COLUMN IF NOT EXISTS appointment_status text NULL,
  ADD COLUMN IF NOT EXISTS form_variant text NULL,
  ADD COLUMN IF NOT EXISTS reminded_at timestamptz NULL;

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_appointment_status_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_appointment_status_check
  CHECK (appointment_status IS NULL OR appointment_status IN ('gebucht','bestaetigt','erschienen','angemeldet','nicht_erschienen','abgesagt'));
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_form_variant_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_form_variant_check
  CHECK (form_variant IS NULL OR form_variant IN ('booking','classic','booking_fallback'));
CREATE INDEX IF NOT EXISTS leads_appointment_start_idx ON public.leads (appointment_start);

CREATE TABLE IF NOT EXISTS public.booking_blocked_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day date NOT NULL UNIQUE,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_blocked_days ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.booking_blocked_days FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_blocked_days TO authenticated;
GRANT ALL ON public.booking_blocked_days TO service_role;

CREATE POLICY "Admins can view blocked days" ON public.booking_blocked_days
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert blocked days" ON public.booking_blocked_days
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update blocked days" ON public.booking_blocked_days
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete blocked days" ON public.booking_blocked_days
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.get_blocked_days()
RETURNS SETOF date
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT day FROM public.booking_blocked_days
  WHERE day >= (now() AT TIME ZONE 'Europe/Berlin')::date
  ORDER BY day;
$$;
REVOKE ALL ON FUNCTION public.get_blocked_days() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_blocked_days() TO anon, authenticated, service_role;
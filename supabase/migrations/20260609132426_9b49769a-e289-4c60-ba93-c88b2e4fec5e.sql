CREATE TABLE public.bewerbungen (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  ausbildungsphase text,
  position text DEFAULT 'Fahrlehreranwärter Praktikum',
  source text DEFAULT 'karriere'
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bewerbungen TO authenticated;
GRANT ALL ON public.bewerbungen TO service_role;

ALTER TABLE public.bewerbungen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view bewerbungen"
ON public.bewerbungen FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update bewerbungen"
ON public.bewerbungen FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete bewerbungen"
ON public.bewerbungen FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));
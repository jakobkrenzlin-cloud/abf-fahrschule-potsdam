
ALTER TABLE public.bewerbungen 
  ADD COLUMN IF NOT EXISTS nachricht text;

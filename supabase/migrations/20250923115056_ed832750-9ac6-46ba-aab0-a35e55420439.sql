-- Create leads table to store contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT,
  phone TEXT,
  license_class TEXT,
  email TEXT,
  message TEXT,
  source TEXT DEFAULT 'landingpage',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  consent BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for contact forms)
CREATE POLICY "leads_insert_only_anon" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance on created_at
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
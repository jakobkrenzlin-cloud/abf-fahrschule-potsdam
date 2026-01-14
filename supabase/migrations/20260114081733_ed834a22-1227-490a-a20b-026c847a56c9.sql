-- Create rate_limits table for persistent rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address text NOT NULL,
    endpoint text NOT NULL,
    request_count integer NOT NULL DEFAULT 1,
    window_start timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create unique constraint for IP + endpoint combination
CREATE UNIQUE INDEX IF NOT EXISTS rate_limits_ip_endpoint_idx ON public.rate_limits(ip_address, endpoint);

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx ON public.rate_limits(window_start);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access - only service role can manage rate limits
-- This table is only accessed by edge functions using service role key

-- Create function to cleanup old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_expired_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    DELETE FROM public.rate_limits 
    WHERE window_start < now() - interval '2 hours';
$$;
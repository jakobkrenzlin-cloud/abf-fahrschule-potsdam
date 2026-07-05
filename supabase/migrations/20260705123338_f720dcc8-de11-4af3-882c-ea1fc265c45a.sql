create table if not exists public.lead_log (
  id uuid primary key,
  created_at timestamptz not null,
  source text, license_class text,
  gclid text, wbraid text, gbraid text,
  utm_source text, utm_medium text, utm_campaign text
);
grant select on public.lead_log to authenticated;
grant all on public.lead_log to service_role;
alter table public.lead_log enable row level security;
create policy "Only admins can view lead_log" on public.lead_log for select using (has_role(auth.uid(), 'admin'::app_role));

create or replace function public.log_lead() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.lead_log (id, created_at, source, license_class, gclid, wbraid, gbraid, utm_source, utm_medium, utm_campaign)
  values (new.id, new.created_at, new.source, new.license_class, new.gclid, new.wbraid, new.gbraid, new.utm_source, new.utm_medium, new.utm_campaign)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists trg_log_lead on public.leads;
create trigger trg_log_lead after insert on public.leads
for each row execute function public.log_lead();

insert into public.lead_log (id, created_at, source, license_class, gclid, wbraid, gbraid, utm_source, utm_medium, utm_campaign)
select id, created_at, source, license_class, gclid, wbraid, gbraid, utm_source, utm_medium, utm_campaign
from public.leads
on conflict (id) do nothing;

alter table public.leads add column if not exists status text not null default 'neu';
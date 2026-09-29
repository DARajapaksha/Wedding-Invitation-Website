create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  attendance text not null check (attendance in ('yes', 'no')),
  guests integer not null default 1 check (guests between 1 and 10),
  meal text,
  message text,
  guest_token text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps(created_at desc);

-- The application uses the Supabase service-role key from Vercel Functions.
-- Keep the table inaccessible to the public anon role.
alter table public.rsvps enable row level security;

create policy "service role only"
on public.rsvps
as permissive
for all
to service_role
using (true)
with check (true);

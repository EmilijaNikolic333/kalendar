-- Pokrenuti jednom u Supabase: SQL Editor -> New query -> Run

create table if not exists public.obaveze (
  id text primary key,
  text text not null,
  "date" text not null,  -- "2026-10-30"
  "time" text not null,  -- "18:15"
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- Svi mogu da gledaju obaveze, a menja ih samo prijavljena vlasnica
-- (email mora biti isti kao OWNER_EMAIL u src/lib/supabase.js)
alter table public.obaveze enable row level security;

create policy "svi citaju" on public.obaveze for select using (true);
create policy "vlasnica dodaje" on public.obaveze for insert to authenticated
  with check (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');
create policy "vlasnica menja" on public.obaveze for update to authenticated
  using (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com')
  with check (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');
create policy "vlasnica brise" on public.obaveze for delete to authenticated
  using (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');

-- Da se promene sa drugih uređaja vide odmah
alter publication supabase_realtime add table public.obaveze;

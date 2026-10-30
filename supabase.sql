-- Pokrenuti jednom u Supabase: SQL Editor -> New query -> Run

create table if not exists public.obaveze (
  id text primary key,
  text text not null,
  "date" text not null,  -- "2026-10-30"
  "time" text not null,  -- "18:15"
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- Svako sa linkom sme da čita i menja obaveze (bez prijave)
alter table public.obaveze enable row level security;

create policy "svi citaju"  on public.obaveze for select using (true);
create policy "svi dodaju"  on public.obaveze for insert with check (true);
create policy "svi menjaju" on public.obaveze for update using (true) with check (true);
create policy "svi brisu"   on public.obaveze for delete using (true);

-- Da se promene sa drugih uređaja vide odmah
alter publication supabase_realtime add table public.obaveze;

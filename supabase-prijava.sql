-- Pokrenuti jednom u Supabase: SQL Editor -> New query -> Run
-- Posle ovoga svi mogu da gledaju obaveze, a menja ih samo prijavljena vlasnica.

drop policy if exists "svi dodaju"  on public.obaveze;
drop policy if exists "svi menjaju" on public.obaveze;
drop policy if exists "svi brisu"   on public.obaveze;

-- Email mora biti isti kao OWNER_EMAIL u src/lib/supabase.js
create policy "vlasnica dodaje"  on public.obaveze for insert to authenticated
  with check (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');
create policy "vlasnica menja"   on public.obaveze for update to authenticated
  using (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com')
  with check (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');
create policy "vlasnica brise"   on public.obaveze for delete to authenticated
  using (auth.jwt() ->> 'email' = 'nikolicemilija03@gmail.com');

-- ============================================================
-- CORRECTIFS · Upload d'images + Messages de contact + Dons
-- À coller dans Supabase → SQL Editor → New query → Run
-- (additif et sûr : utilise "if not exists" / "drop policy if exists")
-- ============================================================

-- ------------------------------------------------------------
-- 1) STORAGE : autoriser l'upload dans le bucket "medias"
--    (lecture publique + écriture pour comptes connectés)
-- ------------------------------------------------------------
-- Au cas où le bucket n'existe pas encore, on le crée (public)
insert into storage.buckets (id, name, public)
values ('medias', 'medias', true)
on conflict (id) do update set public = true;

drop policy if exists "medias lecture publique" on storage.objects;
create policy "medias lecture publique"
  on storage.objects for select
  using (bucket_id = 'medias');

drop policy if exists "medias upload connectes" on storage.objects;
create policy "medias upload connectes"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'medias');

drop policy if exists "medias maj connectes" on storage.objects;
create policy "medias maj connectes"
  on storage.objects for update to authenticated
  using (bucket_id = 'medias');

drop policy if exists "medias suppr connectes" on storage.objects;
create policy "medias suppr connectes"
  on storage.objects for delete to authenticated
  using (bucket_id = 'medias');

-- ------------------------------------------------------------
-- 2) MESSAGES DE CONTACT : le public envoie, l'admin lit/gère
-- ------------------------------------------------------------
alter table messages_contact enable row level security;

drop policy if exists "contact envoi public" on messages_contact;
create policy "contact envoi public"
  on messages_contact for insert
  with check (true);

drop policy if exists "contact lecture connectes" on messages_contact;
create policy "contact lecture connectes"
  on messages_contact for select to authenticated
  using (true);

drop policy if exists "contact gestion connectes" on messages_contact;
create policy "contact gestion connectes"
  on messages_contact for all to authenticated
  using (true) with check (true);

-- ------------------------------------------------------------
-- 3) DONS : le public enregistre un don, l'admin consulte
-- ------------------------------------------------------------
alter table dons enable row level security;

drop policy if exists "don envoi public" on dons;
create policy "don envoi public"
  on dons for insert
  with check (true);

drop policy if exists "don lecture connectes" on dons;
create policy "don lecture connectes"
  on dons for select to authenticated
  using (true);

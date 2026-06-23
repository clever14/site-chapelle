-- ============================================================
-- AJOUT DE MODULES · Clergé · Conseil paroissial · Mouvements
-- À coller dans Supabase → SQL Editor → New query → Run
-- (additif : ne touche pas aux tables existantes)
-- ============================================================

-- ---------- CLERGÉ ----------
create table if not exists clerge (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  fonction    text,
  photo_url   text,
  ordre       int not null default 0,
  cree_le     timestamptz not null default now()
);

-- ---------- CONSEIL PAROISSIAL ----------
create table if not exists conseil_paroissial (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  fonction    text,                 -- Président, Secrétaire, Trésorier, Membre...
  photo_url   text,
  ordre       int not null default 0,
  cree_le     timestamptz not null default now()
);

-- ---------- MOUVEMENTS & GROUPES ----------
create table if not exists mouvements (
  id                  uuid primary key default gen_random_uuid(),
  nom                 text not null,
  description         text,
  president_nom       text,
  president_contact   text,
  secretaire_nom      text,
  secretaire_contact  text,
  ordre               int not null default 0,
  cree_le             timestamptz not null default now()
);

-- ---------- SÉCURITÉ (RLS) ----------
alter table clerge             enable row level security;
alter table conseil_paroissial enable row level security;
alter table mouvements         enable row level security;

-- Lecture publique
create policy "lecture publique clerge"     on clerge             for select using (true);
create policy "lecture publique conseil"    on conseil_paroissial for select using (true);
create policy "lecture publique mouvements" on mouvements         for select using (true);

-- Écriture réservée aux comptes connectés
create policy "ecriture connectes clerge"     on clerge
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes conseil"    on conseil_paroissial
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes mouvements" on mouvements
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- DONNÉES DE DÉPART ----------
insert into clerge (nom, fonction, ordre) values
  ('Père Jean-Baptiste Koffi', 'Curé de la chapelle', 1),
  ('Père Emmanuel Aka', 'Vicaire', 2),
  ('Diacre Paul Yao', 'Diacre permanent', 3);

insert into conseil_paroissial (nom, fonction, ordre) values
  ('M. Koffi Bernard', 'Président', 1),
  ('Mme Aya Suzanne', 'Secrétaire', 2),
  ('M. Yao Vincent', 'Trésorier', 3);

insert into mouvements (nom, description, president_nom, president_contact, secretaire_nom, secretaire_contact, ordre) values
  ('Légion de Marie', 'Prière mariale et visites aux malades.', 'Mme Adjoua Marie', '+225 07 00 00 00 01', 'Mme Akissi Rose', '+225 07 00 00 00 02', 1),
  ('Chorale Sainte Cécile', 'Animation liturgique des messes.', 'M. Koffi Daniel', '+225 07 00 00 00 03', null, null, 2),
  ('Servants de messe', 'Service de l''autel.', null, null, null, null, 3);

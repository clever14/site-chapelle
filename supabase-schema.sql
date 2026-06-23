-- ============================================================
-- Supabase — Schéma base de données · Chapelle Sainte Jeanne d'Arc
-- À coller dans Supabase → SQL Editor → New query → Run
-- ============================================================

-- ---------- 1. RÔLES & PROFILS (liés à l'auth Supabase) ----------
-- Rôles : 'admin' (Administrateur), 'editeur' (Éditeur), 'moderateur' (Modérateur)
create type user_role as enum ('admin', 'editeur', 'moderateur');

create table profils (
  id          uuid primary key references auth.users(id) on delete cascade,
  nom         text not null,
  role        user_role not null default 'editeur',
  actif       boolean not null default true,
  cree_le     timestamptz not null default now()
);

-- ---------- 2. ACTUALITÉS ----------
create table actualites (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,
  extrait     text,
  contenu     text,
  categorie   text,                       -- Vie paroissiale, Annonces, Caté, Solidarité...
  image_url   text,                       -- chemin dans Supabase Storage
  statut      text not null default 'brouillon', -- 'publie' | 'brouillon'
  a_la_une    boolean not null default false,
  publie_le   date,
  cree_le     timestamptz not null default now()
);

-- ---------- 3. ÉVÉNEMENTS ----------
create table evenements (
  id            uuid primary key default gen_random_uuid(),
  titre         text not null,
  description   text,
  lieu          text,
  date_debut    timestamptz not null,
  heure_texte   text,                     -- ex. "16h00"
  categorie     text,                     -- Solennité, Sacrement, Jeunesse...
  image_url     text,
  inscription   boolean not null default false,  -- inscription facultative ?
  cree_le       timestamptz not null default now()
);

create table inscriptions_evenement (
  id            uuid primary key default gen_random_uuid(),
  evenement_id  uuid not null references evenements(id) on delete cascade,
  nom           text not null,
  contact       text,                     -- tel ou email
  cree_le       timestamptz not null default now()
);

-- ---------- 4. HORAIRES ----------
-- type : 'messe' | 'confession' | 'adoration' | 'permanence'
create table horaires (
  id          uuid primary key default gen_random_uuid(),
  type        text not null,
  jour        text not null,              -- "Lun – Vendredi", "Dimanche"...
  heure       text not null,              -- "06h30", "07h00 · 09h00 · 18h00"
  note        text,
  est_dimanche boolean not null default false, -- pour la mise en évidence
  ordre       int not null default 0
);

create table horaires_exceptions (
  id          uuid primary key default gen_random_uuid(),
  texte       text not null,
  actif       boolean not null default true,
  cree_le     timestamptz not null default now()
);

-- ---------- 5. GALERIE ----------
create table albums (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,
  theme       text,                       -- Messes, Fêtes, Baptêmes, Pèlerinages...
  couverture_url text,
  cree_le     timestamptz not null default now()
);

create table photos (
  id          uuid primary key default gen_random_uuid(),
  album_id    uuid references albums(id) on delete cascade,
  image_url   text not null,
  legende     text,
  ordre       int not null default 0,
  cree_le     timestamptz not null default now()
);

create table videos (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,
  url         text not null,              -- lien YouTube/MP4
  vignette_url text,
  cree_le     timestamptz not null default now()
);

-- ---------- 6. LIVRE D'OR (avec modération) ----------
create table temoignages (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  email       text,                       -- non publié
  texte       text not null,
  statut      text not null default 'en_attente', -- 'en_attente' | 'approuve' | 'masque'
  cree_le     timestamptz not null default now()
);

-- ---------- 7. CONTACT / DEMANDES ----------
create table messages_contact (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  email       text,
  telephone   text,
  objet       text,                       -- Sacrement, Intention de messe, Info...
  message     text not null,
  traite      boolean not null default false,
  cree_le     timestamptz not null default now()
);

-- ---------- 8. DONS (journal ; le paiement réel se fait via prestataire) ----------
create table dons (
  id          uuid primary key default gen_random_uuid(),
  montant     int not null,               -- en FCFA
  motif       text,                       -- Quête/dîme, Construction, Solidarité, Messe
  moyen       text,                       -- mobile_money | carte | virement
  nom         text,                       -- facultatif
  contact     text,
  statut      text not null default 'en_attente', -- en_attente | confirme | echoue
  reference   text,                       -- id transaction du prestataire
  cree_le     timestamptz not null default now()
);

-- ============================================================
-- SÉCURITÉ (Row Level Security)
-- Le public LIT le contenu publié ; seuls les comptes connectés ÉCRIVENT.
-- À affiner selon les rôles dans l'app.
-- ============================================================
alter table actualites enable row level security;
alter table evenements enable row level security;
alter table horaires   enable row level security;
alter table horaires_exceptions enable row level security;
alter table albums     enable row level security;
alter table photos     enable row level security;
alter table videos     enable row level security;
alter table temoignages enable row level security;

-- Lecture publique du contenu publié
create policy "lecture publique actualites" on actualites
  for select using (statut = 'publie');
create policy "lecture publique evenements" on evenements
  for select using (true);
create policy "lecture publique horaires" on horaires
  for select using (true);
create policy "lecture publique exceptions" on horaires_exceptions
  for select using (actif = true);
create policy "lecture publique albums" on albums for select using (true);
create policy "lecture publique photos" on photos for select using (true);
create policy "lecture publique videos" on videos for select using (true);
create policy "lecture publique temoignages" on temoignages
  for select using (statut = 'approuve');

-- Le public PEUT proposer un témoignage et envoyer un message (insert)
create policy "ajout temoignage public" on temoignages
  for insert with check (statut = 'en_attente');

-- Les utilisateurs connectés gèrent tout le reste (écriture)
-- (politique simple ; durcir par rôle ensuite via la table profils)
create policy "ecriture connectes actualites" on actualites
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes evenements" on evenements
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes horaires" on horaires
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes albums" on albums
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "ecriture connectes photos" on photos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "moderation temoignages" on temoignages
  for update using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE : créer un bucket public "medias" pour les images
--   Supabase → Storage → New bucket → nom "medias" → Public
--   Les colonnes image_url ci-dessus stockent le chemin dans ce bucket.
-- ============================================================

# Chapelle Sainte Jeanne d'Arc — Site web complet

Site paroissial **Next.js 14 (App Router, TypeScript) + Tailwind CSS + Supabase**
(auth + base de données + storage). Interface en français, priorité mobile.
Charte respectée : bleu marial `#22386a`, or liturgique `#c89b3c`, bordeaux `#7c2a2f`,
polices Cormorant Garamond / Mulish / IBM Plex Mono.

## ✨ Particularité : fonctionne immédiatement
Le site **s'affiche et marche dès le déploiement**, avec des données d'exemple.
Dès que vous ajoutez vos variables Supabase, il bascule **automatiquement** sur votre
vraie base (lecture, écriture, auth, upload). Rien ne casse entre les deux états.

## Pages publiques
Accueil (hero + **bandeau « prochaine messe » dynamique**), La Chapelle, Horaires
(onglets, dimanche en évidence, **export .ics**), Actualités (filtres + recherche),
Événements, Galerie (lightbox), Dons (Mobile Money par défaut, écrit en base),
Contact (formulaire → base, Appeler/WhatsApp), Livre d'or (témoignages + soumission).

## Espace admin (/admin)
Connexion Supabase, **tableau de bord** (stats), CRUD **Actualités / Événements /
Horaires / Galerie**, **modération du Livre d'or** (approuver/masquer/supprimer),
**Dons** (journal + total), **Utilisateurs** (rôles), **upload d'images** vers le bucket `medias`.
Accès protégé par middleware. En l'absence de Supabase : mode démo en lecture.

---

## 🚀 Déploiement 100 % navigateur (aucune installation)

### 1. Mettre le code sur GitHub
- github.com → **New repository** → nom `site-chapelle` → Create
- **Add file → Upload files** → glissez **le contenu** de ce dossier (pas le dossier lui-même :
  `package.json` doit être à la racine du repo) → **Commit changes**

### 2. Déployer sur Vercel
- vercel.com → **Add New → Project** → importez `site-chapelle`
- Vercel détecte Next.js → **Deploy** (il installe et build dans le cloud)
- ✅ Le site est en ligne, déjà fonctionnel avec les données d'exemple

### 3. Brancher Supabase
1. supabase.com → nouveau projet
2. **SQL Editor** → collez `supabase-schema.sql` → Run
3. **Storage → New bucket** → `medias` → **Public**
4. **Project Settings → API** → copiez *Project URL* et *anon key*
5. **Authentication → Users → Add user** → créez votre compte admin
6. Dans **Vercel → Settings → Environment Variables**, ajoutez :
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
7. **Redeploy** → le site bascule sur votre vraie base. Connectez-vous sur `/connexion`.

## À brancher plus tard (prestataires)
- Paiement Mobile Money + carte : CinetPay / PayDunya / Paystack (clés dans Vercel)
- Carte Google Maps : iframe ou Embed API
- Reçus email/SMS : Resend ou fournisseur SMS

## Structure
- `app/(site)/` pages publiques · `app/admin/` back-office · `app/connexion/` login
- `lib/queries.ts` lectures (bascule auto seed/Supabase) · `lib/actions.ts` écritures
- `lib/seed.ts` données d'exemple · `lib/supabase/` clients · `middleware.ts` protection /admin

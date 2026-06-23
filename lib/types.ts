// lib/types.ts — calqué sur supabase-schema.sql

export type UserRole = "admin" | "editeur" | "moderateur";

export type Profil = {
  id: string;
  nom: string;
  role: UserRole;
  actif: boolean;
  cree_le: string;
};

export type Actualite = {
  id: string;
  titre: string;
  extrait: string | null;
  contenu: string | null;
  categorie: string | null;
  image_url: string | null;
  statut: "publie" | "brouillon";
  a_la_une: boolean;
  publie_le: string | null;
  cree_le: string;
};

export type Evenement = {
  id: string;
  titre: string;
  description: string | null;
  lieu: string | null;
  date_debut: string;
  heure_texte: string | null;
  categorie: string | null;
  image_url: string | null;
  inscription: boolean;
  cree_le: string;
};

export type Horaire = {
  id: string;
  type: "messe" | "confession" | "adoration" | "permanence";
  jour: string;
  heure: string;
  note: string | null;
  est_dimanche: boolean;
  ordre: number;
};

export type HoraireException = {
  id: string;
  texte: string;
  actif: boolean;
  cree_le: string;
};

export type Album = {
  id: string;
  titre: string;
  theme: string | null;
  couverture_url: string | null;
  cree_le: string;
};

export type Photo = {
  id: string;
  album_id: string | null;
  image_url: string;
  legende: string | null;
  ordre: number;
  cree_le: string;
};

export type Temoignage = {
  id: string;
  nom: string;
  email: string | null;
  texte: string;
  statut: "en_attente" | "approuve" | "masque";
  cree_le: string;
};

export type MessageContact = {
  id: string;
  nom: string;
  email: string | null;
  telephone: string | null;
  objet: string | null;
  message: string;
  traite: boolean;
  cree_le: string;
};

export type Don = {
  id: string;
  montant: number;
  motif: string | null;
  moyen: string | null;
  nom: string | null;
  contact: string | null;
  statut: "en_attente" | "confirme" | "echoue";
  reference: string | null;
  cree_le: string;
};

export type Clerge = {
  id: string;
  nom: string;
  fonction: string | null;
  photo_url: string | null;
  ordre: number;
  cree_le: string;
};

export type ConseilMembre = {
  id: string;
  nom: string;
  fonction: string | null;
  photo_url: string | null;
  ordre: number;
  cree_le: string;
};

export type Mouvement = {
  id: string;
  nom: string;
  description: string | null;
  president_nom: string | null;
  president_contact: string | null;
  secretaire_nom: string | null;
  secretaire_contact: string | null;
  ordre: number;
  cree_le: string;
};

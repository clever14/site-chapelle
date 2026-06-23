// lib/seed.ts
// Données d'exemple au format des tables Supabase.
// Servies automatiquement tant que les variables d'environnement Supabase ne sont pas définies.
import type {
  Actualite, Evenement, Horaire, HoraireException,
  Album, Temoignage, Don, Profil,
  Clerge, ConseilMembre, Mouvement,
} from "./types";

const now = new Date().toISOString();

export const SEED_ACTUALITES: Actualite[] = [
  { id: "a1", titre: "Lancement de la campagne pour la nouvelle toiture", extrait: "La communauté se mobilise pour rénover la toiture de la chapelle avant la saison des pluies.", contenu: "La communauté se mobilise pour rénover la toiture de la chapelle avant la saison des pluies. Chaque contribution compte.", categorie: "Vie paroissiale", image_url: null, statut: "publie", a_la_une: true, publie_le: "2026-06-18", cree_le: now },
  { id: "a2", titre: "Inscriptions au catéchisme 2026–2027", extrait: "Les inscriptions sont ouvertes au secrétariat tous les mardis matin.", contenu: "Les inscriptions sont ouvertes au secrétariat tous les mardis matin.", categorie: "Caté", image_url: null, statut: "publie", a_la_une: false, publie_le: "2026-06-15", cree_le: now },
  { id: "a3", titre: "Distribution de vivres aux familles démunies", extrait: "Grâce à votre générosité, 40 familles du quartier ont été soutenues ce mois-ci.", contenu: "Grâce à votre générosité, 40 familles du quartier ont été soutenues ce mois-ci.", categorie: "Solidarité", image_url: null, statut: "publie", a_la_une: false, publie_le: "2026-06-10", cree_le: now },
  { id: "a4", titre: "Nouvelle chorale des jeunes", extrait: "Les répétitions ont lieu chaque samedi à 16h.", contenu: "Les répétitions ont lieu chaque samedi à 16h. Les jeunes sont les bienvenus.", categorie: "Annonces", image_url: null, statut: "brouillon", a_la_une: false, publie_le: null, cree_le: now },
];

export const SEED_EVENEMENTS: Evenement[] = [
  { id: "e1", titre: "Fête patronale de Sainte Jeanne d'Arc", description: "Messe solennelle suivie d'un repas fraternel ouvert à toute la communauté.", lieu: "Esplanade de la chapelle", date_debut: "2026-06-29T09:00:00Z", heure_texte: "09h00", categorie: "Solennité", image_url: null, inscription: false, cree_le: now },
  { id: "e2", titre: "Récollection des servants de messe", description: "Journée de formation et de prière pour les servants d'autel.", lieu: "Salle paroissiale", date_debut: "2026-07-05T08:30:00Z", heure_texte: "08h30", categorie: "Formation", image_url: null, inscription: true, cree_le: now },
  { id: "e3", titre: "Veillée de prière mariale", description: "Chapelet, louange et adoration à la lumière des bougies.", lieu: "Chapelle", date_debut: "2026-07-13T19:30:00Z", heure_texte: "19h30", categorie: "Prière", image_url: null, inscription: false, cree_le: now },
];

export const SEED_HORAIRES: Horaire[] = [
  { id: "h1", type: "messe", jour: "Lundi", heure: "06h30", note: "Messe", est_dimanche: false, ordre: 1 },
  { id: "h2", type: "messe", jour: "Mardi", heure: "06h30", note: "Messe", est_dimanche: false, ordre: 2 },
  { id: "h3", type: "messe", jour: "Mercredi", heure: "06h30", note: "Messe", est_dimanche: false, ordre: 3 },
  { id: "h4", type: "messe", jour: "Jeudi", heure: "06h30", note: "Messe", est_dimanche: false, ordre: 4 },
  { id: "h5", type: "messe", jour: "Vendredi", heure: "06h30", note: "Messe", est_dimanche: false, ordre: 5 },
  { id: "h6", type: "messe", jour: "Samedi", heure: "18h00", note: "Messe anticipée du dimanche", est_dimanche: false, ordre: 6 },
  { id: "h7", type: "messe", jour: "Dimanche", heure: "07h00 · 09h00 · 18h00", note: "Messes dominicales", est_dimanche: true, ordre: 7 },
  { id: "h8", type: "confession", jour: "Mercredi", heure: "17h00 – 18h00", note: "Sur demande aussi", est_dimanche: false, ordre: 1 },
  { id: "h9", type: "confession", jour: "Samedi", heure: "16h30 – 17h45", note: "Avant la messe anticipée", est_dimanche: false, ordre: 2 },
  { id: "h10", type: "adoration", jour: "Jeudi", heure: "19h00 – 20h00", note: "Adoration du Saint-Sacrement", est_dimanche: false, ordre: 1 },
  { id: "h11", type: "adoration", jour: "1er Vendredi", heure: "18h00 – 21h00", note: "Veillée d'adoration", est_dimanche: false, ordre: 2 },
  { id: "h12", type: "permanence", jour: "Mardi", heure: "09h00 – 12h00", note: "Secrétariat paroissial", est_dimanche: false, ordre: 1 },
  { id: "h13", type: "permanence", jour: "Jeudi", heure: "15h00 – 18h00", note: "Accueil du curé (sur rendez-vous)", est_dimanche: false, ordre: 2 },
];

export const SEED_EXCEPTIONS: HoraireException[] = [
  { id: "x1", texte: "Dimanche 29 juin : messe unique à 09h00 (fête patronale).", actif: true, cree_le: now },
];

export const SEED_ALBUMS: Album[] = [
  { id: "g1", titre: "Messe de Pâques 2026", theme: "Fêtes", couverture_url: null, cree_le: now },
  { id: "g2", titre: "Baptêmes de mai", theme: "Baptêmes", couverture_url: null, cree_le: now },
  { id: "g3", titre: "Pèlerinage diocésain", theme: "Pèlerinages", couverture_url: null, cree_le: now },
  { id: "g4", titre: "Messe dominicale", theme: "Messes", couverture_url: null, cree_le: now },
];

export const SEED_TEMOIGNAGES: Temoignage[] = [
  { id: "t1", nom: "Marie-Claire B.", email: null, texte: "Cette chapelle est ma seconde maison. L'accueil y est toujours chaleureux et la prière fervente.", statut: "approuve", cree_le: now },
  { id: "t2", nom: "Joseph K.", email: null, texte: "J'ai retrouvé la foi grâce à la communauté. Merci aux prêtres pour leur écoute.", statut: "approuve", cree_le: now },
  { id: "t3", nom: "Awa T.", email: null, texte: "Un lieu de paix au cœur de Djibi Village. Les horaires sont parfaits pour les travailleurs.", statut: "en_attente", cree_le: now },
];

export const SEED_DONS: Don[] = [
  { id: "d1", montant: 5000, motif: "Construction", moyen: "mobile_money", nom: "Anonyme", contact: null, statut: "confirme", reference: "MM-2031", cree_le: now },
  { id: "d2", montant: 10000, motif: "Quête & dîme", moyen: "carte", nom: "Famille Koné", contact: null, statut: "confirme", reference: "CB-8842", cree_le: now },
];

export const SEED_PROFILS: Profil[] = [
  { id: "p1", nom: "Administrateur", role: "admin", actif: true, cree_le: now },
];

export const SEED_CLERGE: Clerge[] = [
  { id: "c1", nom: "Père Jean-Baptiste Koffi", fonction: "Curé de la chapelle", photo_url: null, ordre: 1, cree_le: now },
  { id: "c2", nom: "Père Emmanuel Aka", fonction: "Vicaire", photo_url: null, ordre: 2, cree_le: now },
  { id: "c3", nom: "Diacre Paul Yao", fonction: "Diacre permanent", photo_url: null, ordre: 3, cree_le: now },
];

export const SEED_CONSEIL: ConseilMembre[] = [
  { id: "cp1", nom: "M. Koffi Bernard", fonction: "Président", photo_url: null, ordre: 1, cree_le: now },
  { id: "cp2", nom: "Mme Aya Suzanne", fonction: "Secrétaire", photo_url: null, ordre: 2, cree_le: now },
  { id: "cp3", nom: "M. Yao Vincent", fonction: "Trésorier", photo_url: null, ordre: 3, cree_le: now },
];

export const SEED_MOUVEMENTS: Mouvement[] = [
  { id: "m1", nom: "Légion de Marie", description: "Prière mariale et visites aux malades.", president_nom: "Mme Adjoua Marie", president_contact: "+225 07 00 00 00 01", secretaire_nom: "Mme Akissi Rose", secretaire_contact: "+225 07 00 00 00 02", ordre: 1, cree_le: now },
  { id: "m2", nom: "Chorale Sainte Cécile", description: "Animation liturgique des messes.", president_nom: "M. Koffi Daniel", president_contact: "+225 07 00 00 00 03", secretaire_nom: null, secretaire_contact: null, ordre: 2, cree_le: now },
  { id: "m3", nom: "Servants de messe", description: "Service de l'autel.", president_nom: null, president_contact: null, secretaire_nom: null, secretaire_contact: null, ordre: 3, cree_le: now },
];

export const PILIERS_MISSION = [
  { titre: "Célébrer", texte: "Vivre la liturgie et les sacrements au rythme de l'année liturgique." },
  { titre: "Servir", texte: "Accompagner les plus fragiles du quartier par des actions de solidarité concrètes." },
  { titre: "Annoncer", texte: "Transmettre la foi par le catéchisme, la formation et l'évangélisation." },
];

export const CONTACT = {
  nom: "Chapelle Sainte Jeanne d'Arc",
  adresse: "Djibi Village, Abidjan, Côte d'Ivoire",
  telephone: "+225 07 00 00 00 00",
  whatsapp: "+225 07 00 00 00 00",
  email: "contact@chapelle-jeannedarc.ci",
};

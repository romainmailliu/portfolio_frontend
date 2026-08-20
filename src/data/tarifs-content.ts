/**
 * Contenu de la page /tarifs — sites vitrines.
 * Tout le texte affiché vit ici : les composants ne font que le mettre en page.
 */

export const candidatureAnchor = "candidature";

/* ------------------------------------------------------------------ */
/* Section 1 — Headline                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Sites vitrines · Marseille et à distance",
  /** La headline est découpée pour surligner « livré en une semaine ». */
  titleLead: "Un site qui vous ressemble,",
  titleHighlight: "livré en une semaine",
  intro: "Pour les entrepreneur·e·s qui lancent, les associations et les artistes.",
  ctaLabel: "Présenter mon projet",
  /* Même formulation que la carte contact (composant Moderne). */
  ctaSubtext: "réponse sous 48h.",
} as const;

/* ------------------------------------------------------------------ */
/* Section 2 — Preuves                                                 */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  author: string;
};

export type Preuve = {
  slug: string;
  name: string;
  segment: string;
  /**
   * Reprend mot pour mot la description du projet affichée sur la home
   * (tableau PROJECTS de views/App.tsx) : même minuscule initiale, pas de
   * point final. Toute modification doit être répercutée aux deux endroits.
   */
  need: string;
  href: string;
  screenshot: string;
  screenshotAlt: string;
  surface: string;
  /**
   * Optionnel — tant qu'aucun verbatim n'a été recueilli, laisser absent.
   * La carte se rend proprement sans lui, aucun placeholder n'est affiché.
   */
  testimonial?: Testimonial;
};

export const preuves: Preuve[] = [
  {
    slug: "assolevat",
    name: "Jadin LEVAT",
    segment: "Association",
    need: "campagne citoyenne participative",
    href: "https://www.assolevat.fr/",
    screenshot: "/screens/assolevat.jpg",
    screenshotAlt: "Page d'accueil du site de la campagne citoyenne Jadin LEVAT",
    surface: "sticky-card--teal",
  },
  {
    slug: "lesonduvin",
    name: "Klink, le son du vin",
    segment: "Artiste / culture",
    need: "dégustation fun",
    href: "https://www.lesonduvin.fr/",
    screenshot: "/screens/lesonduvin.jpg",
    screenshotAlt: "Page d'accueil du site Klink, le son du vin",
    surface: "sticky-card--blush",
  },
  {
    slug: "albanedharcourt",
    name: "Albane",
    segment: "Entrepreneur",
    need: "site vitrine coaching & facilitation",
    href: "https://www.albanedharcourt.com/",
    screenshot: "/screens/albanedharcourt.jpg",
    screenshotAlt: "Page d'accueil du site d'Albane, coaching et facilitation",
    surface: "sticky-card--mint",
  },
];

export const preuvesHeading = "Quelques exemples";

/* ------------------------------------------------------------------ */
/* Section 3 — Tarifs                                                  */
/* ------------------------------------------------------------------ */

export type Offre = {
  slug: string;
  name: string;
  detail: string;
  price: string;
  badge?: string;
  /** Ligne d'accroche affichée sous l'offre. */
  hook?: string;
  featured?: boolean;
};

export const offres: Offre[] = [
  {
    slug: "renovation",
    name: "Rénovation",
    detail:
      "Votre site existe mais il a vieilli. Je le reprends : design actualisé, mobile, rapide. Vos contenus sont conservés.",
    price: "300 €",
  },
  {
    slug: "creation",
    name: "Création",
    detail:
      "Un site vitrine sur mesure, de la maquette à la mise en ligne. Nom de domaine, mobile, référencement de base.",
    price: "400 €",
  },
  {
    slug: "creation-modifiable",
    name: "Création modifiable",
    detail:
      "Le même site, plus l'autonomie : vous modifiez textes, images et contenus vous-même, en deux minutes, sans m'attendre.",
    price: "500 €",
    badge: "Recommandé",
    hook: "Nouvelle date, nouvelle œuvre, nouvelle photo : vous publiez vous-même.",
    featured: true,
  },
];

export const offresHeading = "Tarifs";

/**
 * Matrice de comparaison — une ligne par prestation, une colonne par offre.
 * L'ordre des booléens suit celui du tableau `offres` ci-dessus.
 * Décomposition des trois descriptifs d'offre et du bloc « inclus dans tous
 * les forfaits » : rien n'y est ajouté.
 */
export type OffreFeature = {
  label: string;
  included: [boolean, boolean, boolean];
  /** Précision affichée en petit sous le libellé. */
  note?: string;
};

export const offreFeatures: OffreFeature[] = [
  { label: "Reprise de votre site existant", included: [true, false, false] },
  { label: "Vos contenus actuels conservés", included: [true, false, false] },
  { label: "Maquette sur mesure", included: [false, true, true] },
  { label: "Mise en ligne", included: [true, true, true] },
  { label: "Version mobile", included: [true, true, true] },
  { label: "Référencement de base", included: [true, true, true] },
  { label: "Formulaire de contact", included: [true, true, true] },
  {
    label: "Nom de domaine configuré",
    note: "achat du nom de domaine à votre charge, ~15 €/an",
    included: [false, true, true],
  },
  { label: "2 tours de retours", included: [true, true, true] },
  { label: "2 mois de maintenance offerts", included: [true, true, true] },
  {
    label: "Vous modifiez textes, images et contenus vous-même",
    included: [false, false, true],
  },
];

export const mentions = {
  included: {
    label: "Inclus dans tous les forfaits",
    body: "mise en ligne, version mobile, référencement de base, formulaire de contact, 2 mois de maintenance offerts.",
  },
  revisions: "2 tours de retours inclus. Au-delà : 70 €/h.",
  excluded: {
    label: "Non inclus",
    body: "rédaction des contenus, photos et visuels, nom de domaine (~15 €/an), emails professionnels, traductions, fonctionnalités sur mesure (réservation, paiement, boutique). Sur devis, prix annoncé avant.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Section 4 — Maintenance                                             */
/* ------------------------------------------------------------------ */

export const maintenance = {
  heading: "Maintenance",
  price: "120 €/an",
  freeMonths: "Les 2 premiers mois sont offerts.",
  headline: "Votre site reste en ligne, à jour et sauvegardé.",
  headlineDetail:
    "Hébergement, mises à jour de sécurité, sauvegardes automatiques, surveillance.",
  bonusTitle: "Modifications illimitées sur l'existant.",
  bonusDetail:
    "Changer un texte, remplacer une photo, mettre à jour vos horaires ou vos tarifs, ajuster une couleur, ajouter une actualité, un projet, un membre de l'équipe. Si ça existe déjà sur votre site, c'est inclus.",
  sla: "Demandes par email, traitées sous 5 jours ouvrés.",
  slaUrgent: "Besoin urgent, traité sous 24h : 50 €.",
} as const;

export const payAsYouGo = {
  title: "Vous préférez payer à l'usage ?",
  items: [
    "Pack 5 modifications — 50 €, valable 12 mois.",
    "Nouvelle page — 50 €.",
    "Nouvelle fonctionnalité (réservation, paiement, newsletter, multilingue) — sur devis.",
  ],
} as const;

export const paymentNote =
  "Paiement par carte (Stripe) ou par virement sur facture.";

/* ------------------------------------------------------------------ */
/* Formulaire de candidature                                           */
/* ------------------------------------------------------------------ */

export const PROFILE_OPTIONS = [
  "Entrepreneur·e",
  "Association",
  "Artiste",
  "Autre",
] as const;

export const LOOKING_FOR_OPTIONS = [
  "Rénovation",
  "Création",
  "Création modifiable",
  "Je ne sais pas encore",
] as const;

export const NEEDS_OPTIONS = [
  "Pages de présentation",
  "Formulaire de contact",
  "Actualités / blog",
  "Galerie photo",
  "Agenda ou dates",
  "Réservation en ligne",
  "Boutique / paiement",
  "Espace membre",
  "Multilingue",
] as const;

export const CONTENT_READINESS_OPTIONS = [
  "Prêts",
  "À moitié prêts",
  "Pas commencés",
] as const;

export const TIMELINE_OPTIONS = [
  "Dans 2 semaines",
  "Dans un mois",
  "Dans 2–3 mois",
  "Pas de date fixe",
] as const;

export const BUDGET_FIT_OPTIONS = [
  "Oui",
  "Oui, mais j'ai des questions",
  "Non",
] as const;

export const formCopy = {
  heading: "Présenter mon projet",
  intro:
    "Vous répondez sur trois écrans et vous envoyez à la fin. Rien ne part avant.",
  steps: [
    { title: "Vous", legend: "Qui vous êtes" },
    { title: "Le projet", legend: "Ce que vous voulez construire" },
    { title: "Le cadrage", legend: "Contenus, délai et budget" },
  ],
  consentLabel:
    "J'accepte que Romain Mailliu utilise ces informations pour répondre à ma demande.",
  consentDetail:
    "Je lis vos réponses pour étudier votre projet et vous répondre. Je les garde 3 ans après notre dernier échange, puis je les supprime. Vous pouvez demander leur suppression avant.",
  submitLabel: "Envoyer ma candidature",
  backLabel: "Retour",
  nextLabel: "Continuer",
} as const;

export const confirmation = {
  title: "Merci, c'est bien reçu.",
  paragraphs: [
    "Je lis chaque candidature moi-même. Vous aurez une réponse sous 48h, quelle qu'elle soit.",
    "Si votre projet correspond, je vous propose un échange de 30 minutes pour cadrer. Si ce n'est pas le cas, je vous le dis clairement — et je vous oriente vers ce qui vous conviendra mieux.",
  ],
} as const;

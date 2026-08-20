/**
 * Contenu de la page /tarifs — sites vitrines.
 * Tout le texte affiché vit ici : les composants ne font que le mettre en page.
 */

export const candidatureAnchor = "candidature";

/* ------------------------------------------------------------------ */
/* Section 1 — Headline                                                */
/* ------------------------------------------------------------------ */

export const hero = {
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
    segment: "Entrepreneur",
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
  {
    slug: "riviere",
    name: "Rivière",
    segment: "Association",
    need: "retrouver sa capacité à rêver",
    href: "https://www.rivieredereves.org/",
    screenshot: "/screens/riviere.jpg",
    screenshotAlt: "Page d'accueil du site de l'association Rivière de rêves",
    surface: "sticky-card--blush",
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
};

export const offres: Offre[] = [
  {
    slug: "refonte",
    name: "Refonte",
    detail:
      "Votre site existe mais n'est pas terminé ou à jour. Je le reconstruis en repartant de vos contenus actuels.",
    price: "300 €",
  },
  {
    slug: "creation",
    name: "Création",
    detail:
      "Votre site vitrine sur mesure, de la maquette à la mise en ligne.",
    price: "400 €",
  },
  {
    slug: "site-autonome",
    name: "Site autonome",
    detail:
      "Votre site vitrine avec la possibilité de modifier des sections vous-même.",
    price: "500 €",
  },
];

export const offresHeading = "Tarifs";

/**
 * Matrice de comparaison — une ligne par prestation, une colonne par offre,
 * dans l'ordre du tableau `offres`.
 *
 * Les prestations communes aux trois offres viennent en premier : elles
 * rassurent. Les deux lignes qui distinguent réellement les offres ferment le
 * tableau, là où se prend la décision.
 */
export type OffreFeature = {
  label: string;
  included: [boolean, boolean, boolean];
  /** Précision affichée en petit sous le libellé. */
  note?: string;
};

export const offreFeatures: OffreFeature[] = [
  {
    label: "Mise à jour de vos contenus",
    included: [true, false, false],
  },
  {
    label: "Accompagnement à la création de contenus",
    included: [false, true, true],
  },
  { label: "Design", included: [true, true, true] },
  { label: "Mise en ligne", included: [true, true, true] },
  { label: "Version mobile", included: [true, true, true] },
  { label: "Référencement de base", included: [true, true, true] },
  { label: "Tableau de suivi du trafic", included: [true, true, true] },
  { label: "Formulaire de contact", included: [true, true, true] },
  {
    label: "Nom de domaine configuré",
    note: "achat à votre charge, ~15 €/an",
    included: [true, true, true],
  },
  { label: "2 mois de maintenance", included: [true, true, true] },
  {
    label: "Sections que vous modifiez vous-même",
    note: "agenda, articles, galerie…",
    included: [false, false, true],
  },
];

/* ------------------------------------------------------------------ */
/* Section 4 — Maintenance                                             */
/* ------------------------------------------------------------------ */

export const maintenanceHeading = "Et après la mise en ligne ?";
export const maintenanceIntro = "Trois façons de faire vivre votre site.";

export type MaintenanceOption = {
  slug: string;
  name: string;
  price: string;
  summary?: string;
  items: string[];
};

export const maintenanceOptions: MaintenanceOption[] = [
  {
    slug: "autonome",
    name: "Autonome",
    price: "Gratuit",
    summary: "Vous reprenez la main à la livraison.",
    items: ["Documentation complète", "Code source", "Guides de déploiement"],
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    price: "10 €/mois",
    summary: "Votre site à jour, référencé et sauvegardé.",
    items: [
      "Hébergement",
      "Sécurité & sauvegardes automatiques",
      "Modifications illimitées sur l'existant (un texte, une photo, vos horaires, une actualité, un membre de l'équipe, etc.)",
    ],
  },
  {
    slug: "a-la-carte",
    name: "À la carte",
    price: "Au besoin",
    items: [
      "Pack 5 modifications : 50 €",
      "Nouvelle page : 50 €",
      "Nouvelle fonctionnalité : sur devis",
    ],
  },
];

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
  "Refonte",
  "Création",
  "Site autonome",
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
  steps: [
    { title: "Vous", legend: "Qui vous êtes" },
    { title: "Le projet", legend: "Ce que vous voulez construire" },
    { title: "Le cadrage", legend: "Contenus, délai et budget" },
  ],
  consentLabel: "J'accepte d'être recontacté·e pour ce projet.",
  consentDetail:
    "Réponses conservées 3 ans, puis supprimées. Suppression sur simple demande.",
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

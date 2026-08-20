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
      "Votre site existe mais il a vieilli. Je le reconstruis avec mes outils, en repartant de vos contenus actuels. Même site neuf, moins de travail : c'est ce qui fait le prix.",
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
 * Matrice de comparaison — une ligne par prestation, une colonne par offre,
 * dans l'ordre du tableau `offres`.
 *
 * Les lignes sont réparties en deux groupes : ce qui distingue les offres, et
 * ce qui est commun aux trois. Sans cette séparation, huit lignes sur dix
 * affichaient trois coches identiques et noyaient les vraies différences.
 *
 * Le socle technique est le même dans les trois cas ; la rénovation coûte
 * moins cher parce que les contenus existent déjà, pas parce qu'elle serait
 * bricolée sur l'ancien site.
 */
export type OffreFeature = {
  label: string;
  included: [boolean, boolean, boolean];
  /** Précision affichée en petit sous le libellé. */
  note?: string;
};

export type OffreFeatureGroup = {
  title: string;
  features: OffreFeature[];
};

export const offreFeatureGroups: OffreFeatureGroup[] = [
  {
    title: "Ce qui change d'une offre à l'autre",
    features: [
      {
        label: "Je repars de vos contenus actuels",
        note: "textes et images déjà en ligne : c'est ce qui fait la différence de prix",
        included: [true, false, false],
      },
      {
        label: "Nom de domaine configuré",
        note: "achat du nom de domaine à votre charge, ~15 €/an",
        included: [false, true, true],
      },
      {
        label: "Vous modifiez textes, images et contenus vous-même",
        included: [false, false, true],
      },
    ],
  },
  {
    title: "Inclus dans les trois offres",
    features: [
      {
        label: "Design sur mesure, construit avec mes outils",
        included: [true, true, true],
      },
      { label: "Mise en ligne", included: [true, true, true] },
      { label: "Version mobile", included: [true, true, true] },
      { label: "Référencement de base", included: [true, true, true] },
      { label: "Formulaire de contact", included: [true, true, true] },
      {
        label: "2 tours de retours",
        note: "au-delà : 70 €/h",
        included: [true, true, true],
      },
      { label: "2 mois de maintenance offerts", included: [true, true, true] },
    ],
  },
];

/**
 * Ce qui est inclus vit désormais dans le tableau : ne reste ici que ce qui
 * ne s'y exprime pas, à savoir ce qui n'est pas compris.
 */
export const mentions = {
  excluded: {
    label: "Non inclus",
    body: "rédaction des contenus, photos et visuels, emails professionnels, traductions, fonctionnalités sur mesure (réservation, paiement, boutique). Sur devis, prix annoncé avant.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Section 4 — Maintenance                                             */
/* ------------------------------------------------------------------ */

export const maintenanceHeading = "Et après la mise en ligne ?";
export const maintenanceIntro =
  "Trois façons de faire vivre votre site. Vous choisissez à la livraison, et vous pouvez changer d'avis ensuite.";

export type MaintenanceOption = {
  slug: string;
  name: string;
  price: string;
  /** Précision sous le prix (facturation, mois offerts…). */
  priceNote?: string;
  summary: string;
  items: string[];
  /** Ligne de bas de carte, en petit. */
  footnote?: string;
  featured?: boolean;
  badge?: string;
};

export const maintenanceOptions: MaintenanceOption[] = [
  {
    slug: "autonomie",
    name: "Vous vous débrouillez",
    price: "Gratuit",
    summary: "Vous reprenez la main à la livraison.",
    items: [
      "Hébergement à votre nom",
      "Mises à jour et sauvegardes à votre charge",
      "Aucun engagement, aucune facture récurrente",
    ],
    footnote: "Le bon choix si quelqu'un s'en occupe déjà chez vous.",
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    price: "10 €/mois",
    priceNote: "facturé 120 € à l'année · les 2 premiers mois sont offerts",
    summary: "Votre site reste en ligne, à jour et sauvegardé.",
    items: [
      "Hébergement, mises à jour de sécurité, sauvegardes automatiques, surveillance",
      "Modifications illimitées sur l'existant : un texte, une photo, vos horaires, une actualité, un membre de l'équipe",
      "Demandes par email, traitées sous 5 jours ouvrés",
    ],
    footnote: "Besoin urgent, traité sous 24h : 50 €.",
    featured: true,
    badge: "Recommandé",
  },
  {
    slug: "a-la-carte",
    name: "À la carte",
    price: "Au besoin",
    summary: "Vous payez quand vous avez besoin de moi.",
    items: [
      "Pack 5 modifications — 50 €, valable 12 mois",
      "Nouvelle page — 50 €",
      "Nouvelle fonctionnalité (réservation, paiement, newsletter, multilingue) — sur devis",
    ],
    footnote: "Sur les tarifs convenus ensemble, sans surprise.",
  },
];

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

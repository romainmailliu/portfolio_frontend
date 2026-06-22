/** Contenu historique de l'offre Tech & IA — source de vérité pour « Je propose » */

export type OfferTier = {
  id: string;
  dotColor: string;
  label: string;
  subtitle: string;
  bullets: string[];
  footnote: string;
  /** Si défini, le premier bullet est un renvoi à un autre tier */
  firstBulletRef?: string;
};

export const offerHero = {
  title:
    "La technologie et l'IA au service de votre mission, au juste prix.",
  intro:
    "Associations, entrepreneur.e.s, collectifs : libérez-vous des tâches répétitives et créez de nouvelles opportunités grâce à des outils tech alignés avec votre mission.",
};

export const proposeSteps = [
  {
    title: "D'abord, nous échangeons sur votre projet, vos contraintes et votre budget.",
    body: "Vous repartez avec une cartographie claire : où la tech vous fait gagner des opportunités et où ce n'est pas encore le moment d'investir.",
  },
  {
    title: "Ensuite, un devis construit ensemble — à prix libre.",
    body: "Pas de grille tarifaire. Nous ajustons selon vos priorités et ce que vous pouvez investir.",
  },
  {
    title: "On développe ce dont vous avez besoin maintenant.",
    body: "",
  },
] as const;

export const personalizedQuoteIntro =
  "Après notre premier échange, je vous propose un accompagnement calé sur vos priorités et votre budget.";

export type CaseStudy = {
  name: string;
  context: string;
  outcome: string;
  projectHref?: string;
  projectLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    name: "Léo",
    context: "avait besoin d'être visible avant son lancement",
    outcome: "un site optimisé pour Google et les IA, prêt le jour J",
    projectHref: "https://www.amidou.eu/",
    projectLabel: "Amidou",
  },
  {
    name: "La Camaraderie",
    context:
      "voulait publier ses événements en autonomie, sans dépendre de personne",
    outcome: "un site simple, bien référencé, qu'ils gèrent eux-mêmes",
  },
  {
    name: "Antoine",
    context: "perdait du temps à éditer des bons de commande à la main",
    outcome:
      "ses fichiers Excel génèrent maintenant les documents automatiquement",
  },
  {
    name: "Jade",
    context: "voulait faciliter le troc de compétences entre entrepreneur.e.s",
    outcome: "une application sur mesure pour sa communauté",
    projectHref: "https://www.gomett.com/",
    projectLabel: "Gomett",
  },
];

export const siteWebTiers: OfferTier[] = [
  {
    id: "essentiel",
    dotColor: "bg-purple-400",
    label: "Essentiel",
    subtitle: "Idéal pour démarrer rapidement avec un site vitrine",
    bullets: [
      "3 à 5 pages (présentation, services, équipe, contact…)",
      "Module d'articles / actualités",
      "Formulaire de contact + inscription newsletter",
      "Formation + vidéo pour gérer le site facilement",
      "Sans abonnement mensuel",
    ],
    footnote: "→ ~1 semaine",
  },
  {
    id: "visibilite",
    dotColor: "bg-blue-400",
    label: "Visibilité",
    subtitle: "Pour être trouvé facilement sur Google",
    bullets: [
      "Tout ce qui est inclus dans l'offre Essentiel",
      "Connexion à Google Business (Google Maps)",
      "Installation de Google Analytics",
      "Optimisation SEO (référencement naturel)",
    ],
    footnote: "→ ~2 semaines",
    firstBulletRef: "essentiel",
  },
  {
    id: "avance",
    dotColor: "bg-green-400",
    label: "Avancé",
    subtitle:
      "Pour vendre en ligne ou développer un projet plus complet",
    bullets: [
      "Création d'un site e-commerce (boutique en ligne)",
      "Gestion des produits, paiements, commandes",
      "Accompagnement sur la stratégie digitale",
      "Fonctionnalités sur mesure selon vos besoins",
    ],
    footnote: "→ Délai selon le projet",
  },
];

export const automationTiers: OfferTier[] = [
  {
    id: "diagnostic",
    dotColor: "bg-purple-400",
    label: "Diagnostic",
    subtitle: "Identifier les tâches à automatiser en priorité",
    bullets: [
      "Audit gratuit de vos processus",
      "Cartographie des tâches chronophages",
      "Identification des opportunités d'automatisation avec l'IA",
      "Recommandations concrètes et priorisées",
    ],
    footnote: "🙌 Gratuit — sans engagement",
  },
  {
    id: "automatisation",
    dotColor: "bg-blue-400",
    label: "Automatisation",
    subtitle: "Gagner du temps sur vos opérations quotidiennes",
    bullets: [
      "Automatisation des tâches répétitives (emails, reporting, CRM…)",
      "Mise en place de workflows (n8n, Airtable…)",
      "Connexion de vos outils existants",
      "Réduction du temps passé sur l'administratif",
    ],
    footnote: "→ ~1-2 semaines",
  },
  {
    id: "ia-sur-mesure",
    dotColor: "bg-green-400",
    label: "IA sur mesure",
    subtitle: "Créer des outils adaptés à votre mission",
    bullets: [
      "Chatbots internes ou externes",
      "Génération de contenus (emails, rapports, posts…)",
      "Outils d'aide à la décision",
      "Solutions personnalisées selon vos besoins terrain",
    ],
    footnote: "→ Délai selon le projet",
  },
];

export const managerPropose = {
  title: "Un accompagnement IA concret, en 2 heures",
  bullets: [
    "Session sur Claude calée sur votre quotidien : mails, calendrier, comptes-rendus",
    "Des réflexes applicables dès la semaine suivante — pas une formation théorique",
    "Compatible avec votre environnement (Microsoft 365, Google Workspace)",
    "Vous payez à la fin, seulement si l'échange vous a été utile",
  ],
  footnote: "Mardis & jeudis, 8h–20h · À distance",
  ctaHref: "/ai-training",
  ctaLabel: "Voir l'accompagnement IA",
};

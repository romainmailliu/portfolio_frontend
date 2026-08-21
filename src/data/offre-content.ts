export type ProfileSlug =
  | "entrepreneur"
  | "association"
  | "createur"
  | "manager";

export type ProfileCaseStudy = {
  name: string;
  context: string;
  outcome: string;
  /** Lien vers le site du projet */
  projectHref?: string;
  /** Libellé du lien (par défaut : name) */
  projectLabel?: string;
};

export type ProfileProposeConfig = {
  /** Afficher les 3 étapes générales (demi-journée, devis, sur mesure) */
  showGeneralSteps?: boolean;
  /** Profil manager : contenu IA dédié */
  useManagerPropose?: boolean;
  /** Exemples légers pour illustrer le devis personnalisé */
  devisExamples?: string[];
};

export type ProfileEntry = {
  slug: ProfileSlug;
  /** Première personne, objectif client, pas la solution */
  statement: string;
  /** Version courte pour la carte */
  statementShort: string;
  accent: string;
  /** Situations concrètes : « Vous êtes au bon endroit si » */
  situations: string[];
  caseStudies: ProfileCaseStudy[];
  propose: ProfileProposeConfig;
};

export const contactCardAnchor = "contact-romain";

/** Sticker tarif associations */
export const associationDiscountSticker = {
  label: "−50 % associations",
  ariaLabel: "Moins 50 pour cent pour les associations",
} as const;

export const contactCtas = {
  marseille: {
    label: "Prenons un café à Marseille",
    href: `#${contactCardAnchor}`,
  },
  visio: {
    label: "Rencontrons-nous en visio",
    href: `#${contactCardAnchor}`,
  },
} as const;

export const profiles: ProfileEntry[] = [
  {
    slug: "entrepreneur",
    statement:
      "Je suis un entrepreneur·e et je veux développer mes ventes",
    statementShort: "Développer mes ventes",
    accent: "#0c4a6e",
    situations: [
      "Votre activité accélère et vous n'avez pas encore de vitrine en ligne, ou une vitrine qui ne vous ressemble plus",
      "Vous passez des heures sur les mêmes devis, bons de commande ou relances clients",
      "Vos contacts sont éparpillés (Excel, mails, carnets) et vous perdez des opportunités",
      "Vous savez ce que vous vendez, mais peinez à le formuler clairement pour vos premiers clients",
    ],
    caseStudies: [
      {
        name: "Albane",
        context:
          "lançait son activité de coaching et facilitation sans site à son image",
        outcome:
          "un site vitrine clair, pour présenter ateliers et accompagnements",
        projectHref: "https://www.albanedharcourt.com/",
        projectLabel: "Albane",
      },
      {
        name: "Léo",
        context: "avait besoin d'être visible avant son lancement",
        outcome:
          "un site optimisé pour Google et les IA, prêt le jour J",
        projectHref: "https://www.amidou.eu/",
        projectLabel: "Amidou",
      },
      {
        name: "Léa",
        context: "proposait des dégustations de vin sans vitrine en ligne à la hauteur",
        outcome:
          "un site vitrine clair, trouvable et fidèle à leur univers",
        projectHref: "https://www.lesonduvin.fr/",
        projectLabel: "Klink, le son du vin",
      },
      {
        name: "Antoine",
        context: "perdait du temps à éditer des bons de commande à la main",
        outcome:
          "ses fichiers Excel génèrent maintenant les documents automatiquement",
      },
      {
        name: "Jade",
        context:
          "voulait faciliter le troc de compétences entre entrepreneur·e·s",
        outcome: "une application sur mesure pour sa communauté",
        projectHref: "https://www.gomett.com/",
        projectLabel: "Gomett",
      },
    ],
    propose: {
      showGeneralSteps: true,
      devisExamples: [
        "Un site avec une proposition de valeur claire, pensé pour être trouvé (Google et moteurs IA)",
        "Des devis et relances qui partent sans vous, depuis vos outils actuels",
        "Un suivi client simple : qui a commandé, qui relancer, sans CRM surdimensionné",
      ],
    },
  },
  {
    slug: "association",
    statement:
      "Je suis une association et je veux mobiliser notre communauté",
    statementShort: "Mobiliser notre communauté",
    accent: "#b45309",
    situations: [
      "Votre association n'est pas assez visible en ligne : les gens qui vous cherchent ne vous trouvent pas toujours",
      "Votre équipe s'épuise sur l'administratif : tableurs, mails en chaîne, doublons",
      "Vous perdez des adhérents car vous n'avez pas le temps de faire des campagnes d'adhésion structurées",
      "Vous payez encore des outils tech dépassés que plus personne n'utilise vraiment",
    ],
    caseStudies: [
      {
        name: "La Camaraderie",
        context:
          "voulait publier ses événements en autonomie, sans dépendre de personne",
        outcome:
          "un site simple, bien référencé, qu'ils gèrent eux-mêmes",
        projectHref: "https://www.lacamaraderie.net/",
      },
      {
        name: "Rivière",
        context:
          "animait ses ateliers et ses rencontres sans vitrine pour les rassembler",
        outcome:
          "un site vitrine qui porte leur univers et leur agenda d'événements",
        projectHref: "https://www.rivieredereves.org/",
        projectLabel: "Rivière",
      },
      {
        name: "Jadin LEVAT",
        context:
          "menait une campagne citoyenne participative",
        outcome:
          "un site pour rassembler soutiens, adhérents et structures du quartier",
        projectHref: "https://www.assolevat.fr/",
        projectLabel: "Jadin LEVAT",
      },
      {
        name: "Coexister",
        context: "facilite le vivre-ensemble au quotidien",
        outcome: "un outil numérique au service de leur mission",
        projectHref: "https://www.coexister.fr/",
        projectLabel: "Coexister",
      },
    ],
    propose: {
      showGeneralSteps: true,
      devisExamples: [
        "Un CRM léger pour centraliser adhérents, contacts et historiques (sans tableurs éparpillés)",
        "Une campagne citoyenne en ligne pour le plaidoyer : pétition, lettre de soutien, diffusion",
        "Un site que votre équipe met à jour seule (événements, actualités, appels à mobilisation)",
      ],
    },
  },
  {
    slug: "createur",
    statement:
      "Je suis créateur·rice de contenu et je veux développer ma communauté",
    statementShort: "Développer ma communauté",
    accent: "#7c3aed",
    situations: [
      "Vous produisez beaucoup de contenu, mais il reste sur une seule plateforme : pas le temps de le décliner ailleurs",
      "Vous avez de l'audience, mais aucun système pour transformer un follower en client",
      "Vous publiez à l'aveugle, sans savoir ce qui touche vraiment votre communauté",
      "Choisir les formats, les outils et les canaux de diffusion vous prend plus de temps que créer",
    ],
    caseStudies: [
      {
        name: "PrendsTaDose",
        context: "anime un webzine engagé",
        outcome: "une présence en ligne qui porte leur ligne éditoriale",
        projectHref: "https://www.prendstadose.fr/",
        projectLabel: "PrendsTaDose",
      },
      {
        name: "Youth Visions",
        context: "produit des documentaires à fort impact",
        outcome: "des outils numériques pour créer la campagne d'impact autour des films",
        projectHref: "https://www.youth-visions.com/",
        projectLabel: "Youth Visions",
      },
    ],
    propose: {
      showGeneralSteps: true,
      devisExamples: [
        "Une présence en ligne cohérente avec votre voix, sur les bons canaux",
        "Des workflows pour publier et recycler sans perdre le contrôle éditorial",
        "Des outils IA pour automatiser la veille et le formatage, pas l'écriture",
      ],
    },
  },
  {
    slug: "manager",
    statement:
      "Je suis manager ou fondateur·rice et je veux optimiser mon temps",
    statementShort: "Optimiser mon temps",
    accent: "#047857",
    situations: [
      "Votre boîte mail et vos comptes-rendus vous suivent le soir et le week-end",
      "Vous refaites les mêmes tâches chaque semaine : copier-coller, relances, mises en forme",
      "Votre équipe sous-utilise les outils déjà payés (Microsoft 365, Google Workspace)",
      "Vous hésitez à investir dans l'IA faute de preuves concrètes sur votre quotidien",
    ],
    caseStudies: [],
    propose: {
      useManagerPropose: true,
    },
  },
];

export function getProfileBySlug(slug: string): ProfileEntry | undefined {
  return profiles.find((p) => p.slug === slug);
}

export function getProfileSlugs(): ProfileSlug[] {
  return profiles.map((p) => p.slug);
}

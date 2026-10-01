/**
 * Contenu de la page /associations, validé par Romain le 01/10/2026.
 * L'offre part des difficultés des associations (études Recherches &
 * Solidarités 2026, Solidatech 2025, France Bénévolat 2025), pas de la
 * technique : chaque besoin s'ouvre sur une phrase de responsable associatif.
 */

export const hero = {
  kicker: "Associations · Marseille et partout en France",
  /** Titre en deux lignes : la seconde est surlignée, comme sur /site-vitrine. */
  titleLead: "Moins d'administratif,",
  titleHighlight: "plus de mission",
  intro:
    "De petits outils sur mesure qui rendent du temps à votre équipe : pour vos bénévoles, vos adhérents et vos financeurs.",
  ctaLabel: "Prenons un café à Marseille",
} as const;

export type AssociationNeed = {
  slug: string;
  title: string;
  quote: string;
  answers: string[];
  /** Note de source, affichée sous la carte (renvoyée par un astérisque). */
  footnote?: string;
  surface: string;
};

export const needs: AssociationNeed[] = [
  {
    slug: "benevoles",
    title: "Bénévoles",
    quote: "On retrouve toujours les mêmes personnes à nos actions.",
    answers: [
      "Des missions courtes et ponctuelles, auxquelles on s'inscrit facilement. Aujourd'hui, 14 % des non-bénévoles seraient prêts à s'engager sur des missions à durée limitée*.",
      "Un planning clair, avec les rappels envoyés automatiquement.",
      "Un accueil semi-automatisé des nouveaux, et de la visibilité sur l'engagement des bénévoles.",
    ],
    footnote: "* Baromètre France Bénévolat / IFOP, 2025.",
    surface: "sticky-card--mint",
  },
  {
    slug: "adhesions",
    title: "Adhésions",
    quote: "Chaque année, je relance les adhérents un par un.",
    answers: [
      "Des relances de cotisation qui partent toutes seules, au bon moment.",
      "Les paiements (HelloAsso, virements) rapprochés automatiquement de votre fichier d'adhérents.",
      "Les attestations et reçus générés sans ressaisie.",
    ],
    surface: "sticky-card--teal",
  },
  {
    slug: "financeurs",
    title: "Financeurs",
    quote:
      "Les dossiers de subvention sont de plus en plus lourds. Ça prend un temps fou.",
    answers: [
      "Les indicateurs collectés au fil de l'eau (émargement en ligne, participants, heures), plutôt que reconstitués en fin d'année.",
      "Un tableau de bord par financeur.",
      "Des brouillons de bilans, comptes rendus et rapports d'activité préparés avec l'aide de l'IA à partir de vos données.",
      "Une banque de textes réutilisables, pour ne plus réécrire votre projet à chaque dossier.",
    ],
    surface: "sticky-card--blush",
  },
  {
    slug: "financement",
    title: "Financement",
    quote: "Ça va encore pour un an, mais aucune visibilité ensuite.",
    answers: [
      "Une veille automatisée des appels à projets, filtrée pour votre association.",
      "Un fichier des donateurs et mécènes, avec des relances.",
      "Un suivi de trésorerie simple, avec des alertes avant le creux.",
    ],
    surface: "sticky-card--cream",
  },
  {
    slug: "passation",
    title: "Passation",
    quote: "On ne trouve personne pour reprendre la présidence.",
    answers: [
      "La mémoire et les données de l'association réunies dans un unique endroit, simple d'accès et sécurisé : accès, contacts des financeurs, historique.",
      "Les convocations et procès-verbaux d'AG préparés avec l'aide de l'IA.",
      "Une fonction de président moins lourde à transmettre.",
    ],
    surface: "sticky-card--mint",
  },
];

export const stepsHeading = "Comment ça se passe";

export const steps = [
  "Un café à Marseille ou un appel pour faire connaissance, comprendre vos priorités et votre budget.",
  "Un petit outil livré vite, au juste prix, avec un devis transparent et précis.",
  "Votre équipe formée et autonome. Ensuite, on passe au chantier suivant si besoin.",
] as const;

export const whyHeading = "Pourquoi je travaille avec les associations";

export const whyParagraphs = [
  "Ingénieur, j'ai travaillé deux ans auprès de jeunes adultes en situation de précarité, en Indonésie puis en France, puis dans un cabinet de conseil spécialisé dans la création de solutions à des enjeux sociaux, avec des entreprises, des institutions publiques et des ONG. J'ai ensuite coproduit un film pour porter la voix de jeunes artistes en situation de précarité jusqu'aux Nations Unies.",
  "Ces années m'ont donné envie de continuer à travailler avec les associations, cette fois autour de la technologie, ma passion.",
] as const;

/** Exemples du carrousel, pris dans les preuves existantes. */
export const exampleSlugs = ["coexister", "assolevat", "riviere"] as const;

export const contactHeading = "Parlons de votre association";

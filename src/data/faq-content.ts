/**
 * FAQ de la home (Application & IA). Validée par Romain le 01/10/2026 :
 * modifier une réponse ici la met à jour à la fois dans la page et dans les
 * données structurées FAQPage (src/app/page.tsx).
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqHeading = "Questions fréquentes";

export const faq: FaqEntry[] = [
  {
    question: "Combien ça coûte ?",
    answer:
      "Aujourd'hui, l'IA rend le développement plus accessible, et mes prix intègrent évidemment ce gain de productivité. Je travaille au juste prix, avec un devis transparent et précis, axé sur vos priorités.",
  },
  {
    question: "Comment on commence ?",
    answer:
      "Autour d'un café à Marseille ou lors d'un appel, on valide ensemble votre besoin, votre calendrier et votre budget.",
  },
  {
    question: "Je ne m'y connais pas en tech, est-ce un problème ?",
    answer:
      "Non. Je m'appuie sur vos outils actuels (tableurs, mails, Google Workspace ou Microsoft 365) et je vous forme pour que vous restiez autonomes.",
  },
  {
    question: "Travaillez-vous seulement à Marseille ?",
    answer:
      "Je vous rencontre volontiers autour d'un café à Marseille, et je travaille à distance partout en France.",
  },
  {
    question: "Avec quel type de structures travaillez-vous ?",
    answer:
      "Des associations, des entreprises à impact, des entrepreneur·e·s qui se lancent et des créateur·rice·s de contenu. Par exemple : Coexister, La Camaraderie, Rivière ou Gomett.",
  },
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Un site vitrine est livré en une semaine, une fois vos contenus reçus. Pour une application ou une automatisation, on fixe le calendrier ensemble dès le premier échange.",
  },
  {
    question: "Mon site sera-t-il adapté au mobile et bien référencé ?",
    answer:
      "Oui. Chaque site est pensé pour le mobile et pour être trouvé sur Google et par les moteurs IA. Le référencement de base est inclus dans toutes les offres.",
  },
  {
    question: "Le site m'appartient-il ?",
    answer:
      "Oui. Le nom de domaine est à votre nom, et vous recevez le code source et la documentation. Vous restez libres de changer de prestataire quand vous le souhaitez.",
  },
  {
    question: "Et après la mise en ligne ?",
    answer:
      "Au choix : vous reprenez la main gratuitement avec la documentation et le code source, ou je m'occupe de la maintenance avec un tarif qu'on fixe ensemble en fonction de vos besoins.",
  },
];

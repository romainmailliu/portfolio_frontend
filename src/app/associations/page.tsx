import type { Metadata } from "next";
import AssociationsPage from "../../components/AssociationsPage";
import { pageOpenGraph } from "../../lib/seo";

const title = "Outils numériques et IA pour les associations";
const description =
  "Bénévoles, adhésions, dossiers de subvention, trésorerie : de petits outils sur mesure qui rendent du temps à votre association. À Marseille et partout en France.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/associations",
  },
  openGraph: pageOpenGraph({
    title: `${title} | Romain Mailliu`,
    description,
    url: "/associations",
  }),
};

export default function Page() {
  return <AssociationsPage />;
}

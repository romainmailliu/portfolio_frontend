import type { Metadata } from "next";
import TarifsPage from "../../components/tarifs/TarifsPage";
import { pageOpenGraph } from "../../lib/seo";

const title = "Site vitrine à partir de 300 €";
const description =
  "Sites vitrines pour entrepreneur·e·s, associations et artistes : refonte 300 €, création 500 €, site autonome 600 €. Maintenance 14 €/mois, modifications illimitées.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/site-vitrine",
  },
  openGraph: pageOpenGraph({
    title: `${title} | Romain Mailliu`,
    description,
    url: "/site-vitrine",
  }),
  twitter: {
    card: "summary_large_image",
    title: `${title} | Romain Mailliu`,
    description,
  },
};

export default function Page() {
  return <TarifsPage />;
}

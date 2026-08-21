import type { Metadata } from "next";
import TarifsPage from "../../components/tarifs/TarifsPage";

const title = "Site vitrine à partir de 300 €";
const description =
  "Sites vitrines pour entrepreneur·e·s, associations et artistes : refonte 300 €, création 500 €, site autonome 600 €. Maintenance 14 €/mois, modifications illimitées.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/site-vitrine",
  },
  openGraph: {
    title: `${title} | Romain Mailliu`,
    description,
    url: "/site-vitrine",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Romain Mailliu`,
    description,
  },
};

export default function Page() {
  return <TarifsPage />;
}

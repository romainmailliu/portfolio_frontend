import type { Metadata } from "next";
import ProductionDocumentaire from "../../components/ProductionDocumentaire";
import { pageOpenGraph } from "../../lib/seo";

const title = "Production documentaire · I AM THE FUTURE";
const description =
  "Romain Mailliu, producteur du documentaire I AM THE FUTURE sorti en salles en septembre 2025.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/production-documentaire",
  },
  openGraph: pageOpenGraph({
    title: `${title} | Romain Mailliu`,
    description,
    url: "/production-documentaire",
  }),
};

export default function ProductionDocumentairePage() {
  return <ProductionDocumentaire />;
}

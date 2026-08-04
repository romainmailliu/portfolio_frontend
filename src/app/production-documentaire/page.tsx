import type { Metadata } from "next";
import ProductionDocumentaire from "../../components/ProductionDocumentaire";

export const metadata: Metadata = {
  title: "Production documentaire · I AM THE FUTURE",
  description:
    "Romain Mailliu, producteur du documentaire I AM THE FUTURE sorti en salles en septembre 2025.",
  alternates: {
    canonical: "/production-documentaire",
  },
};

export default function ProductionDocumentairePage() {
  return <ProductionDocumentaire />;
}

import type { Metadata } from "next";
import App from "../../views/App";

export const metadata: Metadata = {
  title: "Offre Tech & IA à Marseille",
  description:
    "Offre Tech & IA pour associations, entrepreneurs et collectifs : automatisation, sites web et outils IA alignés avec votre mission.",
  alternates: {
    canonical: "/offre-tech-ia",
  },
};

export default function OffreTechIAPage() {
  return <App />;
}

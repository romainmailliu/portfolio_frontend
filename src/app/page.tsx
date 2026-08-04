import type { Metadata } from "next";
import App from "../views/App";

export const metadata: Metadata = {
  title: "Offre Tech & IA à Marseille",
  description:
    "Offre Tech & IA pour associations, entrepreneur.e.s et collectifs : automatisation, sites web et outils IA alignés avec votre mission, au juste prix.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Offre Tech & IA à Marseille | Romain Mailliu",
    description:
      "Automatisation, sites web et outils IA pour associations et entrepreneur.e.s engagé.e.s. Au juste prix, à Marseille et en remote.",
    url: "/",
  },
};

export default function HomePage() {
  return <App />;
}

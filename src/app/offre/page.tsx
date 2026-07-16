import type { Metadata } from "next";
import OffreV2Hub from "../../components/OffreV2Hub";

export const metadata: Metadata = {
  title: "Quel est votre profil ?",
  description:
    "Choisissez votre profil pour découvrir comment la tech et l'IA peuvent vous aider — entrepreneur·e, association, créateur·rice ou manager.",
  alternates: {
    canonical: "/offre",
  },
  openGraph: {
    title: "Quel est votre profil ? | Romain Mailliu",
    description:
      "Choisissez votre profil pour découvrir comment la tech et l'IA peuvent vous aider — entrepreneur·e, association, créateur·rice ou manager.",
    url: "/offre",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function OffreV2Page() {
  return <OffreV2Hub />;
}

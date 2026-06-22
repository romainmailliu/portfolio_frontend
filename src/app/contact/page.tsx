import type { Metadata } from "next";
import App from "../../views/App";

export const metadata: Metadata = {
  title: "Contact — Développeur Web & IA à Marseille",
  description:
    "Contactez Romain Mailliu pour un accompagnement tech et IA à prix libre : sites web, automatisation et outils sur mesure pour associations et entrepreneur.e.s engagé.e.s.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Romain Mailliu, Tech & IA à Marseille",
    description:
      "Contactez Romain Mailliu pour un accompagnement tech et IA à prix libre pour associations et entrepreneur.e.s engagé.e.s.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <App />;
}

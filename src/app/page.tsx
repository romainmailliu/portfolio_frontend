import type { Metadata } from "next";
import App from "../views/App";
import { pageOpenGraph } from "../lib/seo";

const title = "Développeur web & Consultant IA à Marseille | Romain Mailliu";
const description =
  "Développeur web et consultant IA à Marseille pour associations et entreprises à impact : sites vitrines, automatisations et outils IA, au juste prix.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: pageOpenGraph({
    title,
    description,
    url: "/",
  }),
};

export default function HomePage() {
  return <App />;
}

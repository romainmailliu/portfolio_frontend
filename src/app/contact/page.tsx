import type { Metadata } from "next";
import App from "../../views/App";
import { pageOpenGraph } from "../../lib/seo";

// Page « qui suis-je » et contact : elle porte le nom, pour les recherches
// « Romain Mailliu ». `absolute` évite le suffixe « | Romain Mailliu » du
// template, qui doublerait le nom.
const title = "Qui suis-je · Romain Mailliu, développeur web & consultant IA";
const description =
  "Romain Mailliu, développeur web et consultant IA à Marseille : parcours, sites réalisés pour associations et entreprises à impact, et contact.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph({
    title,
    description,
    url: "/contact",
  }),
};

export default function ContactPage() {
  return <App />;
}

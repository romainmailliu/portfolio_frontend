import type { Metadata } from "next";
import App from "../views/App";
import { pageOpenGraph } from "../lib/seo";
import { faq } from "../data/faq-content";

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

/** Données structurées de la FAQ affichée sur la page (HomeFaq). */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: { "@type": "Answer", text: entry.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <App />
    </>
  );
}

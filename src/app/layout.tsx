import type { Metadata } from "next";
import Script from "next/script";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.romainmailliu.com"),
  title: {
    default: "Romain Mailliu | Développeur Web & IA à Marseille",
    template: "%s | Romain Mailliu",
  },
  description:
    "Développeur Web & IA à Marseille. J'accompagne associations et entrepreneurs engagé.e.s pour créer des sites, automatisations et outils IA utiles, à prix libre.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Romain Mailliu | Développeur Web & IA à Marseille",
    description:
      "Sites web, automatisation et IA au service de votre mission, à Marseille et à distance.",
    siteName: "Romain Mailliu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romain Mailliu | Développeur Web & IA à Marseille",
    description:
      "Sites web, automatisation et IA au service de votre mission, à Marseille et à distance.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Romain Mailliu",
      jobTitle: "Développeur Web & IA",
      url: "https://www.romainmailliu.com/",
      email: "romain.mailliu@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marseille",
        addressCountry: "FR",
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Romain Mailliu - Développement Web & IA",
      url: "https://www.romainmailliu.com/",
      areaServed: ["Marseille", "France"],
      serviceType: [
        "Développement de site web",
        "Automatisation de processus",
        "Solutions IA",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Script id="schema-org-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}

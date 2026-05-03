import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../styles/index.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.romainmailliu.com"),
  title: {
    default:
      "Romain Mailliu | La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
    template: "%s | Romain Mailliu",
  },
  description:
    "La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title:
      "Romain Mailliu | La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
    description:
      "La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
    siteName: "Romain Mailliu",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Romain Mailliu | La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
    description:
      "La Tech à prix libre pour des associations et entrepreneurs engagé.e.s.",
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

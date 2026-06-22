import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/index.css";
import "../styles/design-system.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

/** Page d'accueil : offre Tech & IA (canonical /). */
const siteTitleDefault =
  "Offre Tech & IA à Marseille | Romain Mailliu";

const siteDescription =
  "Automatisation, sites web et outils IA pour associations et entrepreneur.e.s engagé.e.s — à prix libre, à Marseille et en remote.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.romainmailliu.com"),
  title: {
    default: siteTitleDefault,
    template: "%s | Romain Mailliu",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: siteTitleDefault,
    description: siteDescription,
    siteName: "Romain Mailliu",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitleDefault,
    description: siteDescription,
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
    <html
      lang="fr"
      className={`${bricolage.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body className="font-body bg-cream text-forest antialiased">
        <Script id="schema-org-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}

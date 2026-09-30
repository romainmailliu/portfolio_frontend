import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import SiteFooter from "../components/SiteFooter";
import { offres } from "../data/tarifs-content";
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
  "Développeur web & Consultant IA à Marseille | Romain Mailliu";

const siteDescription =
  "Automatisation, sites web et outils IA pour associations et entrepreneur.e.s engagé.e.s. Au juste prix, à Marseille et en remote.";

const SITE_URL = "https://www.romainmailliu.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/romain-mailliu/";

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
  // Pas de canonical ici : chaque page publique déclare la sienne. Une
  // canonical « / » héritée ferait pointer /ai-training ou /admin vers la home.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: siteTitleDefault,
    description: siteDescription,
    siteName: "Romain Mailliu",
  },
  // Seulement le format de carte : sans twitter:title ni twitter:description,
  // X reprend les og:* de chaque page. Les déclarer ici imposait ceux de la
  // home à toutes les pages qui ne les redéfinissent pas.
  twitter: {
    card: "summary_large_image",
  },
};

const address = {
  "@type": "PostalAddress",
  addressLocality: "Marseille",
  addressRegion: "Provence-Alpes-Côte d'Azur",
  addressCountry: "FR",
};

const knowsAbout = [
  "Création de sites internet",
  "Sites vitrines",
  "Automatisation de processus",
  "Intelligence artificielle",
  "Associations",
  "Économie sociale et solidaire",
];

/** Tarifs site vitrine, tirés de la grille publiée sur /site-vitrine. */
const siteVitrineOffers = offres.map((offre) => ({
  "@type": "Offer",
  name: `Site vitrine : ${offre.name}`,
  description: offre.detail,
  price: Number.parseInt(offre.price, 10),
  priceCurrency: "EUR",
  url: `${SITE_URL}/site-vitrine`,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Romain Mailliu",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Romain Mailliu",
      jobTitle: "Développeur web & Consultant IA",
      url: `${SITE_URL}/`,
      email: "romain.mailliu@gmail.com",
      image: `${SITE_URL}/moi.png`,
      sameAs: [LINKEDIN_URL],
      address,
      knowsAbout,
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Romain Mailliu, développeur web & consultant IA",
      description: siteDescription,
      url: `${SITE_URL}/`,
      email: "romain.mailliu@gmail.com",
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/moi.png`,
      founder: { "@id": `${SITE_URL}/#person` },
      sameAs: [LINKEDIN_URL],
      address,
      areaServed: [
        { "@type": "City", name: "Marseille" },
        { "@type": "Country", name: "France" },
      ],
      priceRange: "300 € – 600 €",
      knowsAbout,
      serviceType: [
        "Création de site internet",
        "Automatisation de processus",
        "Conseil en intelligence artificielle",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sites vitrines",
        itemListElement: siteVitrineOffers,
      },
    },
  ],
};

/**
 * Balise native et non `next/script` : le JSON-LD doit figurer dans le HTML
 * servi, pas être injecté après l'hydratation. `<` est échappé pour qu'aucun
 * contenu ne puisse fermer la balise.
 */
const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

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
        <script
          id="schema-org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

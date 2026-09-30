import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Offre Tech & IA" },
  { href: "/site-vitrine", label: "Site vitrine" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="page-container max-w-xl">
        {/* Padding vertical sur un div interne : voir SiteFooter. */}
        <div className="py-20 md:py-28 text-center">
          <p className="field-label mb-4">Erreur 404</p>
          <h1 className="font-display text-3xl md:text-4xl text-forest leading-tight">
            Cette page n&apos;existe pas
          </h1>
          <p className="text-body-sm text-forest/80 mt-4">
            Le lien est peut-être ancien. Voici les pages principales :
          </p>
          <nav
            aria-label="Pages principales"
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="btn-outline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

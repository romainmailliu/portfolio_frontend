"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Pied de page global. Il donne à Google un chemin vers toutes les pages
 * publiques, dont les offres par profil que le menu principal ne liste pas,
 * et porte les liens légaux.
 *
 * Masqué sur les pages hors site public : dashboard et landing privée.
 */
const HIDDEN_PREFIXES = ["/admin", "/ai-training"];

const OFFER_LINKS = [
  { href: "/", label: "Application & IA" },
  { href: "/site-vitrine", label: "Site vitrine" },
  { href: "/offre/association", label: "Associations" },
  { href: "/offre/entrepreneur", label: "Entrepreneur·e·s" },
  { href: "/offre/createur", label: "Créateur·rice·s de contenu" },
  { href: "/offre/manager", label: "Managers & fondateur·rice·s" },
] as const;

const ABOUT_LINKS = [
  { href: "/contact", label: "Qui suis-je" },
  { href: "/production-documentaire", label: "Production documentaire" },
] as const;

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
] as const;

const linkClass =
  "inline-flex items-center min-h-11 md:min-h-0 md:py-0.5 text-caption text-forest/80 hover:text-forest underline-offset-4 hover:underline";

export default function SiteFooter() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-pencil bg-cream mt-16">
      {/* Le padding vertical va sur un div interne : le raccourci `padding` de
          .page-container écraserait un py-* posé sur le même élément. */}
      <div className="page-container">
        <div className="py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-body font-semibold text-forest leading-tight">
                Romain Mailliu
              </p>
              <p className="text-caption text-forest/80 mt-1">
                Développeur web &amp; Consultant IA à Marseille
              </p>
            </div>

            <nav aria-label="Offres">
              <p className="field-label mb-3">Offres</p>
              <ul className="flex flex-col">
                {OFFER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="À propos">
              <p className="field-label mb-3">À propos</p>
              <ul className="flex flex-col">
                {ABOUT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.linkedin.com/in/romain-mailliu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-pencil mt-8 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-micro text-forest/70">
              © {new Date().getFullYear()} Romain Mailliu
            </p>
            <ul className="flex flex-wrap gap-x-5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

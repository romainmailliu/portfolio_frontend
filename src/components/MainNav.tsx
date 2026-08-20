"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation principale, partagée par la home, /contact et /tarifs.
 * L'onglet actif est déduit du pathname — chaque page passe seulement sa
 * classe de présentation (pilule fixe en desktop, barre scrollable en mobile).
 */
export default function MainNav({ className }: { className: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `nav-link ${isActive(href) ? "nav-link--active" : ""}`;

  return (
    <nav className={className} aria-label="Navigation principale">
      <Link
        href="/contact"
        className={linkClass("/contact")}
        aria-current={isActive("/contact") ? "page" : undefined}
      >
        Contact
      </Link>
      <Link
        href="/"
        className={linkClass("/")}
        aria-current={isActive("/") ? "page" : undefined}
      >
        Offre Tech &amp; IA
      </Link>
      <Link
        href="/site-vitrine"
        className={linkClass("/site-vitrine")}
        aria-current={isActive("/site-vitrine") ? "page" : undefined}
      >
        Site vitrine
      </Link>
      <Link
        href="/production-documentaire"
        className={linkClass("/production-documentaire")}
        aria-current={isActive("/production-documentaire") ? "page" : undefined}
      >
        <span className="sm:hidden">Documentaire</span>
        <span className="hidden sm:inline">Production documentaire</span>
      </Link>
    </nav>
  );
}

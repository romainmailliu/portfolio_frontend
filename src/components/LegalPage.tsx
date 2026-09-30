import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Gabarit des pages légales (mentions légales, confidentialité) : même
 * colonne étroite et même lien retour que /offre/[profil].
 */
export default function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  /** Date de dernière mise à jour, affichée sous le titre. */
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell">
      <div className="page-container max-w-2xl">
        {/* Padding vertical sur un div interne : voir SiteFooter. */}
        <div className="py-12 md:py-20">
          <Link
            href="/"
            className="nav-pill inline-flex items-center gap-1.5 px-4 py-2 text-sm text-forest mb-10 transition-colors hover:opacity-90"
          >
            <ArrowLeft size={15} aria-hidden />
            Accueil
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-forest leading-tight">
            {title}
          </h1>
          <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mt-3">
            Mise à jour le {updatedAt}
          </p>

          <div className="legal-prose mt-10 space-y-10 text-forest">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Une section : titre mono (comme `.field-label`) puis paragraphes. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 text-body-sm leading-relaxed">
      <h2 className="field-label mb-4">{title}</h2>
      {children}
    </section>
  );
}

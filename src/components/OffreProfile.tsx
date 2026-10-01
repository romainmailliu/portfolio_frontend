"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProfileEntry } from "../data/offre-content";
import { contactCardAnchor, profiles } from "../data/offre-content";
import Moderne from "./Moderne";
import { ProfileDetail } from "./OffreTechIA";
import "../styles/offre.css";

type Props = {
  profile: ProfileEntry;
};

export default function OffreProfile({ profile }: Props) {
  const otherProfiles = profiles.filter((p) => p.slug !== profile.slug);

  return (
    <div className="page-shell">
      <div className="page-container max-w-2xl">
        {/* Padding vertical sur un div interne : le raccourci `padding` de
            .page-container écrasait py-12, le lien retour collait au bord. */}
        <div className="py-12 md:py-20">
          <Link
            href="/"
            className="nav-pill inline-flex items-center gap-1.5 px-4 py-2 text-sm text-forest mb-10 transition-colors hover:opacity-90"
          >
            <ArrowLeft size={15} aria-hidden />
            Retour à l&apos;offre
          </Link>

          <header
            className="sticky-card sticky-card--cream border-l-4 p-5 md:p-6 mb-6 offre-reveal relative"
            style={{ borderLeftColor: profile.accent }}
          >
            <h1 className="text-xl md:text-2xl font-semibold text-forest leading-snug">
              {profile.statement}
            </h1>
          </header>

          <div className="sticky-card sticky-card--cream p-5 md:p-6">
            <ProfileDetail profile={profile} />
          </div>

          {/* Cible des boutons « Prenons un café » / « visio » du détail d'offre. */}
          <div id={contactCardAnchor} className="scroll-mt-28 mt-10">
            <Moderne />
          </div>

          <section className="border-t border-pencil pt-10 mt-10">
            <p className="font-mono-label text-micro uppercase tracking-wider text-forest/60 mb-4">
              Ce n&apos;est pas tout à fait votre cas ?
            </p>
            <div className="flex flex-col gap-2">
              {otherProfiles.map((other) => (
                <Link
                  key={other.slug}
                  href={`/offre/${other.slug}`}
                  className="flex items-center min-h-11 md:min-h-0 md:py-1 text-body-sm text-forest/80 hover:text-forest underline underline-offset-4 transition-colors"
                >
                  {other.statementShort}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

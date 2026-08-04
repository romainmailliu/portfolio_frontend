"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProfileEntry } from "../data/offre-v2-content";
import {
  associationDiscountSticker,
  profiles,
} from "../data/offre-v2-content";
import { ProfileDetail } from "./OffreTechIA";
import "../styles/offre-v2.css";

type Props = {
  profile: ProfileEntry;
};

export default function OffreV2Profile({ profile }: Props) {
  const otherProfiles = profiles.filter((p) => p.slug !== profile.slug);

  return (
    <div className="page-shell">
      <div className="page-container max-w-2xl py-12 md:py-20">
        <Link
          href="/offre"
          className="nav-pill inline-flex items-center gap-1.5 px-4 py-2 text-sm text-forest mb-10 transition-colors hover:opacity-90"
        >
          <ArrowLeft size={15} aria-hidden />
          Choisir un autre profil
        </Link>

        <header
          className="sticky-card sticky-card--cream border-l-4 p-5 md:p-6 mb-6 offre-v2-reveal relative"
          style={{ borderLeftColor: profile.accent }}
        >
          {profile.slug === "association" && (
            <span
              className="offre-discount-sticker offre-discount-sticker--on-card"
              aria-label={associationDiscountSticker.ariaLabel}
            >
              {associationDiscountSticker.label}
            </span>
          )}
          <p className="text-xl md:text-2xl font-semibold text-forest leading-snug">
            {profile.statement}
          </p>
        </header>

        <div className="sticky-card sticky-card--cream p-5 md:p-6">
          <ProfileDetail profile={profile} />
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
                className="text-body-sm text-forest/80 hover:text-forest underline underline-offset-4 transition-colors"
              >
                {other.statementShort}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

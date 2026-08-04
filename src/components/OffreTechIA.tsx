"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  profiles,
  contactCtas,
  associationDiscountSticker,
  type ProfileEntry,
  type ProfileSlug,
} from "../data/offre-v2-content";
import {
  managerPropose,
  personalizedQuoteIntro,
  proposeSteps,
} from "../data/old-offre-tech-ia";
import "../styles/offre-v2.css";

const CASE_STUDY_SURFACES = [
  "sticky-card--mint",
  "sticky-card--cream",
  "sticky-card--teal",
  "sticky-card--blush",
] as const;

const TERMINAL_ART = `
    ┌───────────────┐
    │  · ·     · ·  │
    │               │
    │    ▶  PLAY    │
    │               │
    ├───────────────┤
    │   ░ COIN ░    │
    └───────┬───────┘
            │
         ═══╧═══
`;

function OfferIdleScreen() {
  return (
    <div className="offre-idle-screen" aria-hidden="true">
      <div className="offre-idle-screen__scanlines" />
      <div className="offre-idle-screen__content">
        <div className="offre-idle-screen__box">
          <p className="offre-idle-screen__press">
            <span className="offre-idle-screen__blink" aria-hidden>
              ▶
            </span>{" "}
            Cliquez sur une carte ci-dessus pour lancer la partie
          </p>
        </div>
        <pre className="offre-idle-screen__art">{TERMINAL_ART}</pre>
      </div>
    </div>
  );
}

export function ProfileDetail({ profile }: { profile: ProfileEntry }) {
  return (
    <div className="space-y-8 text-forest">
      <section>
        <h3 className="field-label mb-4">Vous êtes au bon endroit si</h3>
        <ul className="space-y-2.5">
          {profile.situations.map((situation) => (
            <li
              key={situation}
              className="flex items-start gap-2.5 text-caption leading-relaxed"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-forest"
                aria-hidden
              />
              {situation}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="field-label mb-4">Je propose</h3>

        {profile.propose.useManagerPropose ? (
          <div className="space-y-3 text-caption">
            <p className="font-semibold">{managerPropose.title}</p>
            <ul className="flex flex-col gap-2">
              {managerPropose.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 shrink-0 text-pencil" aria-hidden>
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-micro text-pencil">{managerPropose.footnote}</p>
            <div className="flex justify-center pt-3">
              <Link
                href={managerPropose.ctaHref}
                className="btn-pastel btn-pastel--teal gap-2 px-5 py-3 text-sm font-semibold"
              >
                {managerPropose.ctaLabel}
                <ArrowUpRight size={16} aria-hidden className="shrink-0" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-caption leading-relaxed">
              {personalizedQuoteIntro}
            </p>

            {profile.propose.showGeneralSteps && (
              <ol className="list-decimal pl-5 space-y-3 text-caption marker:text-forest marker:font-medium">
                {proposeSteps.map((step) => (
                  <li key={step.title}>
                    <span className="font-semibold">{step.title}</span> {step.body}
                  </li>
                ))}
              </ol>
            )}

            {profile.propose.devisExamples &&
              profile.propose.devisExamples.length > 0 && (
                <div>
                  <p className="text-caption mb-2">
                    Concrètement, ça peut donner :
                  </p>
                  <ul className="space-y-2">
                    {profile.propose.devisExamples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-2 text-caption"
                      >
                        <span className="mt-1 shrink-0 text-pencil" aria-hidden>
                          ·
                        </span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </section>

      {profile.caseStudies.length > 0 && (
        <section>
          <h3 className="field-label mb-4">Ils étaient dans votre situation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.caseStudies.map((study, index) => {
              const surface =
                CASE_STUDY_SURFACES[index % CASE_STUDY_SURFACES.length];
              return (
                <div
                  key={study.name}
                  className={`sticky-card ${surface} flex flex-col gap-6`}
                >
                  <p className="text-caption leading-relaxed">
                    <span className="font-semibold">{study.name}</span>{" "}
                    {study.context} → {study.outcome}
                  </p>
                  {study.projectHref && (
                    <div className="flex justify-end">
                      <a
                        href={study.projectHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Voir le site ${study.projectLabel ?? study.name}`}
                        className="case-study-tag group"
                      >
                        <span className="group-hover:underline underline-offset-2">
                          {study.projectLabel ?? study.name}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          aria-hidden
                        />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="offre-contact-ctas pt-2">
        <a
          href={contactCtas.marseille.href}
          className="btn-primary"
        >
          <span aria-hidden="true">→</span>
          {contactCtas.marseille.label}
        </a>
        <a
          href={contactCtas.visio.href}
          className="btn-outline"
        >
          {contactCtas.visio.label}
        </a>
      </div>
    </div>
  );
}

export default function OffreTechIA() {
  const [selectedSlug, setSelectedSlug] = useState<ProfileSlug | null>(null);
  const selectedProfile = profiles.find((p) => p.slug === selectedSlug) ?? null;

  return (
    <div className="space-y-6 text-forest">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profiles.map((profile) => {
          const isSelected = selectedSlug === profile.slug;
          return (
            <button
              key={profile.slug}
              type="button"
              onClick={() => setSelectedSlug(profile.slug)}
              aria-pressed={isSelected}
              className={`offre-profile-card relative text-left rounded-card border p-4 md:p-5 transition-all ${
                isSelected
                  ? "sticky-card--mint border-forest shadow-cta"
                  : "sticky-card--cream border-pencil hover:border-forest"
              }`}
            >
              {profile.slug === "association" && (
                <span
                  className="offre-discount-sticker offre-discount-sticker--on-card"
                  aria-label={associationDiscountSticker.ariaLabel}
                >
                  {associationDiscountSticker.label}
                </span>
              )}
              <p className="flex items-start gap-2 text-sm md:text-[0.95rem] font-medium text-forest leading-snug">
                <span
                  className={`offre-profile-card__caret${isSelected ? " is-open" : ""}`}
                  aria-hidden="true"
                >
                  ▶
                </span>
                <span>{profile.statement}</span>
              </p>
            </button>
          );
        })}
      </div>

      <div className="sticky-card sticky-card--cream p-6">
        <div className="offre-offer-panel" aria-live="polite">
          {selectedProfile ? (
            <ProfileDetail profile={selectedProfile} />
          ) : (
            <OfferIdleScreen />
          )}
        </div>
      </div>
    </div>
  );
}

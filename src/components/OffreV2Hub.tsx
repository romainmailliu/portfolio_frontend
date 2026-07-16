"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { hubContent, profiles } from "../data/offre-v2-content";
import "../styles/offre-v2.css";

export default function OffreV2Hub() {
  return (
    <div className="page-shell">
      <div className="page-container max-w-3xl py-12 md:py-20">
        <Link
          href="/"
          className="nav-pill inline-flex items-center gap-1.5 px-4 py-2 text-sm text-forest mb-10 transition-colors hover:opacity-90"
        >
          <ArrowLeft size={15} aria-hidden />
          Retour au portfolio
        </Link>

        <header className="offre-v2-reveal mb-12" style={{ animationDelay: "0ms" }}>
          <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-3">
            {hubContent.eyebrow}
          </p>
          <h1 className="font-display text-heading mb-4">
            {hubContent.title}
          </h1>
          <p className="text-body-lg text-forest max-w-xl leading-relaxed">
            {hubContent.intro}
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {profiles.map((profile, i) => (
            <Link
              key={profile.slug}
              href={`/offre/${profile.slug}`}
              className="sticky-card sticky-card--cream offre-v2-reveal group block p-5 md:p-6 transition-[box-shadow] hover:shadow-cta"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: profile.accent }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-base md:text-lg font-medium text-forest leading-snug">
                    {profile.statement}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest/70 group-hover:text-forest transition-colors">
                    C&apos;est mon cas
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p
          className="mt-12 text-caption text-forest/60 text-center offre-v2-reveal"
          style={{ animationDelay: "400ms" }}
        >
          {hubContent.footnote}
        </p>

        <div
          className="sticky-card sticky-card--mint mt-10 px-5 py-3 offre-v2-reveal text-center"
          style={{ animationDelay: "480ms", transform: "rotate(-0.8deg)" }}
        >
          <p className="text-sm font-medium tracking-wide text-forest">
            Une demi-journée pour voir clair — offerte, sans engagement.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, Clapperboard, Film } from "lucide-react";
import { contactEmail } from "../data/ai-training-content";
import "../styles/production-documentaire.css";

const teamCtaMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(
  "Échange production documentaire"
)}`;

const LOCATIONS = [
  "France",
  "Indonésie",
  "Inde",
  "Liban",
] as const;

function ProductionDocumentaire() {
  return (
    <div className="pdoc-page page-shell">
      <div className="pdoc-film-edge pdoc-film-edge--left" aria-hidden />
      <div className="pdoc-film-edge pdoc-film-edge--right" aria-hidden />

      <Link href="/" className="pdoc-back nav-pill">
        <span aria-hidden>←</span>
        Carte de visite
      </Link>

      <main className="pdoc-main page-container">
        <header className="pdoc-header">
          <div className="tagline-badge">
            <Film size={14} aria-hidden />
            Production documentaire
          </div>

          <h1 className="font-display pdoc-headline">
            Et vous,
            <br />
            c&apos;est quoi
            <br />
            votre{" "}
            <span className="highlight-word">projet un peu fou</span>
            &nbsp;?
          </h1>
        </header>

        <div className="pdoc-moodboard">
          <article className="pdoc-note-wrap pdoc-note--hero">
            <div className="pdoc-tape pdoc-tape--tl" aria-hidden />
            <div className="pdoc-note pdoc-note--mint">
              <p className="field-label">Le film</p>
              <p className="text-body-lg leading-relaxed mt-2">
                Avec une équipe talentueuse, nous avons produit un documentaire
                sorti au cinéma en 2025.
              </p>
              <span className="pdoc-film-title">
                <span>I AM THE FUTURE</span>
              </span>
              <p className="text-caption leading-relaxed font-semibold">
                Synopsis :
              </p>

              <p className="text-caption leading-relaxed mt-3">
                Des rêves plein la tête malgré les difficultés qu&apos;ils
                rencontrent, quatre jeunes s&apos;interrogent sur leur avenir et
                celui de leur communauté. Venus de France, d&apos;Indonésie,
                d&apos;Inde et du Liban, leurs destins convergent à New York où
                ils témoignent de leur expérience de la pauvreté aux Nations
                Unies.
              </p>
              <p className="text-caption leading-relaxed mt-3">
                Au travers de l&apos;écriture, de la danse, de la photographie et
                du dessin, les protagonistes posent, avec courage et joie, un œil
                rare sur les grands défis contemporains.
              </p>

              <div className="pdoc-locations">
                {LOCATIONS.map((place) => (
                  <span key={place} className="pdoc-location">
                    {place}
                  </span>
                ))}
                <span className="pdoc-location-arrow" aria-hidden>
                  →
                </span>
                <span className="pdoc-location pdoc-location--dest">
                  New York · ONU
                </span>
              </div>

              <div className="pdoc-cta-block mt-4">
                <a
                  href="https://www.allocine.fr/film/fichefilm_gen_cfilm=1000013816.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span aria-hidden>→</span>
                  En savoir +
                  <ArrowUpRight size={16} aria-hidden />
                </a>
                <span className="reassurance-caption">
                  Fiche Allociné · sortie septembre 2025
                </span>
              </div>
            </div>
          </article>

          <article className="pdoc-note-wrap">
            <div className="pdoc-note pdoc-note--blush">
              <p className="field-label">L&apos;équipe</p>
              <p className="text-caption leading-relaxed mt-2">
                Réalisateur engagé, producteur d&apos;impact, entrepreneur
                idéaliste.
              </p>
              <div className="pdoc-roles">
                <span className="pdoc-role">Production</span>
                <span className="pdoc-role">Impact</span>
                <span className="pdoc-role">Distribution</span>
              </div>
              <p className="text-caption leading-relaxed mt-3">
                Un projet réalisé en partenariat avec l&apos;association{" "}
                <a
                  href="https://www.lp4y.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  LP4Y
                </a>
                , le producteur{" "}
                <a
                  href="https://www.mitiki.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Mitiki
                </a>{" "}
                et la société de production{" "}
                <a
                  href="https://www.waynapitch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Wayna Pitch
                </a>
                .
              </p>
            </div>
          </article>

          <article className="pdoc-note-wrap">
            <span className="pdoc-timecode" aria-hidden>
              00:01:24:08
            </span>
            <div className="pdoc-note pdoc-note--cream">
              <p className="field-label">Format</p>
              <div className="flex items-center gap-2 mt-2 text-caption">
                <Clapperboard size={16} strokeWidth={1.75} aria-hidden />
                Long-métrage documentaire · DocuFiction · Multilingue
              </div>
            </div>
          </article>

          <article className="pdoc-note-wrap pdoc-note--synopsis">
            <div className="pdoc-tape pdoc-tape--br" aria-hidden />
            <div className="pdoc-note pdoc-note--teal">
              <p className="field-label">Échangeons</p>
              <p className="text-caption leading-relaxed mt-3">
                Réalisateur engagé, producteur d&apos;impact, entrepreneur
                idéaliste — au plaisir d&apos;échanger et de partager quelques
                retours d&apos;expérience.
              </p>
              <a href={teamCtaMailto} className="btn-primary mt-4">
                <span aria-hidden>→</span>
                Échanger
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

export default ProductionDocumentaire;

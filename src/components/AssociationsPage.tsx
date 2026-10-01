import { Check } from "lucide-react";
import MainNav from "./MainNav";
import Moderne from "./Moderne";
import PreuveCard from "./tarifs/PreuveCard";
import {
  contactHeading,
  exampleSlugs,
  hero,
  needs,
  steps,
  stepsHeading,
  whyHeading,
  whyParagraphs,
} from "../data/associations-content";
import { contactCardAnchor } from "../data/offre-content";
import {
  applicationPreuves,
  preuves,
  preuvesHeading,
} from "../data/tarifs-content";

import "../styles/tarifs.css";

const examples = [...applicationPreuves, ...preuves].filter((preuve) =>
  (exampleSlugs as readonly string[]).includes(preuve.slug),
);

/**
 * Page /associations : l'offre part des besoins métier des associations
 * (bénévoles, adhésions, financeurs, financement, passation), pas de la
 * technique. Même gabarit que /site-vitrine (classes de tarifs.css).
 */
export default function AssociationsPage() {
  return (
    <div className="page-shell tarifs-page">
      <header className="mobile-header md:hidden">
        <div className="mobile-header__nav-row">
          <MainNav className="nav-pill mobile-header__nav flex items-center justify-center gap-0.5 px-2 py-1.5" />
        </div>
      </header>

      <MainNav className="nav-pill hidden md:flex fixed top-4 inset-x-0 mx-auto w-fit z-50 items-center justify-center gap-1 px-3 py-2 max-w-[calc(100vw-2rem)] flex-wrap" />

      <main className="page-container tarifs-main">
        {/* --- Accroche ---------------------------------------------- */}
        <section className="tarifs-hero flex flex-col items-center text-center gap-6">
          <p className="field-label">{hero.kicker}</p>
          <h1 className="tarifs-hero-title">
            {hero.titleLead}
            <br />
            <span className="highlight-word">{hero.titleHighlight}</span>
          </h1>
          <p className="tarifs-hero-intro">{hero.intro}</p>
          <a
            href={`#${contactCardAnchor}`}
            className="btn-primary btn-primary--lg mt-2"
          >
            <span aria-hidden="true">→</span>
            {hero.ctaLabel}
          </a>
        </section>

        {/* --- Besoins ------------------------------------------------ */}
        <div className="section-gap grid grid-cols-1 md:grid-cols-2 gap-5">
          {needs.map((need) => (
            <section
              key={need.slug}
              aria-labelledby={`besoin-${need.slug}`}
              className={`sticky-card ${need.surface} flex flex-col gap-4 text-forest`}
            >
              <h2 id={`besoin-${need.slug}`} className="tarifs-card-title">
                {need.title}
              </h2>
              <blockquote className="text-body-sm italic leading-relaxed">
                « {need.quote} »
              </blockquote>
              <ul className="flex flex-col gap-2.5">
                {need.answers.map((answer) => (
                  <li
                    key={answer}
                    className="flex items-start gap-2 text-body-sm leading-relaxed"
                  >
                    <Check
                      size={16}
                      aria-hidden
                      className="mt-1 shrink-0 text-forest"
                    />
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
              {need.footnote && (
                <p className="text-micro text-forest/70 mt-auto">
                  {need.footnote}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* --- Méthode ------------------------------------------------ */}
        <section className="section-gap" aria-labelledby="etapes-title">
          <h2
            id="etapes-title"
            className="tarifs-section-title text-center mb-6"
          >
            {stepsHeading}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, index) => (
              <li
                key={step}
                className="sticky-card sticky-card--cream flex flex-col gap-3 text-forest"
              >
                <span className="tarifs-card-title" aria-hidden="true">
                  {index + 1}.
                </span>
                <p className="text-body-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --- Parcours ----------------------------------------------- */}
        <section
          className="section-gap max-w-2xl mx-auto text-center"
          aria-labelledby="pourquoi-title"
        >
          <h2 id="pourquoi-title" className="tarifs-section-title mb-6">
            {whyHeading}
          </h2>
          <div className="flex flex-col gap-4 text-body-sm leading-relaxed text-forest">
            {whyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* --- Exemples ----------------------------------------------- */}
        <section className="section-gap" aria-labelledby="preuves-title">
          <h2
            id="preuves-title"
            className="tarifs-section-title text-center mb-6"
          >
            {preuvesHeading}
          </h2>
          <div className="preuves-rail scrollbar-hide xl:justify-center">
            {examples.map((preuve) => (
              <PreuveCard key={preuve.slug} preuve={preuve} />
            ))}
          </div>
        </section>

        {/* --- Contact ------------------------------------------------ */}
        <section
          id={contactCardAnchor}
          className="section-gap scroll-mt-28 max-w-xl mx-auto"
          aria-labelledby="contact-title"
        >
          <h2
            id="contact-title"
            className="tarifs-section-title text-center mb-6"
          >
            {contactHeading}
          </h2>
          <Moderne />
        </section>
      </main>
    </div>
  );
}

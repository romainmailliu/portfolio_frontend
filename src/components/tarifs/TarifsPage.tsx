import { Lightbulb } from "lucide-react";
import MainNav from "../MainNav";
import CandidatureForm from "./CandidatureForm";
import PreuveCard from "./PreuveCard";
import {
  candidatureAnchor,
  hero,
  maintenance,
  mentions,
  offres,
  offresHeading,
  payAsYouGo,
  paymentNote,
  preuves,
  preuvesHeading,
} from "../../data/tarifs-content";

import "../../styles/tarifs.css";

export default function TarifsPage() {
  return (
    <div className="page-shell tarifs-page">
      <header className="mobile-header md:hidden">
        <div className="mobile-header__nav-row">
          <MainNav className="nav-pill mobile-header__nav flex items-center justify-center gap-0.5 px-2 py-1.5" />
        </div>
      </header>

      <MainNav className="nav-pill hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center justify-center gap-1 px-3 py-2 max-w-[calc(100vw-2rem)] flex-wrap" />

      <main className="page-container tarifs-main">
        {/* --- Section 1 — Headline ---------------------------------- */}
        <section className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
          <p className="tagline-badge">
            <Lightbulb size={14} aria-hidden />
            {hero.badge}
          </p>

          <h1 className="font-display hero-headline">
            {hero.titleLead}{" "}
            <span className="highlight-word">{hero.titleHighlight}</span>{" "}
            <span className="hero-headline__tail">{hero.titleTail}</span>
          </h1>

          <p className="text-body-lg max-w-[34rem]">{hero.intro}</p>

          <div className="text-body-sm max-w-[34rem] space-y-1 opacity-85">
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="text-body-lg font-semibold max-w-[34rem]">
            {hero.promise}
          </p>

          <div className="flex flex-col items-center gap-2 mt-2">
            <a href={`#${candidatureAnchor}`} className="btn-primary btn-primary--lg">
              {hero.ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
            <p className="reassurance-caption">{hero.ctaSubtext}</p>
          </div>
        </section>

        {/* --- Section 2 — Preuves ----------------------------------- */}
        <section className="section-gap" aria-labelledby="preuves-title">
          <h2
            id="preuves-title"
            className="tarifs-section-title text-center mb-6"
          >
            {preuvesHeading}
          </h2>
          <div className="preuves-grid">
            {preuves.map((preuve) => (
              <PreuveCard key={preuve.slug} preuve={preuve} />
            ))}
          </div>
        </section>

        {/* --- Section 3 — Tarifs ------------------------------------ */}
        <section className="section-gap" aria-labelledby="tarifs-title">
          <h2
            id="tarifs-title"
            className="tarifs-section-title text-center mb-6"
          >
            {offresHeading}
          </h2>

          <div className="tarifs-grid">
            {offres.map((offre) => (
              <article
                key={offre.slug}
                className={`sticky-card tarif-card ${
                  offre.featured
                    ? "sticky-card--mint tarif-card--featured"
                    : "sticky-card--cream"
                }`}
              >
                {offre.badge && (
                  <p className="tarif-card__badge">{offre.badge}</p>
                )}
                <h3 className="tarif-card__name">{offre.name}</h3>
                <p className="tarif-card__price">{offre.price}</p>
                <p className="tarif-card__detail">{offre.detail}</p>
                {offre.hook && <p className="tarif-card__hook">{offre.hook}</p>}
              </article>
            ))}
          </div>

          <div className="sticky-card sticky-card--cream tarifs-mentions mt-6">
            <p>
              <strong>{mentions.included.label}</strong> — {mentions.included.body}
            </p>
            <p>{mentions.revisions}</p>
            <p>
              <strong>{mentions.excluded.label}</strong> — {mentions.excluded.body}
            </p>
          </div>
        </section>

        {/* --- Section 4 — Maintenance ------------------------------- */}
        <section className="section-gap" aria-labelledby="maintenance-title">
          <div className="sticky-card sticky-card--teal maintenance-box">
            <div className="maintenance-head">
              <h2 id="maintenance-title" className="maintenance-price">
                {maintenance.heading} — {maintenance.price}
              </h2>
              <p className="text-caption font-medium">
                {maintenance.freeMonths}
              </p>
            </div>

            <div>
              <p className="maintenance-block__title">{maintenance.headline}</p>
              <p className="maintenance-block__detail">
                {maintenance.headlineDetail}
              </p>
            </div>

            <div>
              <p className="maintenance-block__title">
                {maintenance.bonusTitle}
              </p>
              <p className="maintenance-block__detail">
                {maintenance.bonusDetail}
              </p>
            </div>

            <p className="maintenance-sla">
              {maintenance.sla}
              <br />
              {maintenance.slaUrgent}
            </p>
          </div>

          <div className="payg mt-5 max-w-[38rem]">
            <p className="font-medium">{payAsYouGo.title}</p>
            <ul>
              {payAsYouGo.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{paymentNote}</p>
          </div>
        </section>

        {/* --- Formulaire de candidature ----------------------------- */}
        <section className="section-gap max-w-2xl mx-auto w-full">
          <CandidatureForm />
        </section>
      </main>
    </div>
  );
}

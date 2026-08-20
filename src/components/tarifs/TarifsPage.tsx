import { Lightbulb } from "lucide-react";
import MainNav from "../MainNav";
import CandidatureForm from "./CandidatureForm";
import PreuveCard from "./PreuveCard";
import TarifsTable from "./TarifsTable";
import MaintenanceOptions from "./MaintenanceOptions";
import {
  candidatureAnchor,
  hero,
  maintenanceHeading,
  maintenanceIntro,
  mentions,
  offresHeading,
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

      <MainNav className="nav-pill hidden md:flex fixed top-4 inset-x-0 mx-auto w-fit z-50 items-center justify-center gap-1 px-3 py-2 max-w-[calc(100vw-2rem)] flex-wrap" />

      <main className="page-container tarifs-main">
        {/* --- Section 1 — Headline ---------------------------------- */}
        <section className="tarifs-hero flex flex-col items-center text-center gap-6">
          <p className="tagline-badge">
            <Lightbulb size={14} aria-hidden />
            {hero.badge}
          </p>

          <h1 className="tarifs-hero-title">
            {hero.titleLead}
            <br />
            <span className="highlight-word">{hero.titleHighlight}</span>
          </h1>

          <p className="tarifs-hero-intro">{hero.intro}</p>

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

          <TarifsTable />

          <p className="tarifs-mentions mt-5">
            <strong>{mentions.excluded.label}</strong> — {mentions.excluded.body}
          </p>
        </section>

        {/* --- Section 4 — Maintenance ------------------------------- */}
        <section className="section-gap" aria-labelledby="maintenance-title">
          <h2
            id="maintenance-title"
            className="tarifs-section-title text-center mb-3"
          >
            {maintenanceHeading}
          </h2>
          <p className="tarifs-section-intro text-center mb-6">
            {maintenanceIntro}
          </p>

          <MaintenanceOptions />
        </section>

        {/* --- Formulaire de candidature ----------------------------- */}
        <section className="section-gap max-w-2xl mx-auto w-full">
          <CandidatureForm />
        </section>
      </main>
    </div>
  );
}

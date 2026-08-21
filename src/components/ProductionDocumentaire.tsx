"use client";

import Link from "next/link";
import { ArrowUpRight, Clapperboard, Film, Globe } from "lucide-react";
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

const VOD_PLATFORMS = [
  {
    name: "Sooner",
    href: "https://www.sooner.fr/films/i-am-the-future",
  },
  {
    name: "Prime Video",
    href: "https://www.primevideo.com/-/fr/detail/0QRYN1IVNWDCZ3FC76TG4X5TXT",
  },
  {
    name: "Canal+",
    href: "https://www.canalplus.com/cinema/i-am-the-future/h/30267470_40099",
  },
  {
    name: "Première Max",
    href: "https://www.premieremax.com/",
  },
] as const;

const PARTNER_ASSOCIATIONS = [
  "ATD Quart Monde",
  "Amnesty International",
  "La Cimade",
  "Jesuit Refugee Service",
  "SINGA",
  "Utopia 56",
  "Massajobs",
  "Campus de l'inclusion",
  "1 Lettre 1 Sourire",
] as const;

const TEAM_CORE = [
  { name: "Rachel Cisinski", role: "Réalisation" },
  { name: "Romain Mailliu", role: "Production · co-auteur" },
  { name: "Bertrand Guerry", role: "Production déléguée" },
] as const;

const TEAM_CREW = [
  { name: "Mathilde d'Alançon", role: "Communication · co-autrice" },
  { name: "Gwenvaël Bigi", role: "Image · co-auteur" },
  { name: "Virgile Loiseau", role: "Son · co-auteur" },
  { name: "Simon Bart", role: "Montage" },
  { name: "Camille Rocailleux", role: "Musique originale" },
] as const;

const TEAM_ASSISTANTS = [
  { name: "Andréa Arcamone", role: "Assistante de production" },
  { name: "Manon Sabrier", role: "Assistante de production" },
] as const;

function ProductionDocumentaire() {
  return (
    <div className="pdoc-page page-shell">
      <div className="pdoc-film-edge pdoc-film-edge--left" aria-hidden />
      <div className="pdoc-film-edge pdoc-film-edge--right" aria-hidden />

      <Link href="/" className="pdoc-back nav-pill">
        <span aria-hidden>←</span>
        Accueil
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
              <h2 className="pdoc-film-title">
                <span>I AM THE FUTURE</span>
              </h2>
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
            <div className="pdoc-tape pdoc-tape--tl" aria-hidden />
            <div className="pdoc-note pdoc-note--terracotta">
              <p className="field-label">Disponibilité</p>
              <p className="text-caption leading-relaxed mt-2">
                <span className="font-semibold">I AM THE FUTURE</span> est
                disponible en VOD.
              </p>

              <div className="pdoc-availability-group mt-3">
                <p className="pdoc-availability-label">
                  <Film size={14} aria-hidden />
                  En ligne
                </p>
                <div className="pdoc-locations">
                  {VOD_PLATFORMS.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdoc-location pdoc-location--light pdoc-location--link"
                    >
                      {platform.name}
                      <ArrowUpRight size={12} aria-hidden />
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-caption leading-relaxed mt-4 opacity-90">
                Une partie des ventes revient à l&apos;association{" "}
                <a
                  href="https://www.lp4y.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-semibold"
                >
                  Life Project 4 Youth (LP4Y)
                </a>
                , sans qui ce film n&apos;existerait pas.
              </p>
            </div>
          </article>

          <article className="pdoc-note-wrap">
            <div className="pdoc-note pdoc-note--teal">
              <p className="field-label">En tournée</p>
              <p className="text-caption leading-relaxed mt-2">
                <Globe size={14} className="inline-block mr-1 -mt-0.5" aria-hidden />
                Depuis la sortie, plus de{" "}
                <strong>400 projections au cinéma</strong> dans plus de{" "}
                <strong>10 pays</strong>, avec l&apos;aide de dizaines
                d&apos;associations partenaires. Et ça continue.
              </p>

              <div className="pdoc-locations mt-3">
                {PARTNER_ASSOCIATIONS.map((partner) => (
                  <span key={partner} className="pdoc-location">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="pdoc-note-wrap pdoc-note--team">
            <div className="pdoc-note pdoc-note--blush">
              <p className="field-label">L&apos;équipe</p>
              <p className="text-caption leading-relaxed mt-2">
                Plus de deux ans, une vingtaine de professionnels et
                entrepreneurs, des dizaines de bénévoles : autant de mains pour
                raconter quatre parcours de jeunes adultes qui s&apos;engagent
                pour leur avenir.
              </p>

              <div className="pdoc-team-grid mt-4">
                {TEAM_CORE.map((member) => (
                  <div key={member.name} className="pdoc-team-member">
                    <span className="pdoc-team-name">{member.name}</span>
                    <span className="pdoc-team-role">{member.role}</span>
                  </div>
                ))}
                {TEAM_CREW.map((member) => (
                  <div key={member.name} className="pdoc-team-member">
                    <span className="pdoc-team-name">{member.name}</span>
                    <span className="pdoc-team-role">{member.role}</span>
                  </div>
                ))}
                {TEAM_ASSISTANTS.map((member) => (
                  <div key={member.name} className="pdoc-team-member">
                    <span className="pdoc-team-name">{member.name}</span>
                    <span className="pdoc-team-role">{member.role}</span>
                  </div>
                ))}
              </div>

              <p className="text-caption leading-relaxed mt-4">
                Production{" "}
                <a
                  href="https://www.mitiki.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-semibold"
                >
                  Mitiki
                </a>
                {" · coproduction "}
                <a
                  href="https://www.lp4y.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-semibold"
                >
                  LP4Y
                </a>
                {" · distribution "}
                <a
                  href="https://www.waynapitch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-semibold"
                >
                  Wayna Pitch
                </a>
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
                Long-métrage documentaire · DocuFiction · Multilingue · 1h38
              </div>
            </div>
          </article>

          <article className="pdoc-note-wrap">
            <div className="pdoc-tape pdoc-tape--br" aria-hidden />
            <div className="pdoc-note pdoc-note--teal">
              <p className="field-label">Échangeons</p>
              <p className="text-caption leading-relaxed mt-3">
                Au plaisir d&apos;échanger sur la production documentaire
                engagée et les retours d&apos;expérience du terrain.
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

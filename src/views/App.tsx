"use client";

import { usePathname } from "next/navigation";
import { MousePointer2 } from "lucide-react";
import MainNav from "../components/MainNav";
import Moderne from "../components/Moderne";
import OffreTechIA from "../components/OffreTechIA";
import {
  contactCardAnchor,
} from "../data/offre-content";

import "../styles/App.css";
import "../styles/offre.css";
type ProjectItem = {
  name: string;
  href: string;
  description: string;
  desktopDescription?: string;
};

const PROJECTS: ProjectItem[] = [
  {
    name: "Rivière",
    href: "https://www.rivieredereves.org/",
    description: "retrouver sa capacité à rêver",
  },
  {
    name: "Albane",
    href: "https://www.albanedharcourt.com/",
    description: "site vitrine coaching & facilitation",
  },
  {
    name: "Jadin LEVAT",
    href: "https://www.assolevat.fr/",
    description: "campagne citoyenne participative",
  },
  {
    name: "Coexister",
    href: "https://www.coexister.fr/",
    description: "faciliter le vivre ensemble",
  },
  {
    name: "Gomett",
    href: "https://www.gomett.com/",
    description: "trocs de compétences entre entrepreneur.e.s",
  },
  {
    name: "Klink, le son du vin",
    href: "https://www.lesonduvin.fr/",
    description: "dégustation fun",
  },
  {
    name: "ATS Séductions",
    href: "https://ats-seduction.vercel.app/",
    description: "CV pour (faire) craquer les algorithmes de recrutement",
  },
  {
    name: "Amidou",
    href: "https://www.amidou.eu/",
    description: "garder le lien avec les seniors isolés",
  },
  {
    name: "La Camaraderie",
    href: "",
    description: "brasserie sociale d'insertion (en cours)",
    desktopDescription: "brasserie solidaire (en cours)",
  },
  {
    name: "Spazzo",
    href: "https://www.spazzo.fr/",
    description: "partage de locaux entre pros (en cours)",
  },
  {
    name: "Youth Visions",
    href: "https://www.youth-visions.com/",
    description: "production de documentaires",
  },
  {
    name: "PrendsTaDose",
    href: "https://www.prendstadose.fr/",
    description: "webzine",
  },
];

const STICKY_ACCENTS = ["project-chip--mint", "project-chip--teal", "project-chip--blush"] as const;

function App() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const showOfferOnly = !isContactPage;

  const renderProjectChips = (
    options: { useDesktopDescription?: boolean; compact?: boolean } = {},
  ) => {
    const { useDesktopDescription = false, compact = false } = options;

    return PROJECTS.map((project, index) => {
      const accent = STICKY_ACCENTS[index % STICKY_ACCENTS.length];
      const description =
        useDesktopDescription && project.desktopDescription
          ? project.desktopDescription
          : project.description;
      const content = compact ? (
        <>
          {project.name}, {description}
        </>
      ) : (
        <>
          {project.name},
          <br />
          {description}
        </>
      );

      if (!project.href) {
        return (
          <span
            key={project.name}
            className={`project-chip ${accent} opacity-80 cursor-default`}
          >
            {content}
          </span>
        );
      }

      return (
        <a
          key={project.name}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`project-chip ${accent}`}
        >
          {content}
        </a>
      );
    });
  };

  const renderMainNav = (className: string) => (
    <MainNav className={className} />
  );

  const renderDesktopProjectLinks = () =>
    PROJECTS.map((project) => {
      if (!project.href) {
        return (
          <span
            key={project.name}
            className="project-link block opacity-70 cursor-default"
          >
            {project.name},
            <br />
            {project.desktopDescription ?? project.description}
          </span>
        );
      }

      return (
        <a
          key={project.name}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link block"
        >
          {project.name},
          <br />
          {project.desktopDescription ?? project.description}
        </a>
      );
    });

  return (
    <div className="page-shell">
      <header className="mobile-header md:hidden">
        <div className="nav-pill mobile-header__projects">
          <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-2 flex items-center justify-center gap-2">
            Derniers projets
            <MousePointer2 size={14} className="text-forest" aria-hidden />
          </p>
          <div className="flex flex-row flex-nowrap overflow-x-auto gap-3 pb-1 scrollbar-hide">
            {renderProjectChips({ compact: true })}
          </div>
        </div>
        <div className="mobile-header__nav-row">
          {renderMainNav(
            "nav-pill mobile-header__nav flex items-center justify-center gap-0.5 px-2 py-1.5",
          )}
        </div>
      </header>

      <section
        className={`relative z-10 min-h-screen px-4 py-6 sm:px-6 md:px-10 ${
          showOfferOnly ? "md:pt-24" : "md:pt-10"
        }`}
      >
        {showOfferOnly &&
          renderMainNav(
            "nav-pill hidden md:flex fixed top-4 inset-x-0 mx-auto w-fit z-50 items-center justify-center gap-1 px-3 py-2 max-w-[calc(100vw-2rem)] flex-wrap",
          )}

        {showOfferOnly && (
          <div className="hidden md:block w-full max-w-page mb-8 page-container">
            <div className="sticky-card sticky-card--cream">
              <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-3 flex items-center gap-2">
                Derniers projets
                <MousePointer2 size={14} aria-hidden />
              </p>
              <div className="flex flex-row flex-nowrap overflow-x-auto gap-3 pb-1 scrollbar-hide">
                {renderProjectChips({ useDesktopDescription: true })}
              </div>
              <p className="reassurance-caption text-center mt-2">Défiler →</p>
            </div>
          </div>
        )}

        {!showOfferOnly && (
          <aside className="hidden lg:flex lg:fixed lg:right-6 lg:top-24 lg:w-[220px] z-20 flex-col items-end gap-1">
            <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-1 flex items-center gap-2">
              Derniers projets
              <MousePointer2 size={14} aria-hidden />
            </p>
            <div className="flex flex-col gap-0.5">{renderDesktopProjectLinks()}</div>
          </aside>
        )}

        <div className="page-container flex flex-col items-center w-full">
          {!showOfferOnly && (
            <div className="w-full max-w-xl mx-auto mt-4 sm:mt-10 md:mt-0 flex flex-col items-stretch gap-8 sm:gap-10">
              {renderMainNav(
                "nav-pill hidden md:flex self-center items-center gap-2 px-4 py-2 shrink-0",
              )}

              <div className="hero-copy flex flex-col items-center gap-5 text-center">
                <h1 className="font-display hero-headline">
                  La Tech au service de{" "}
                  <span className="highlight-word">votre mission</span>
                </h1>

                <p className="text-body-lg max-w-[32rem] text-forest">
                  J&apos;accompagne les associations et entrepreneur.e.s
                  engagé.e.s à mettre la Tech au service de leur mission, au
                  juste prix.
                </p>
              </div>

              <Moderne />

              <div className="sticky-card sticky-card--mint">
                <div className="space-y-4 text-forest text-body-sm">
                  <div className="flex justify-start mb-1">
                    <a
                      href="https://www.linkedin.com/in/romain-mailliu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption font-medium underline underline-offset-4 text-forest hover:opacity-70"
                    >
                      Mon LinkedIn
                    </a>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed">
                    Ingénieur évoluant entre entreprises et ONG, en France et
                    à l&apos;international, je mets l&apos;entrepreneuriat et
                    l&apos;innovation au service de l&apos;impact social et
                    environnemental.
                  </p>
                  <p>Aujourd&apos;hui, j&apos;accompagne :</p>
                  <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                    <li>
                      Des entrepreneur.e.s en phase de lancement à passer de
                      l&apos;idée aux premières ventes, en développant leurs outils
                      tech (sites web, automatisations, CRM…) et leur
                      proposition de valeur.
                    </li>
                    <li>
                      Des associations et entreprises à impact pour automatiser
                      leurs processus chronophages avec l&apos;IA pour se
                      concentrer sur leur cœur de métier.
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Également producteur du film{" "}
                    <span className="font-semibold">I AM THE FUTURE</span>,
                    sorti en salles en septembre 2025, qui donne la parole à
                    de jeunes adultes en première ligne des crises
                    contemporaines, jusqu&apos;aux Nations Unies à New York.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Stack :</span> HTML5,
                    CSS, JavaScript, TypeScript, React, React Native, Redux,
                    Next.js, Node.js, Express, MongoDB, Mongoose, Vercel, Git,
                    GitHub, TDD, n8n, Airtable, WordPress, Webflow, Claude
                    Code, Claude CoWork, Cursor, Figma, Framer, Canva, Gamma,
                    Supabase et Midjourney
                  </p>
                </div>
              </div>
            </div>
          )}

          {showOfferOnly && (
            <div className="w-full mt-8 space-y-8">
              <div className="max-w-4xl mx-auto space-y-4 text-center">
                <h1 className="font-display text-heading text-center">
                  La technologie et l&apos;IA au service de{" "}
                  <span className="highlight-word">votre mission</span>
                </h1>
                <p className="text-body-lg max-w-[600px] mx-auto text-forest">
                  Associations, entrepreneur.e.s, collectifs : libérez-vous des
                  tâches répétitives et créez de nouvelles opportunités grâce à
                  des outils tech alignés avec votre mission.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <OffreTechIA />
              </div>
              <div
                id={contactCardAnchor}
                className="max-w-xl mx-auto w-full scroll-mt-28 mt-12 md:mt-16 section-gap"
              >
                <Moderne />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

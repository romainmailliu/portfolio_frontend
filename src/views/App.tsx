"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Moderne from "../components/Moderne";
import { MousePointer2 } from "lucide-react";

import "../styles/App.css";

type DesignOption = "Contact" | "OffreTechIA";
type PageOption = "Offre" | "Pitch";
type ProjectItem = {
  name: string;
  href: string;
  description: string;
  desktopDescription?: string;
};

const PROJECTS: ProjectItem[] = [
  {
    name: "ATS Séductions",
    href: "https://ats-seduction.vercel.app/",
    description: "CV pour (faire) craquer les algorithmes de recrutement.",
  },
  {
    name: "Amidou",
    href: "https://www.amidou.eu/",
    description: "garder le lien avec les seniors isolés",
  },
  {
    name: "Gomett",
    href: "https://www.gomett.com/",
    description: "trocs de compétences entre entrepreneur.e.s",
  },
  {
    name: "La Camaraderie",
    href: "",
    description: "brasserie sociale d'insertion (en cours)",
    desktopDescription: "brasserie solidaire (en cours)",
  },
  {
    name: "Coexister",
    href: "",
    description: "faciliter le vivre ensemble.",
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

function App() {
  const pathname = usePathname();
  const isOfferPage = pathname === "/offre-tech-ia";
  const [selectedDesign, setSelectedDesign] = useState<DesignOption>(
    isOfferPage ? "OffreTechIA" : "Contact",
  );
  const activeButton: DesignOption = isOfferPage ? "OffreTechIA" : selectedDesign;
  const showOfferOnly = isOfferPage || selectedDesign === "OffreTechIA";
  const currentPage: PageOption = showOfferOnly ? "Offre" : "Pitch";

  const renderProjectLinks = (
    linkClassName: string,
    useDesktopDescription = false,
  ) =>
    PROJECTS.map((project) => (
      <a
        key={project.name}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {project.name},
        <br />
        {useDesktopDescription && project.desktopDescription
          ? project.desktopDescription
          : project.description}
      </a>
    ));

  return (
    <>
      {/* 📱 PROJETS mobile — fixed en haut, hors du flux */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur z-50 px-4 pt-3 pb-2 border-b border-gray-200">
        <h2 className="font-semibold text-base mb-1 flex items-center justify-center md:justify-between">
          <span className="flex items-center gap-2">
            Derniers projets
            <MousePointer2 size={16} className="text-black" />
          </span>
        </h2>
        <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 pb-1 scrollbar-hide justify-start">
          {renderProjectLinks("shrink-0 text-center text-sm px-2 py-1")}
        </div>
      </div>

      <section
        className={`relative z-10 min-h-screen bg-gradient-to-br from-white via-gray-50 to-stone-100 p-10 ${
          showOfferOnly
            ? "flex flex-col items-center justify-start pt-36 md:pt-16"
            : "flex items-start justify-center pt-36 md:pt-24"
        }`}
      >
        {showOfferOnly && (
          <div className="hidden md:block w-full max-w-5xl mb-8">
            <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3">
              <h2 className="font-semibold text-base mb-2 flex items-center justify-center">
                <span className="flex items-center gap-2 text-center">
                  Derniers projets
                  <MousePointer2 size={14} className="text-black" />
                </span>
              </h2>
              <div className="mt-2 flex flex-row flex-nowrap overflow-x-auto gap-4 pb-1 scrollbar-hide justify-start">
                {renderProjectLinks("shrink-0 text-center text-sm px-2 py-1")}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Défiler →
              </p>
            </div>
          </div>
        )}

        {/* 👉 PROJETS desktop — fixed, hors du flux */}
        {!showOfferOnly && (
          <div className="hidden md:flex md:fixed md:right-0 md:top-0 md:h-full md:p-7 z-20 flex-col items-end">
            <h2 className="font-semibold text-base mb-1 flex items-center justify-between">
              <span className="mx-auto">Derniers projets</span>
              <MousePointer2 size={16} className="text-black" />
            </h2>
            <div className="flex flex-col gap-1">
              {renderProjectLinks(
                "text-right text-sm relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full",
                true,
              )}
            </div>
          </div>
        )}

        {/* 🔲 CENTRE */}
        <div className="flex flex-col items-center gap-1 w-full max-w-5xl">
          {!showOfferOnly && (
            <div className="mb-4 -rotate-1 bg-gradient-to-r from-sky-100 via-cyan-100 to-amber-100 text-sky-950 border-2 border-sky-400 px-5 py-3 shadow-[3px_4px_0px_rgba(12,74,110,0.45)] rounded-sm max-w-3xl relative before:absolute before:-inset-1 before:border before:border-amber-300/80 before:-z-10 before:rotate-[0.6deg]">
              <p className="text-sm md:text-base text-center font-medium tracking-wide">
                J&apos;accompagne les associations et entrepreneurs engagé.e.s
                <br />
                à mettre la Tech au service de leur mission, à prix libre.
              </p>
            </div>
          )}

          {/* 🎨 Choix design */}
          <div className="flex gap-5 mb-2 self-stretch justify-center items-center">
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              ${activeButton === "Contact" ? "font-bold after:w-full" : "font-normal hover:after:w-full"}`}
              onClick={() => {
                if (isOfferPage) {
                  window.location.href = "/";
                  return;
                }
                setSelectedDesign("Contact");
              }}
            >
              Contact
            </button>
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              ${activeButton === "OffreTechIA" ? "font-bold after:w-full" : "font-normal hover:after:w-full"}`}
              onClick={() => {
                if (isOfferPage) {
                  return;
                }
                setSelectedDesign("OffreTechIA");
              }}
            >
              Offre Tech & IA
            </button>
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              font-normal hover:after:w-full`}
              onClick={() => {
                window.location.href = "/production-documentaire";
              }}
            >
              Production
            </button>
          </div>

          {/* 💼 Carte */}
          <div>
            {!showOfferOnly && <Moderne />}
          </div>

          {/* 🔘 Boutons page */}
          <div className="w-screen px-10 mt-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
              {currentPage === "Offre" && (
                  <>
                    {showOfferOnly && (
                      <div className="space-y-8 text-gray-700">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            La technologie et l’IA au service de votre mission,
                            au juste prix.
                          </h2>
                        </div>

                        <div className="space-y-3">
                          <p>
                            Associations, entrepreneurs, collectifs : libérez-vous des tâches répétitives et créez de nouvelles opportunités grâce à des outils tech alignés avec votre mission.
                          </p>
                          <p>Je propose :</p>
                          <ol className="list-decimal pl-5 space-y-3 marker:text-gray-500 marker:font-medium">
                            <li>
                              <span className="font-semibold">
                                Une demi-journée pour voir clair — offerte :
                              </span>{" "}
                              Je viens découvrir votre projet et comprendre
                              vos objectifs. À la
                              fin, vous savez où la technologie peut vous faire
                              gagner du temps et apporter de nouvelles
                              opportunités.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Une proposition constuite ensemble, à prix libre.
                              </span>{" "}
                              Pas d'offre générique et impersonnelle. Je pars de
                              mes observations, de votre budget et je priorise.
                            </li>
                            <li>
                              Je construis ce dont vous avez{" "}
                              <span className="italic">vraiment</span> besoin -
                              pas plus, pas moins.
                            </li>
                          </ol>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 tracking-tight mb-3">
                            Les dernières réalisations :
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative border border-gray-100 rounded-xl p-4 pr-20 pb-10 bg-white hover:shadow-sm transition-shadow">
                              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 rounded-full px-2 py-0.5">
                                Marseille
                              </span>
                              <p className="text-sm">
                                <span className="font-semibold">Léo</span>{" "}
                                avait
                                besoin d&apos;être visible avant son lancement -
                                {">"} un site optimisé pour Google et les IA,
                                prêt le jour J
                              </p>
                            </div>
                            <div className="relative border border-gray-100 rounded-xl p-4 pr-20 pb-10 bg-white hover:shadow-sm transition-shadow">
                              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 rounded-full px-2 py-0.5">
                                Marseille
                              </span>
                              <p className="text-sm">
                                <span className="font-semibold">
                                  La Camaraderie
                                </span>{" "}
                                voulait publier ses événements en autonomie, sans
                                dépendre de personne - {">"} un site simple,
                                bien référencé, qu&apos;ils gèrent eux-mêmes
                              </p>
                            </div>
                            <div className="relative border border-gray-100 rounded-xl p-4 pr-20 pb-10 bg-white hover:shadow-sm transition-shadow">
                              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 rounded-full px-2 py-0.5">
                                Marseille
                              </span>
                              <p className="text-sm">
                                <span className="font-semibold">Antoine</span>{" "}
                                perdait du temps à éditer des bons de commande à
                                la main - {">"} ses fichiers Excel génèrent
                                maintenant les documents automatiquement
                              </p>
                            </div>
                            <div className="relative border border-gray-100 rounded-xl p-4 pr-20 pb-10 bg-white hover:shadow-sm transition-shadow">
                              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 rounded-full px-2 py-0.5">
                                Marseille
                              </span>
                              <p className="text-sm">
                                <span className="font-semibold">Jade</span>{" "}
                                voulait faciliter le troc de compétences entre
                                entrepreneurs - {">"} une application sur mesure
                                pour sa communauté
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <section
                      className={
                        showOfferOnly
                          ? "mt-12 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 md:p-8 shadow-sm"
                          : "mt-0"
                      }
                    >
                      {showOfferOnly && (
                        <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">
                          Exemples d'offres détaillées
                        </p>
                      )}
                        {/* Header avec titre */}
                        <div className="mb-8">
                          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Site web & application
                          </h2>
                        </div>

                        {/* Grille des offres */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* 🟣 Essentiel */}
                          <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div>
                              <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 mb-1" />
                              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                                Essentiel
                              </span>
                              <p className="text-sm text-gray-500 mt-1">
                                Idéal pour démarrer rapidement avec un site
                                vitrine
                              </p>
                            </div>

                        <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                          {[
                            "3 à 5 pages (présentation, services, équipe, contact…)",
                            "Module d'articles / actualités",
                            "Formulaire de contact + inscription newsletter",
                            "Formation + vidéo pour gérer le site facilement",
                            "Sans abonnement mensuel ",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 shrink-0 text-gray-300">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                          ⏱ Délai estimé : ~1 semaine
                        </p>
                      </div>

                      {/* 🔵 Visibilité */}
                      <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div>
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 mb-1" />
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                            Visibilité
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            Pour être trouvé facilement sur Google
                          </p>
                        </div>

                        <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                          {[
                            "Tout ce qui est inclus dans l'offre Essentiel",
                            "Connexion à Google Business (Google Maps)",
                            "Installation de Google Analytics",
                            "Optimisation SEO (référencement naturel)",
                          ].map((item, i) => (
                            <li key={item} className="flex items-start gap-2">
                              <span
                                className={`mt-1 shrink-0 ${i === 0 ? "text-blue-300" : "text-gray-300"}`}
                              >
                                {i === 0 ? "↳" : "—"}
                              </span>
                              <span
                                className={
                                  i === 0 ? "font-medium text-gray-700" : ""
                                }
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                          ⏱ Délai estimé : ~2 semaines
                        </p>
                      </div>

                      {/* 🟢 Avancé */}
                      <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div>
                          <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 mb-1" />
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                            Avancé
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            Pour vendre en ligne ou développer un projet plus
                            complet
                          </p>
                        </div>

                        <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                          {[
                            "Création d'un site e-commerce (boutique en ligne)",
                            "Gestion des produits, paiements, commandes",
                            "Accompagnement sur la stratégie digitale",
                            "Fonctionnalités sur mesure selon vos besoins",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 shrink-0 text-gray-300">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                          ⏱ Délai selon le projet
                        </p>
                      </div>
                    </div>

                    {/* 🤖 Offre IA */}
                    <div className="mt-12">
                      <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                          Automatisation & IA
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 🟣 Diagnostic */}
                        <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                          <div>
                            <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 mb-1" />
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                              Diagnostic
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              Identifier les tâches à automatiser en priorité
                            </p>
                          </div>

                          <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                            {[
                              "Audit gratuit de vos processus",
                              "Cartographie des tâches chronophages",
                              "Identification des opportunités d'automatisation avec l'IA",
                              "Recommandations concrètes et priorisées",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 text-gray-300">
                                  —
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                            🎁 Gratuit — sans engagement
                          </p>
                        </div>

                        {/* 🔵 Automatisation */}
                        <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                          <div>
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 mb-1" />
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                              Automatisation
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              Gagner du temps sur vos opérations quotidiennes
                            </p>
                          </div>

                          <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                            {[
                              "Automatisation des tâches répétitives (emails, reporting, CRM…)",
                              "Mise en place de workflows (n8n, Airtable…)",
                              "Connexion de vos outils existants",
                              "Réduction du temps passé sur l’administratif",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 text-gray-300">
                                  —
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                            ⏱ Délai : 1-2 semaines
                          </p>
                        </div>

                        {/* 🟢 IA sur mesure */}
                        <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                          <div>
                            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 mb-1" />
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                              IA sur mesure
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              Créer des outils adaptés à votre mission
                            </p>
                          </div>

                          <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                            {[
                              "Chatbots internes ou externes",
                              "Génération de contenus (emails, rapports, posts…)",
                              "Outils d’aide à la décision",
                              "Solutions personnalisées selon vos besoins terrain",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 text-gray-300">
                                  —
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                            ⏱ Délai selon le projet
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                  {showOfferOnly && (
                    <div className="mt-6 text-center">
                      <Link
                        href="/offre-tech-ia"
                        className="text-sm text-gray-600 underline underline-offset-4 hover:text-black"
                      >
                        Voir la version dédiée de l&apos;offre
                      </Link>
                    </div>
                  )}
                  </>
                )}

              {currentPage === "Pitch" && (
                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-start mb-3">
                      <a
                        href="https://www.linkedin.com/in/romain-mailliu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base underline underline-offset-4 text-gray-600 hover:text-black"
                      >
                        Voir mon profil LinkedIn
                      </a>
                    </div>
                    <p className="whitespace-pre-line">
                      Ingénieur avec 9 ans d'expérience à l'international, en
                      entreprise comme en ONG, je mets l'entrepreneuriat et
                      l'innovation au service des défis sociaux et
                      environnementaux.
                    </p>
                    <p>Aujourd'hui, j'accompagne :</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Des entrepreneurs en phase de lancement à passer de
                        l'idée aux premières ventes, en développant leurs outils
                        tech (sites web, automatisations, CRM…) et leur
                        proposition de valeur.
                      </li>
                      <li>
                        Des associations et entreprises à impact à automatiser
                        leurs processus chronophages avec l'IA pour se
                        concentrer sur leur cœur de métier.
                      </li>
                    </ul>
                    <p>
                      Également producteur du film{" "}
                      <span className="font-semibold">I AM THE FUTURE</span>,
                      sorti en salles en septembre 2025, qui donne la parole à
                      de jeunes adultes en première ligne des crises
                      contemporaines, jusqu’aux Nations Unies à New York.
                    </p>
                    <p>
                      <span className="font-semibold">Stack :</span> HTML 5,
                      CSS, JavaScript, TypeScript, React, React Native, Redux,
                      Next.js, NodeJS, Express, MongoDB, Mongoose, Vercel, Git,
                      GitHub, TDD, n8n, Airtable, Wordpress, WebFlow, Claude
                      Code, Claude CoWork, Cursor, Figma, Framer, Canva, Gamma,
                      SupaBase et Midjourney
                    </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

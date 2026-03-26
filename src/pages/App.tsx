import { useState } from "react";
import Classique from "../components/Classique.tsx";
import Futuriste from "../components/Futuriste.tsx";
import Moderne from "../components/Moderne.tsx";
import { MousePointer2 } from "lucide-react";

import "../styles/App.css";

type DesignOption = "Classique" | "Moderne" | "Future";
type PageOption = "Offre" | "Pitch" | "Poème" | "";

function App() {
  const [activeButton, setActiveButton] = useState<DesignOption | null>(
    "Moderne",
  );
  const [design, setDesign] = useState<DesignOption>("Moderne");
  const [page, setPage] = useState<PageOption>("Offre");

  const handleButtonClick = (
    buttonName: DesignOption,
    designType: DesignOption,
  ) => {
    setActiveButton(buttonName);
    setDesign(designType);
  };

  if (window.location.pathname === "/future") {
    return <Futuriste />;
  }

  return (
    <>
      {/* 📱 PROJETS mobile — fixed en haut, hors du flux */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur z-50 px-4 pt-3 pb-2 border-b border-gray-200">
        <h2 className="font-semibold text-base mb-1 text-center">
          Derniers projets
        </h2>
        <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 pb-1 scrollbar-hide justify-start">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-center text-sm px-2 py-1"
          >
            La camaraderie,
            <br />
            brasserie solidaire (en cours)
          </a>
          <a
            href="https://www.youth-visions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-center text-sm px-2 py-1"
          >
            Youth Visions,
            <br />
            production de documentaires
          </a>
          <a
            href="https://www.youth-visions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-center text-sm px-2 py-1"
          >
            PrendsTaDose,
            <br />
            webzine
          </a>
        </div>
      </div>

      <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-stone-100 flex items-start justify-center pt-36 md:pt-24 p-10">
        {/* 👉 PROJETS desktop — fixed, hors du flux */}
        <div className="hidden md:flex md:fixed md:right-0 md:top-0 md:h-full md:p-7 flex-col items-end">
          <h2 className="font-semibold text-base mb-1 text-center flex items-center justify-center gap-1">
            Derniers projets
            <MousePointer2 size={16} className="text-black" />
          </h2>
          <div className="flex flex-col gap-1">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-right relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              La camaraderie,
              <br />
              brasserie solidaire {"(en cours)"}
            </a>
            <a
              href="https://www.youth-visions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-right relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              Youth Visions,
              <br />
              production de documentaires
            </a>
            <a
              href="https://www.prendstadose.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-right relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              PrendsTaDose,
              <br />
              webzine
            </a>
          </div>
        </div>

        {/* 🔲 CENTRE */}
        <div className="flex flex-col items-center gap-1 w-full max-w-5xl">
          {/* 🎨 Choix design */}
          <div className="flex gap-5 mb-2 self-stretch justify-center items-center">
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              ${activeButton === "Classique" ? "font-bold after:w-full" : "font-normal hover:after:w-full"}`}
              onClick={() => handleButtonClick("Classique", "Classique")}
            >
              Classique
            </button>
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              ${activeButton === "Moderne" ? "font-bold after:w-full" : "font-normal hover:after:w-full"}`}
              onClick={() => handleButtonClick("Moderne", "Moderne")}
            >
              Moderne
            </button>
            <button
              className={`relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all
              ${activeButton === "Future" ? "font-bold after:w-full" : "font-normal hover:after:w-full"}`}
              onClick={() => {
                handleButtonClick("Future", "Future");
                window.location.href = "/future";
              }}
            >
              Futuriste
            </button>
          </div>

          {/* 💼 Carte */}
          <div>
            {design === "Moderne" && <Moderne />}
            {design === "Classique" && <Classique />}
          </div>

          {/* 🔘 Boutons page */}
          <div className="flex gap-8 mt-2 self-stretch justify-center items-center">
            <button
              onClick={() => setPage("Offre")}
              className="relative px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer overflow-hidden hover:bg-gray-700 transition"
            >
              <span className="relative z-10">Offre</span>

              <span className="pointer-events-none absolute inset-0 rounded-lg">
                <span
                  className="absolute inset-[-2px] rounded-lg 
     bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] 
      animate-[spin_4s_linear_infinite] opacity-70 blur-[2px]"
                ></span>
              </span>
            </button>
            <button
              onClick={() => setPage("Pitch")}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Pitch
            </button>
            <button
              onClick={() => setPage("Poème")}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Poème
            </button>
          </div>

          {page !== "" && (
            <div className="w-screen px-10 mt-10">
              <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
                {page === "Offre" && (
                  <>
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
                            Idéal pour démarrer rapidement avec un site vitrine
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
                            ⏱ Délai : quelques jours à 2 semaines
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
                  </>
                )}

                {page === "Pitch" && (
                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-start mb-3">
                      <a
                        href="/Romain_Mailliu_CV_Dev_2026.pdf"
                        download
                        className="text-base underline underline-offset-4 text-gray-600 hover:text-black"
                      >
                        Télécharger mon CV
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
                      Egalement producteur du film{" "}
                      <span className="font-semibold">I AM THE FUTURE</span>,
                      sorti en salles en septembre 2025, qui donne la parole à
                      de jeunes adultes en première ligne des crises
                      contemporaines, jusqu’aux Nations Unies à New York.
                    </p>
                    <p>
                      <span className="font-semibold">Stack :</span> HTML 5,
                      CSS, JavaScript, TypeScript, React, React Native, Redux,
                      Next.js, NodeJS, Express, MongoDB, Mongoose, Vercel, Git,
                      GitHub, TDD, n8n, Airtable, Wordpress, WebFlow
                    </p>
                  </div>
                )}
                {page === "Poème" && <p>J'y travaille 😅</p>}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;

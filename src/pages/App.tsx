import { useState } from "react";
import Classique from "../components/Classique.tsx";
import Futuriste from "../components/Futuriste.tsx";
import Moderne from "../components/Moderne.tsx";

import "../styles/App.css";

type DesignOption = "Classique" | "Moderne" | "Future";
type PageOption = "CV" | "Pitch" | "Poème" | "";

function App() {
  const [activeButton, setActiveButton] = useState<DesignOption | null>(null);
  const [design, setDesign] = useState<DesignOption>("Classique");
  const [page, setPage] = useState<PageOption>("");

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
      <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-stone-100 flex items-start justify-center pt-8 md:pt-24 p-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
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
                Future
              </button>
            </div>

            {/* 💼 Carte */}
            <div>
              {design === "Classique" && <Classique />}
              {design === "Moderne" && <Moderne />}
            </div>

            {/* 🔘 Boutons page */}
            <div className="flex gap-8 mt-2 self-stretch justify-center items-center">
              <button
                onClick={() => setPage("CV")}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                CV
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
                  {page === "CV" && (
                    <iframe
                      src="/Romain_Mailliu_FlowCV_Portfolio.pdf#toolbar=0"
                      className="w-full h-[90vh] rounded-lg bg-white"
                    />
                  )}

                  {page === "Pitch" && (
                    <div className="space-y-4 text-gray-700">
                      <p className="whitespace-pre-line">
                        Ingénieur avec 9 ans d'expérience à l'international, en
                        entreprise comme en ONG, je mets l'entrepreneuriat et
                        l'innovation au service des défis sociaux et
                        environnementaux.
                      </p>
                      <p>
                        Aujourd'hui, j'accompagne des entrepreneurs en phase de
                        lancement à passer de l'idée aux premières ventes, en
                        développant leurs outils tech (sites web,
                        automatisations, CRM…) et en structurant leur activité
                        et leur proposition de valeur. En parallèle, après une
                        formation de développeur.
                      </p>
                      <p>
                        Egalement producteur du film{" "}
                        <span className="font-semibold">I AM THE FUTURE</span>,
                        sorti en salles en septembre 2025, qui donne la parole à
                        de jeunes adultes en première ligne des crises
                        contemporaines, jusqu'aux Nations Unies à New York.
                      </p>

                      <p>
                        <span className="font-semibold">Stack :</span> HTML 5,
                        CSS, JavaScript, TypeScript, React, React Native, Redux,
                        Next.js, NodeJS, Express, MongoDB, Mongoose, Vercel,
                        Git, GitHub, TDD, n8n, Wordpress, WebFlow
                      </p>
                    </div>
                  )}

                  {page === "Poème" && <p>J'y travaille 😅</p>}
                </div>
              </div>
            )}
          </div>

          {/* 👉 DROITE : projets */}
          <div
            className="md:fixed md:right-0 md:top-0 md:h-full md:p-7
                flex flex-col items-center md:items-end
                order-first md:order-none
                mb-4 md:mb-0 w-full md:w-auto"
          >
            <h2 className="font-semibold text-lg mb-3 md:text-right text-center">
              Derniers projets
            </h2>

            {/* 📱 Scroll horizontal mobile / vertical desktop */}
            <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 md:flex-col md:overflow-x-visible md:gap-1 w-full md:w-auto pb-2">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-max md:text-right text-center relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                La camaraderie,
                <br />
                brasserie solidaire {"(en cours)"}
              </a>
              <a
                href="https://www.youth-visions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-max md:text-right text-center relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Youth Visions,
                <br />
                production de documentaires
              </a>
              <a
                href="https://www.youth-visions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-max md:text-right text-center relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                PrendsTaDose,
                <br />
                webzine
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

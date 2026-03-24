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

      <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-stone-100 flex items-start justify-center pt-28 md:pt-24 p-10">
        {/* 👉 PROJETS desktop — fixed, hors du flux */}
        <div className="hidden md:flex md:fixed md:right-0 md:top-0 md:h-full md:p-7 flex-col items-end">
          <h2 className="font-semibold text-lg mb-2 text-right">
            Derniers projets
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
              href="https://www.youth-visions.com/"
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
                    <p>Ingénieur avec 9 ans d'expérience...</p>
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

import { useState } from "react";
import Classique from "../components/Classique";
import Future from "../components/Future";
import Moderne from "../components/Moderne";

import "../styles/App.css";

type DesignOption = "Classique" | "Moderne" | "Future";

function App() {
  const [activeButton, setActiveButton] = useState<DesignOption | null>(null);
  const [design, setDesign] = useState<DesignOption>("Classique");

  const handleButtonClick = (
    buttonName: DesignOption,
    designType: DesignOption,
  ) => {
    setActiveButton(buttonName);
    setDesign(designType);
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-stone-100 flex items-center justify-center p-10">
        {/* Layout global */}

        <div className="flex gap-10 items-center">
          {/* 🔲 CENTRE */}
          <div className="flex flex-col items-center gap-1">
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
                onClick={() => handleButtonClick("Future", "Future")}
              >
                Future
              </button>
            </div>

            {/* 💼 Carte */}
            <div>
              {design === "Classique" && <Classique />}
              {design === "Moderne" && <Moderne />}
              {design === "Future" && <Future />}
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
                onClick={() => setPage("Poeme")}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Pitch
              </button>
              <button
                onClick={() => setPage("LinkedIn")}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Poème
              </button>
            </div>
          </div>

          {/* 👉 DROITE : projets */}
          <div className="fixed right-0 top-0 h-full p-8">
            <h2 className="font-semibold text-lg mb-4">Derniers projets</h2>
            <div className="flex flex-col gap-2">
              <a
                href=""
                className="relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Projet Matthieu
              </a>
              <a
                href=""
                className="relative px-2 py-1 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Projet Brasserie
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

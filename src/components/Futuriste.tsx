import { useEffect, useState } from "react";

function Future() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const t = tick * 0.5;

  // ✅ Luminosité bien plus haute (25-40%) pour voir les couleurs
  const c1 = `hsl(${t % 360}, 100%, 30%)`;
  const c2 = `hsl(${(t + 90) % 360}, 90%, 25%)`;
  const c3 = `hsl(${(t + 180) % 360}, 100%, 35%)`;
  const c4 = `hsl(${(t + 270) % 360}, 90%, 28%)`;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse at ${50 + Math.sin(t * 0.02) * 30}% ${40 + Math.cos(t * 0.015) * 20}%, ${c1} 0%, transparent 55%),
          radial-gradient(ellipse at ${60 + Math.cos(t * 0.018) * 25}% ${60 + Math.sin(t * 0.02) * 25}%, ${c2} 0%, transparent 50%),
          radial-gradient(ellipse at ${30 + Math.sin(t * 0.022) * 20}% ${70 + Math.cos(t * 0.01) * 20}%, ${c3} 0%, transparent 55%),
          radial-gradient(ellipse at ${70 + Math.cos(t * 0.012) * 30}% ${30 + Math.sin(t * 0.025) * 20}%, ${c4} 0%, transparent 50%),
          #050510
        `,
      }}
    >
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute top-6 left-6 text-white/60 hover:text-white text-sm transition-all duration-300 underline underline-offset-4"
      >
        ← retour à la carte de visite
      </button>

      <div className="max-w-4xl mx-6 md:mx-10 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-sm p-6 md:p-10 text-white">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">
          Et vous, c&apos;est quoi votre projet un peu fou ?
        </h1>

        <div className="space-y-5 text-white/90 leading-relaxed">
          <p>
            Avec une équipe talentueuse au possible, nous avons produit un film
            documentaire -{" "}
            <span className="font-semibold">I AM THE FUTURE</span> - sorti au
            cinéma en 2025.
          </p>

          <p>
            Réalisateur engagé, producteur d&apos;impact, entrepreneur idéaliste
            - au plaisir d&apos;échanger et de partager quelques retours
            d&apos;expérience.
          </p>

          <p>
            <span className="font-semibold">Synopsis :</span> Des rêves plein la
            tête malgré les difficultés qu&apos;ils rencontrent, quatre jeunes
            s&apos;interrogent sur leur avenir et celui de leur communauté.
            Venus de France, d&apos;Indonésie, d&apos;Inde et du Liban, leurs
            destins convergent à New York où ils témoignent de leur expérience
            de la pauvreté aux Nations Unies. Au travers de l&apos;écriture, de
            la danse, de la photographie et du dessin, les protagonistes posent,
            avec courage et joie, un oeil rare sur les grands défis
            contemporains.
          </p>

          <a
            href="https://www.allocine.fr/film/fichefilm_gen_cfilm=1000013816.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            En savoir +
          </a>
        </div>
      </div>
    </div>
  );
}

export default Future;

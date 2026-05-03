"use client";

import Link from "next/link";
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
      className="relative min-h-[100dvh] overflow-x-hidden flex flex-col items-stretch pb-[max(1.5rem,env(safe-area-inset-bottom))]"
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
      <Link
        href="/"
        className="fixed z-[100] flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/70 active:bg-black/80 left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))]"
      >
        <span aria-hidden>←</span>
        <span className="max-w-[min(16rem,calc(100vw-5rem))] leading-tight underline decoration-white/40 underline-offset-2">
          retour à la carte de visite
        </span>
      </Link>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 pb-6 pt-[max(5.5rem,calc(4.5rem+env(safe-area-inset-top)))] md:px-10">
        <div className="rounded-2xl border border-white/20 bg-black/30 p-6 text-white backdrop-blur-sm md:p-10 break-words">
          <h1 className="mb-6 text-xl font-semibold tracking-tight sm:text-2xl md:text-4xl">
            Et vous, c&apos;est quoi votre projet un peu fou ?
          </h1>

          <div className="space-y-5 leading-relaxed text-white/90">
            <p>
              Avec une équipe talentueuse, j&apos;ai produit un film documentaire
              -{" "}
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
              className="mt-2 inline-block font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              En savoir +
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Future;

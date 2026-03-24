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

      <p className="text-white text-3xl md:text-5xl font-light tracking-widest uppercase">
        en construction
      </p>
    </div>
  );
}

export default Future;

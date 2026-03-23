import { useState } from "react";

function Future() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Formes origami background */}
      <div className="absolute top-20 left-20 w-40 h-40 border border-indigo-500/20 rotate-12 skew-x-6" />
      <div className="absolute top-24 left-24 w-40 h-40 border border-purple-500/10 rotate-12 skew-x-6" />
      <div className="absolute bottom-20 right-20 w-56 h-56 border border-indigo-500/20 -rotate-6 skew-y-3" />
      <div className="absolute bottom-24 right-24 w-56 h-56 border border-purple-500/10 -rotate-6 skew-y-3" />
      <div className="absolute top-1/2 left-10 w-24 h-24 border border-indigo-400/10 rotate-45" />

      {/* Triangles origami SVG */}
      <svg
        className="absolute top-0 right-0 opacity-10"
        width="300"
        height="300"
        viewBox="0 0 300 300"
      >
        <polygon
          points="300,0 300,200 100,0"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1"
        />
        <polygon
          points="300,0 300,150 150,0"
          fill="none"
          stroke="#a855f7"
          strokeWidth="0.5"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 opacity-10"
        width="250"
        height="250"
        viewBox="0 0 250 250"
      >
        <polygon
          points="0,250 200,250 0,50"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1"
        />
        <polygon
          points="0,250 150,250 0,100"
          fill="none"
          stroke="#a855f7"
          strokeWidth="0.5"
        />
      </svg>

      {/* Card */}
      <div
        className="relative z-10 w-96"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        }}
      >
        {/* Bordure simulée */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-transparent"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
          }}
        />

        {/* Contenu inner */}
        <div
          className="relative m-px bg-[#080818] backdrop-blur-xl p-6"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 23px) 0, 100% 23px, 100% 100%, 23px 100%, 0 calc(100% - 23px))",
          }}
        >
          {/* Coin coupé décoratif */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-indigo-500 to-transparent rotate-45 origin-top-right" />
          </div>
          <div className="absolute bottom-0 left-0 w-12 h-12 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-px h-16 bg-gradient-to-t from-purple-500 to-transparent -rotate-45 origin-bottom-left" />
          </div>

          {/* Top badge */}
          <div className="flex justify-between items-center mb-6">
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 border border-indigo-500/30 px-3 py-1 bg-indigo-500/5"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)",
              }}
            >
              Portfolio 2025
            </span>
            <span className="w-2 h-2 bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)] animate-pulse" />
          </div>

          {/* Avatar + Nom */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-black text-white"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                JD
              </div>
              {/* Cadre décalé */}
              <div
                className="absolute -inset-1 border border-indigo-500/30"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-widest uppercase">
                Jean Dupont
              </h1>
              <p className="text-indigo-400 text-[10px] uppercase tracking-[0.2em] mt-1">
                ◈ Développeur React.js
              </p>
            </div>
          </div>

          {/* Ligne */}
          <div className="relative mb-6 h-px">
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-indigo-500 to-transparent" />
            <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-l from-purple-500 to-transparent" />
          </div>

          {/* Infos */}
          <div className="space-y-2 text-sm text-gray-400 mb-6">
            {[
              { icon: "✉", text: "jean.dupont@email.com" },
              { icon: "◎", text: "+33 6 12 34 56 78" },
              { icon: "⬡", text: "www.jeandupont.dev" },
              { icon: "◈", text: "Paris, France" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition cursor-default group"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                }}
              >
                <span className="text-indigo-500 text-xs">{item.icon}</span>
                <span className="text-gray-400 text-xs tracking-wide group-hover:text-gray-200 transition">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Ligne */}
          <div className="relative mb-5 h-px">
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>

          {/* Formulaire */}
          {sent ? (
            <div
              className="py-4 border border-green-500/20 bg-green-500/5 px-4"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
              }}
            >
              <p className="text-green-400 text-sm tracking-wide">
                ✓ Message transmis.
              </p>
              <p className="text-gray-600 text-xs mt-1">Réponse sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400">
                ▸ Me contacter
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/60 px-4 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none transition"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                }}
              />
              <button
                type="submit"
                className="relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 transition py-2.5 text-sm font-bold text-white cursor-pointer tracking-widest uppercase group"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <span className="relative z-10">Envoyer →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition" />
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="text-center text-gray-700 text-[10px] mt-5 tracking-[0.4em] uppercase">
            © 2025 — Jean Dupont
          </p>
        </div>
      </div>
    </div>
  );
}

export default Future;

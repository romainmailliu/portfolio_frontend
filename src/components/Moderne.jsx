import { useState } from "react";

function Moderne() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <div className="w-96 bg-gradient-to-br from-white via-gray-50 to-stone-100 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-xl font-bold text-white">
          JD
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-gray-900">
            Jean Dupont
          </h1>
          <p className="text-black-500 text-xs uppercase tracking-widest">
            Développeur React.js
          </p>
        </div>
      </div>

      {/* Ligne */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Infos */}
      <div className="space-y-2 text-sm text-gray-600 mb-6">
        <p>✉️ jean.dupont@email.com</p>
        <p>📱 +33 6 12 34 56 78</p>
        <p>🌐 www.jeandupont.dev</p>
        <p>📍 Paris, France</p>
      </div>

      {/* Ligne */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Formulaire */}
      {sent ? (
        <p className="text-green-500 text-sm text-center py-2">
          ✅ Reçu ! Je vous recontacte bientôt.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Je vous recontacte
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition"
          />
          <button
            type="submit"
            className="bg-black transition rounded-lg py-2 text-sm font-semibold text-white cursor-pointer"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default Moderne;

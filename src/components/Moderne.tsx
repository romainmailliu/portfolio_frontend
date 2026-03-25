import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Moderne() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      await emailjs.send(
        "service_xkwi2nk", // ton service_id
        "template_jve0sdl", // ton template_id
        { email, phone },
        "Y0Vh6DS8F21xy5zPw", // ta public_key
      );
      setSent(true);
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Erreur envoi :", error);
      alert("Erreur lors de l'envoi 😕");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhoto((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 bg-gradient-to-br from-white via-gray-50 to-stone-100 rounded-2xl p-6 shadow-2xl border-2 border-black">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-full overflow-hidden relative"
          style={{ perspective: "500px" }}
        >
          {/* Initiales */}
          <div
            className={`absolute inset-0 bg-black flex items-center justify-center text-xl font-bold text-white transition-all duration-500
      ${showPhoto ? "[transform:rotateY(90deg)]" : "[transform:rotateY(0deg)]"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            RM
          </div>

          {/* Photo */}
          <img
            src="/moi.png"
            alt="Photo de profil"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
      ${showPhoto ? "[transform:rotateY(0deg)]" : "[transform:rotateY(-90deg)]"}`}
            style={{ backfaceVisibility: "hidden" }}
          />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide text-gray-900">
            Romain Mailliu
          </h1>
          <p className="text-black-500 text-xs uppercase tracking-widest">
            Développeur Web
          </p>
        </div>
      </div>

      {/* Ligne */}
      <div className="border-t border-gray-200 mb-5"></div>

      {/* Infos */}
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>✉️ romain.mailliu@gmail.com</p>
        <p>📱 +33 6 08 04 83 19</p>
        <p>🌐 www.romainmailliu.com</p>
        <p>📍 Marseille, France</p>
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
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
          />
          {/* ✅ Champ téléphone non obligatoire */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06 00 00 00 00 (optionnel)"
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default Moderne;

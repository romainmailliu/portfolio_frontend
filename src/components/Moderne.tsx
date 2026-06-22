"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Moderne() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      await emailjs.send(
        "service_xkwi2nk",
        "template_z789237",
        { email, phone, message },
        "Y0Vh6DS8F21xy5zPw",
      );
      setSent(true);
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Erreur envoi :", error);
      alert("Erreur lors de l'envoi");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhoto((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky-card sticky-card--cream w-full shadow-cta p-5 md:p-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-btn overflow-hidden relative border border-forest shrink-0"
          style={{ perspective: "500px" }}
        >
          <div
            className={`absolute inset-0 bg-forest flex items-center justify-center text-lg font-bold text-cream transition-all duration-500
      ${showPhoto ? "[transform:rotateY(90deg)]" : "[transform:rotateY(0deg)]"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            RM
          </div>

          <img
            src="/moi.png"
            alt="Photo de profil"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
      ${showPhoto ? "[transform:rotateY(0deg)]" : "[transform:rotateY(-90deg)]"}`}
            style={{ backfaceVisibility: "hidden" }}
          />
        </div>

        <div>
          <h1 className="text-lg font-bold text-forest font-body leading-tight">
            Romain Mailliu
          </h1>
          <p className="font-mono-label text-micro uppercase tracking-widest text-forest/70">
            Développeur Web & IA
          </p>
        </div>
      </div>

      <div className="border-t border-pencil mb-3" />

      <p className="text-caption text-forest/80 mb-3">
        romain.mailliu@gmail.com · Marseille
      </p>

      <div className="border-t border-pencil mb-3" />

      {sent ? (
        <p className="text-caption text-center py-1 text-forest font-medium">
          Reçu — je vous recontacte bientôt.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="field-input py-2"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06 00 00 00 00 (optionnel)"
            className="field-input py-2"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre projet en quelques mots — ex. site pour une asso, automatisation Excel…"
            rows={2}
            aria-label="Votre projet en quelques mots"
            className="field-input resize-y py-2 min-h-[4.5rem]"
          />
          <button type="submit" className="btn-primary w-full mt-0.5">
            <span aria-hidden="true">→</span>
            Envoyer
          </button>
          <p className="reassurance-caption text-center !mt-1">
            réponse sous 48h, sans engagement.
          </p>
        </form>
      )}
    </div>
  );
}

export default Moderne;

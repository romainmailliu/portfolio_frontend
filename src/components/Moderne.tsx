"use client";

import { useState, useEffect } from "react";
import { submitContact } from "../lib/contact/actions";

function Moderne() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  /** Pot de miel : laissé vide par les humains, rempli par les bots. */
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || pending) return;

    setPending(true);
    setError(null);

    const result = await submitContact({ email, phone, message, website });

    setPending(false);

    if (!result.ok) {
      setError(result.formError);
      return;
    }

    setSent(true);
    setEmail("");
    setPhone("");
    setMessage("");
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
          <p className="text-lg font-bold text-forest font-body leading-tight">
            Romain Mailliu
          </p>
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
          Reçu, je vous recontacte bientôt.
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
            placeholder="Votre projet en quelques mots, ex. site pour une asso, automatisation Excel…"
            rows={2}
            aria-label="Votre projet en quelques mots"
            className="field-input resize-y py-2 min-h-[4.5rem]"
          />
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            className="btn-primary w-full mt-0.5"
            disabled={pending}
          >
            <span aria-hidden="true">→</span>
            {pending ? "Envoi…" : "Envoyer"}
          </button>
          {error && (
            <p role="alert" className="text-caption text-center text-terracotta">
              {error}
            </p>
          )}
          <p className="reassurance-caption text-center !mt-1">
            réponse rapide.
          </p>
        </form>
      )}
    </div>
  );
}

export default Moderne;

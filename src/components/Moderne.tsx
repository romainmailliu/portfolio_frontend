"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { submitContact } from "../lib/contact/actions";
import { looksLikeBot } from "../lib/contact/spam";

function Moderne() {
  /** Horodatage de l'affichage du formulaire, pour repérer les envois de bots. */
  const mountedAt = useRef<number | null>(null);
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

    const elapsedMs =
      mountedAt.current === null ? undefined : Date.now() - mountedAt.current;
    const result = await submitContact({
      email,
      phone,
      message,
      website,
      elapsedMs,
    });

    setPending(false);

    if (!result.ok) {
      setError(result.formError);
      posthog.capture("contact_form_error", {
        has_phone: Boolean(phone),
        has_message: Boolean(message),
      });
      return;
    }

    // L'action renvoie un succès silencieux aux bots : ne pas les compter.
    if (!looksLikeBot({ website, elapsedMs })) {
      posthog.capture("contact_form_submitted", {
        has_phone: Boolean(phone),
        has_message: Boolean(message),
      });
    }
    setSent(true);
    setEmail("");
    setPhone("");
    setMessage("");
  };

  useEffect(() => {
    mountedAt.current = Date.now();
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

          {/* La source fait 836×1024 : next/image sert une version à la taille affichée. */}
          <Image
            src="/moi.png"
            alt="Romain Mailliu, développeur web et consultant IA à Marseille"
            fill
            sizes="48px"
            className={`object-cover transition-all duration-500
      ${showPhoto ? "[transform:rotateY(0deg)]" : "[transform:rotateY(-90deg)]"}`}
            style={{ backfaceVisibility: "hidden" }}
          />
        </div>

        <div>
          <p className="text-lg font-bold text-forest font-body leading-tight">
            Romain Mailliu
          </p>
          <p className="font-mono-label text-micro uppercase tracking-widest text-forest/70">
            Développeur Web & Consultant IA
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
            aria-label="Votre email"
            required
            className="field-input py-2"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06 00 00 00 00 (optionnel)"
            aria-label="Votre téléphone (optionnel)"
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
          <p className="reassurance-caption text-center !mt-0">
            Vos coordonnées servent uniquement à vous répondre (
            <Link
              href="/politique-de-confidentialite"
              className="underline underline-offset-2"
            >
              confidentialité
            </Link>
            ).
          </p>
        </form>
      )}
    </div>
  );
}

export default Moderne;

"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function DashboardLoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Mot de passe incorrect");
        setPending(false);
        return;
      }
      window.location.href = from.startsWith("/admin") ? from : "/admin";
    } catch {
      setError("Erreur réseau — réessayez");
      setPending(false);
    }
  }

  return (
    <main className="page-container mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
      <div className="mb-6 text-center">
        <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-2">
          Accès réservé
        </p>
        <h1 className="admin-title text-forest">Dashboard</h1>
        <p className="mt-2 text-caption text-forest/80">
          Mot de passe défini sur le serveur.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="sticky-card sticky-card--cream p-6 space-y-4"
      >
        <label className="block">
          <span className="field-label">Mot de passe</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field-input mt-2 py-2"
          />
        </label>
        {error ? (
          <p className="admin-error-box" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending || !password}
          className="btn-primary w-full disabled:opacity-50"
        >
          {pending ? "Connexion…" : "Entrer"}
        </button>
      </form>
    </main>
  );
}

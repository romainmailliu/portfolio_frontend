"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-container mx-auto max-w-lg py-16 text-center">
      <h1 className="admin-title text-forest">
        Impossible de charger le dashboard
      </h1>
      <p className="mt-3 text-caption text-forest/80">{error.message}</p>
      <button type="button" onClick={() => reset()} className="btn-primary mt-6">
        Réessayer
      </button>
    </main>
  );
}

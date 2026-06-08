"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-neutral-900">
        Impossible de charger le dashboard
      </h1>
      <p className="mt-3 text-sm text-neutral-600">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Réessayer
      </button>
    </main>
  );
}

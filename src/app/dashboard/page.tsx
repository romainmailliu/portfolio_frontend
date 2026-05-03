import Link from "next/link";
import { SiteCard } from "../../components/dashboard/SiteCard";
import { loadDashboardRows } from "../../lib/analytics/load-dashboard";
import { createLogoutCsrfToken } from "../../lib/dashboard-session";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ logout_err?: string }>;
}) {
  const rows = await loadDashboardRows();
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  const logoutCsrf = secret ? await createLogoutCsrfToken(secret) : "";
  const q = searchParams ? await searchParams : {};
  const logoutWarn =
    q.logout_err === "csrf"
      ? "La déconnexion a échoué (session ou formulaire trop ancien). Réessayez."
      : q.logout_err === "form"
        ? "Requête de déconnexion invalide."
        : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          {logoutWarn ? (
            <p className="mt-3 max-w-xl rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              {logoutWarn}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50"
          >
            ← Site public
          </Link>
          <form action="/api/dashboard/logout" method="POST">
            <input type="hidden" name="csrf" value={logoutCsrf} />
            <button
              type="submit"
              className="rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <SiteCard key={row.site.id} {...row} />
        ))}
      </div>
    </main>
  );
}

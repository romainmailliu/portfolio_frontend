import Link from "next/link";
import { SiteCard } from "../../components/dashboard/SiteCard";
import { SitesComparisonTable } from "../../components/dashboard/SitesComparisonTable";
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
    <main className="page-container max-w-7xl py-10">
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono-label text-micro uppercase tracking-wider text-forest/70 mb-2">
            Analytics
          </p>
          <h1 className="admin-title text-forest">Dashboard</h1>
          {logoutWarn ? (
            <p className="admin-alert mt-3 max-w-xl" role="alert">
              {logoutWarn}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-outline">
            ← Site public
          </Link>
          <form action="/api/admin/logout" method="POST">
            <input type="hidden" name="csrf" value={logoutCsrf} />
            <button type="submit" className="btn-primary">
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <SitesComparisonTable rows={rows} />

      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <SiteCard key={row.site.id} {...row} />
        ))}
      </div>
    </main>
  );
}

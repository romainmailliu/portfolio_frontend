import { ExternalLink } from "lucide-react";
import { publicSiteHref } from "../../config/analytics-sites";
import type { SiteVisitorsRow } from "../../lib/analytics/load-dashboard";
import {
  formatCompactNumber,
  formatSignedPercent,
  getEvolution,
} from "../../lib/analytics/math";

type SitesTableProps = {
  rows: SiteVisitorsRow[];
};

function evolutionClass(delta: number): string {
  if (delta > 0) return "text-emerald-700";
  if (delta < 0) return "text-red-700";
  return "text-forest/60";
}

export function SitesTable({ rows }: SitesTableProps) {
  const sorted = [...rows].sort(
    (a, b) => b.currentVisitors - a.currentVisitors,
  );
  const totalCurrent = sorted.reduce((s, r) => s + r.currentVisitors, 0);
  const totalPrevious = sorted.reduce((s, r) => s + r.previousVisitors, 0);
  const totalEvolution = getEvolution(totalCurrent, totalPrevious);

  return (
    <section className="admin-table-wrap sticky-card sticky-card--cream !p-0">
      <div className="border-b border-pencil px-5 py-4">
        <h2 className="field-label !opacity-100">Visiteurs par site</h2>
        <p className="mt-1 text-caption text-forest/80">
          30 derniers jours (fenêtre glissante) vs les 30 jours précédents
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-left text-sm">
          <thead>
            <tr>
              <th scope="col" className="px-2 py-3 sm:px-5">
                Site
              </th>
              <th scope="col" className="px-2 py-3 text-right sm:px-4">
                Visiteurs
              </th>
              <th scope="col" className="px-2 py-3 text-right sm:px-5">
                Évolution
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const href = publicSiteHref(row.site.gscSiteUrl);
              const evolution = getEvolution(
                row.currentVisitors,
                row.previousVisitors,
              );
              return (
                <tr key={row.site.id}>
                  <td className="px-2 py-3.5 font-medium text-forest sm:px-5">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ouvrir le site ${row.site.name} (nouvel onglet)`}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        {row.site.name}
                        <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
                      </a>
                    ) : (
                      row.site.name
                    )}
                    {row.error ? (
                      <span
                        className="mt-0.5 block text-xs font-normal text-red-700"
                        title={row.error}
                      >
                        Données indisponibles
                      </span>
                    ) : null}
                  </td>
                  <td className="px-2 py-3.5 text-right tabular-nums font-semibold text-forest sm:px-4">
                    {row.error ? "—" : formatCompactNumber(row.currentVisitors)}
                  </td>
                  <td
                    className={`px-2 py-3.5 text-right tabular-nums sm:px-5 ${evolutionClass(evolution)}`}
                  >
                    {row.error ? "—" : formatSignedPercent(evolution)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-2 py-3.5 text-forest sm:px-5">Total</td>
              <td className="px-2 py-3.5 text-right tabular-nums text-forest sm:px-4">
                {formatCompactNumber(totalCurrent)}
              </td>
              <td
                className={`px-2 py-3.5 text-right tabular-nums sm:px-5 ${evolutionClass(totalEvolution)}`}
              >
                {formatSignedPercent(totalEvolution)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="border-t border-pencil px-5 py-2 text-[11px] text-pencil">
        Le total visiteurs n&apos;est pas une somme de personnes uniques entre
        sites.
      </p>
    </section>
  );
}

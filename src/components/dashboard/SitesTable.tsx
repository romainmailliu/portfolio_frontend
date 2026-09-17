import { ExternalLink } from "lucide-react";
import { publicSiteHref } from "../../config/analytics-sites";
import type { MonthlyDashboard } from "../../lib/analytics/load-monthly";
import {
  formatCompactNumber,
  formatSignedPercent,
  getEvolution,
} from "../../lib/analytics/math";

const SITE_CELL = "admin-sticky-col px-2 py-3.5 sm:px-5";
const MONTH_CELL = "px-2 py-3.5 text-right tabular-nums sm:px-4";

/** Évolution vs le mois précédent, arrondie ; rien si le mois précédent est vide. */
function MonthDelta({ current, previous }: { current: number; previous: number | null }) {
  if (previous === null || previous === 0) return null;
  const delta = Math.round(getEvolution(current, previous));
  const tone =
    delta > 0 ? "text-emerald-700" : delta < 0 ? "text-red-700" : "text-forest/50";
  return (
    <span className={`block text-[10px] font-normal leading-tight ${tone}`}>
      {formatSignedPercent(delta)}
    </span>
  );
}

export function SitesTable({ months, rows }: MonthlyDashboard) {
  const last = months.length - 1;
  const sorted = [...rows].sort(
    (a, b) => b.visitorsByMonth[last] - a.visitorsByMonth[last],
  );
  const totals = months.map((_, i) =>
    sorted.reduce((s, r) => s + r.visitorsByMonth[i], 0),
  );
  // Premier mois avec des données par site : avant, PostHog n'était pas
  // installé, donc « — » plutôt qu'un faux zéro (partout si jamais installé).
  const firstTracked = new Map(
    sorted.map((r) => [r.site.id, r.visitorsByMonth.findIndex((v) => v > 0)]),
  );
  // Le total d'un mois n'est comparable au précédent que si aucun site n'est
  // entré dans le suivi ce mois-là.
  const totalComparable = (i: number) =>
    i > 0 && ![...firstTracked.values()].includes(i);

  return (
    <section className="admin-table-wrap sticky-card sticky-card--cream !p-0">
      <div className="border-b border-pencil px-5 py-4">
        <h2 className="field-label !opacity-100">Visiteurs par mois</h2>
        <p className="mt-1 text-caption text-forest/80">
          Visiteurs uniques par mois civil · {months.length} derniers mois, mois
          en cours partiel
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-left text-sm">
          <thead>
            <tr>
              <th scope="col" className={`${SITE_CELL} py-3`}>
                Site
              </th>
              {months.map((m) => (
                <th
                  key={m.key}
                  scope="col"
                  className="whitespace-nowrap px-2 py-3 text-right sm:px-4"
                >
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const href = publicSiteHref(row.site.gscSiteUrl);
              const first = firstTracked.get(row.site.id) ?? -1;
              const untracked = (i: number) => first === -1 || i < first;
              return (
                <tr key={row.site.id}>
                  <td className={`${SITE_CELL} whitespace-nowrap font-medium text-forest`}>
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
                  {row.visitorsByMonth.map((visitors, i) => (
                    <td
                      key={months[i].key}
                      className={`${MONTH_CELL} ${
                        i === last ? "font-semibold text-forest" : "text-forest/80"
                      }`}
                    >
                      {row.error || untracked(i) ? (
                        "—"
                      ) : (
                        <>
                          {formatCompactNumber(visitors)}
                          <MonthDelta
                            current={visitors}
                            previous={
                              i > 0 && !untracked(i - 1)
                                ? row.visitorsByMonth[i - 1]
                                : null
                            }
                          />
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className={`${SITE_CELL} text-forest`}>Total</td>
              {totals.map((total, i) => (
                <td key={months[i].key} className={`${MONTH_CELL} text-forest`}>
                  {formatCompactNumber(total)}
                  <MonthDelta
                    current={total}
                    previous={totalComparable(i) ? totals[i - 1] : null}
                  />
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="border-t border-pencil px-5 py-2 text-[11px] text-pencil">
        Une même personne peut compter dans plusieurs mois. Le total n&apos;est
        pas une somme de personnes uniques entre sites.
      </p>
    </section>
  );
}

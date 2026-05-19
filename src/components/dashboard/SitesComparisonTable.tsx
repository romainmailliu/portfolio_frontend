import type { SiteMetricPayload } from "./SiteCard";
import {
  formatCompactNumber,
  formatPagesPerVisitorRatio,
  formatSignedPercent,
  getEvolution,
  getPagesPerVisitorEngagement,
  getPagesPerVisitorRatio,
} from "../../lib/analytics/math";
import { RatioEngagementIndicator } from "./RatioEngagementIndicator";

type SitesComparisonTableProps = {
  rows: SiteMetricPayload[];
};

function maxOf(rows: SiteMetricPayload[], pick: (r: SiteMetricPayload) => number) {
  let max = 0;
  for (const r of rows) {
    const v = pick(r);
    if (v > max) max = v;
  }
  return max;
}

export function SitesComparisonTable({ rows }: SitesComparisonTableProps) {
  const sorted = [...rows].sort(
    (a, b) => b.currentPageviews - a.currentPageviews,
  );

  const maxPv = maxOf(sorted, (r) => r.currentPageviews);
  const maxVis = maxOf(sorted, (r) => r.currentVisitors);

  const totalPv = sorted.reduce((s, r) => s + r.currentPageviews, 0);
  const totalVis = sorted.reduce((s, r) => s + r.currentVisitors, 0);
  const totalPrevPv = sorted.reduce((s, r) => s + r.previousPageviews, 0);
  const totalPrevVis = sorted.reduce((s, r) => s + r.previousVisitors, 0);

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Vue d&apos;ensemble
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Comparaison sur les <strong>30 derniers jours</strong> (fenêtre
          glissante) — trié par pages vues
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/80 text-xs font-medium uppercase tracking-wide text-neutral-500">
              <th scope="col" className="px-5 py-3">
                Site
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Pages vues
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Visiteurs
              </th>
              <th scope="col" className="hidden px-4 py-3 text-right sm:table-cell">
                Évol. pages
              </th>
              <th scope="col" className="hidden px-4 py-3 text-right sm:table-cell">
                Évol. visiteurs
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Pages / visiteur
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const evPv = getEvolution(
                row.currentPageviews,
                row.previousPageviews,
              );
              const evVis = getEvolution(
                row.currentVisitors,
                row.previousVisitors,
              );
              const ratio = getPagesPerVisitorRatio(
                row.currentPageviews,
                row.currentVisitors,
              );
              const ratioEngagement = getPagesPerVisitorEngagement(ratio);
              const isTopPv =
                row.currentPageviews > 0 &&
                row.currentPageviews === maxPv;
              const isTopVis =
                row.currentVisitors > 0 && row.currentVisitors === maxVis;

              return (
                <tr
                  key={row.site.id}
                  className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/60"
                >
                  <td className="px-5 py-3.5 font-medium text-neutral-900">
                    {row.site.name}
                    {row.error ? (
                      <span
                        className="mt-0.5 block text-xs font-normal text-red-600"
                        title={row.error}
                      >
                        Données partielles
                      </span>
                    ) : null}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-right tabular-nums font-semibold ${
                      isTopPv ? "bg-sky-50 text-sky-900" : "text-neutral-900"
                    }`}
                  >
                    {formatCompactNumber(row.currentPageviews)}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-right tabular-nums font-semibold ${
                      isTopVis ? "bg-sky-50 text-sky-900" : "text-neutral-900"
                    }`}
                  >
                    {formatCompactNumber(row.currentVisitors)}
                  </td>
                  <td
                    className={`hidden px-4 py-3.5 text-right tabular-nums sm:table-cell ${
                      evPv > 0
                        ? "text-emerald-600"
                        : evPv < 0
                          ? "text-red-600"
                          : "text-neutral-500"
                    }`}
                  >
                    {formatSignedPercent(evPv)}
                  </td>
                  <td
                    className={`hidden px-4 py-3.5 text-right tabular-nums sm:table-cell ${
                      evVis > 0
                        ? "text-emerald-600"
                        : evVis < 0
                          ? "text-red-600"
                          : "text-neutral-500"
                    }`}
                  >
                    {formatSignedPercent(evVis)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {ratioEngagement ? (
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`tabular-nums text-base font-semibold ${ratioEngagement.valueClass}`}
                        >
                          {formatPagesPerVisitorRatio(ratio)}
                        </span>
                        <RatioEngagementIndicator
                          engagement={ratioEngagement}
                          variant="compact"
                        />
                      </div>
                    ) : (
                      <span className="tabular-nums text-neutral-500">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-neutral-200 bg-neutral-50/90 font-semibold text-neutral-900">
              <td className="px-5 py-3.5">Total</td>
              <td className="px-4 py-3.5 text-right tabular-nums">
                {formatCompactNumber(totalPv)}
              </td>
              <td className="px-4 py-3.5 text-right tabular-nums">
                {formatCompactNumber(totalVis)}
              </td>
              <td className="hidden px-4 py-3.5 text-right tabular-nums sm:table-cell">
                {formatSignedPercent(getEvolution(totalPv, totalPrevPv))}
              </td>
              <td className="hidden px-4 py-3.5 text-right tabular-nums sm:table-cell">
                {formatSignedPercent(getEvolution(totalVis, totalPrevVis))}
              </td>
              <td className="px-5 py-3.5 text-right">
                {(() => {
                  const totalRatio = getPagesPerVisitorRatio(totalPv, totalVis);
                  const totalEngagement =
                    getPagesPerVisitorEngagement(totalRatio);
                  if (!totalEngagement) {
                    return <span className="tabular-nums text-neutral-500">—</span>;
                  }
                  return (
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`tabular-nums text-base font-semibold ${totalEngagement.valueClass}`}
                      >
                        {formatPagesPerVisitorRatio(totalRatio)}
                      </span>
                      <RatioEngagementIndicator
                        engagement={totalEngagement}
                        variant="compact"
                      />
                    </div>
                  );
                })()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="border-t border-neutral-100 px-5 py-2 text-[11px] text-neutral-400">
        Cellules bleues = meilleur score pages vues ou visiteurs. Ratio :{" "}
        <span className="text-red-700">faible</span> &lt; 1,3× ·{" "}
        <span className="text-amber-800">modéré</span> 1,3–2× ·{" "}
        <span className="text-emerald-800">bon</span> 2–3,5× ·{" "}
        <span className="text-sky-900">élevé</span> &gt; 3,5×. Le total
        visiteurs n&apos;est pas une somme de personnes uniques entre sites.
      </p>
    </section>
  );
}

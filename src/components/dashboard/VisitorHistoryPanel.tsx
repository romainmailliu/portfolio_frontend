import type { PosthogVisitorHistory } from "../../lib/analytics/posthog";
import { formatCompactNumber } from "../../lib/analytics/math";

type Props = {
  history: PosthogVisitorHistory;
  siteName: string;
};

const PLOT_HEIGHT_PX = 200;

export function VisitorHistoryPanel({ history, siteName }: Props) {
  const { totalUniqueVisitorsAllTime, monthlyActiveVisitors } = history;
  const maxVisitors = Math.max(
    ...monthlyActiveVisitors.map((m) => m.visitors),
    1,
  );

  return (
    <div className="mt-5 rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm">
      <div className="border-b border-neutral-100 pb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Historique visiteurs — {siteName}
        </h3>
        <p className="mt-2 text-2xl font-semibold tabular-nums text-neutral-900">
          {formatCompactNumber(totalUniqueVisitorsAllTime)}{" "}
          <span className="text-base font-normal text-neutral-600">
            visiteurs uniques depuis le début
          </span>
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Une personne ne compte qu’une fois sur tout l’historique (agrégation PostHog{" "}
          <code className="rounded bg-neutral-100 px-1">uniq(person_id)</code> sur{" "}
          <code className="rounded bg-neutral-100 px-1">$pageview</code>).
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Graphique par mois
        </p>
        <p className="mb-4 text-[11px] leading-snug text-neutral-400">
          Chaque barre = visiteurs <em>distincts</em> ayant eu au moins une page vue pendant{" "}
          <span className="text-neutral-500">ce mois calendaire</span> (UTC). La même
          personne peut être dans plusieurs mois : la somme des barres peut dépasser le
          total « depuis le début ».
        </p>

        {monthlyActiveVisitors.length === 0 ? (
          <p className="rounded-lg bg-neutral-50 py-8 text-center text-sm text-neutral-500">
            Pas encore assez de données pour un graphique mensuel.
          </p>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div
              className="flex min-w-max items-stretch gap-2 px-1"
              role="img"
              aria-label={`Histogramme mensuel des visiteurs pour ${siteName}`}
            >
              {monthlyActiveVisitors.map((bin) => {
                const rel = bin.visitors / maxVisitors;
                const barPct = bin.visitors > 0 ? Math.max(rel * 100, 6) : 0;
                return (
                  <div
                    key={bin.monthKey}
                    className="flex w-12 shrink-0 flex-col items-center gap-1.5 sm:w-14"
                  >
                    <span className="h-4 text-[11px] font-medium tabular-nums text-neutral-600">
                      {formatCompactNumber(bin.visitors)}
                    </span>
                    <div
                      className="relative w-full rounded-t-md bg-neutral-100"
                      style={{ height: PLOT_HEIGHT_PX }}
                      title={`${bin.label} : ${bin.visitors} visiteurs`}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-sky-700 to-sky-500 transition-opacity hover:opacity-90"
                        style={{ height: `${barPct}%` }}
                      />
                    </div>
                    <span className="max-w-[3.75rem] text-center text-[10px] leading-tight text-neutral-400">
                      {bin.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

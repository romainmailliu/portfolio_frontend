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
    <div className="sticky-card sticky-card--cream mt-5 px-5 py-5 !border-pencil">
      <div className="border-b border-pencil pb-4">
        <h3 className="field-label !opacity-100">
          Historique visiteurs — {siteName}
        </h3>
        <p className="mt-2 text-2xl font-semibold tabular-nums text-forest">
          {formatCompactNumber(totalUniqueVisitorsAllTime)}{" "}
          <span className="text-base font-normal text-forest/70">
            visiteurs uniques depuis le début
          </span>
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-forest/70">
          Une personne ne compte qu&apos;une fois sur tout l&apos;historique (agrégation PostHog{" "}
          <code className="rounded bg-whisper px-1 text-forest">uniq(person_id)</code> sur{" "}
          <code className="rounded bg-whisper px-1 text-forest">$pageview</code>).
        </p>
      </div>

      <div className="mt-5">
        <p className="field-label !opacity-100">Graphique par mois</p>
        <p className="mb-4 mt-1 text-[11px] leading-snug text-pencil">
          Chaque barre = visiteurs <em>distincts</em> ayant eu au moins une page vue pendant{" "}
          <span className="text-forest/80">ce mois calendaire</span> (UTC). La même
          personne peut être dans plusieurs mois : la somme des barres peut dépasser le
          total « depuis le début ».
        </p>

        {monthlyActiveVisitors.length === 0 ? (
          <p className="rounded-card border border-pencil bg-whisper py-8 text-center text-sm text-forest/70">
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
                    <span className="h-4 text-[11px] font-medium tabular-nums text-forest/80">
                      {formatCompactNumber(bin.visitors)}
                    </span>
                    <div
                      className="admin-chart-track relative w-full rounded-t-md"
                      style={{ height: PLOT_HEIGHT_PX }}
                      title={`${bin.label} : ${bin.visitors} visiteurs`}
                    >
                      <div
                        className="admin-chart-bar absolute bottom-0 left-0 right-0 rounded-t-md transition-opacity hover:opacity-90"
                        style={{ height: `${barPct}%` }}
                      />
                    </div>
                    <span className="max-w-[3.75rem] text-center text-[10px] leading-tight text-pencil">
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

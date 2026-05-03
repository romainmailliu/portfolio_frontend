import { ExternalLink } from "lucide-react";
import { type AnalyticsSite, publicSiteHref } from "../../config/analytics-sites";
import type { PosthogVisitorHistory } from "../../lib/analytics/posthog";
import { KPIBox } from "./KPIBox";
import { VisitorHistoryPanel } from "./VisitorHistoryPanel";
import { formatCompactNumber, getEvolution } from "../../lib/analytics/math";

export type SiteMetricPayload = {
  site: AnalyticsSite;
  currentPageviews: number;
  previousPageviews: number;
  currentVisitors: number;
  previousVisitors: number;
  seoClicks: number;
  visitorHistory: PosthogVisitorHistory | null;
  error?: string | null;
};

export function SiteCard({
  site,
  currentPageviews,
  previousPageviews,
  currentVisitors,
  previousVisitors,
  seoClicks,
  visitorHistory,
  error,
}: SiteMetricPayload) {
  const evolutionPv = getEvolution(currentPageviews, previousPageviews);
  const evolutionVisitors = getEvolution(currentVisitors, previousVisitors);
  const siteHref = publicSiteHref(site.gscSiteUrl);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-neutral-900">{site.name}</h2>
        {siteHref ? (
          <a
            href={siteHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ouvrir le site ${site.name} (nouvel onglet)`}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200/90 bg-white/90 px-2 py-1 text-xs font-medium text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-800"
          >
            Site
            <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
          </a>
        ) : null}
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KPIBox
          title="Pages vues"
          subtitle="30 j · fenêtre glissante"
          source="PostHog · total des événements $pageview (chaque chargement ou navigation comptée)"
          value={formatCompactNumber(currentPageviews)}
          deltaPercent={evolutionPv}
        />
        <KPIBox
          title="Visiteurs uniques"
          subtitle="30 j · même fenêtre"
          source="PostHog · personnes distinctes (person_id) ayant au moins une page vue"
          value={formatCompactNumber(currentVisitors)}
          deltaPercent={evolutionVisitors}
        />
        <KPIBox
          title="Ratio pages / visiteur"
          subtitle="sur 30 j"
          source="Pages vues ÷ visiteurs — engagement moyen"
          value={
            currentVisitors > 0
              ? `${(currentPageviews / currentVisitors).toFixed(1)}×`
              : "—"
          }
          deltaPercent={null}
        />
        <KPIBox
          title="Clics SEO"
          subtitle="30 j · fenêtre glissante"
          source="Google Search Console · agrégat sur la même période"
          value={formatCompactNumber(seoClicks)}
          deltaPercent={null}
        />
      </div>

      {visitorHistory ? (
        <VisitorHistoryPanel history={visitorHistory} siteName={site.name} />
      ) : null}
    </section>
  );
}

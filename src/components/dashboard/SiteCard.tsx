import { ExternalLink } from "lucide-react";
import { type AnalyticsSite, publicSiteHref } from "../../config/analytics-sites";
import type { PosthogVisitorHistory } from "../../lib/analytics/posthog";
import { KPIBox } from "./KPIBox";
import { VisitorHistoryPanel } from "./VisitorHistoryPanel";
import {
  formatCompactNumber,
  formatPagesPerVisitorRatio,
  getEvolution,
  getPagesPerVisitorEngagement,
  getPagesPerVisitorRatio,
} from "../../lib/analytics/math";
import { RatioEngagementIndicator } from "./RatioEngagementIndicator";

export type SiteMetricPayload = {
  site: AnalyticsSite;
  currentPageviews: number;
  previousPageviews: number;
  currentVisitors: number;
  previousVisitors: number;
  currentGoogleVisitors: number;
  previousGoogleVisitors: number;
  visitorHistory: PosthogVisitorHistory | null;
  error?: string | null;
};

const CARD_SURFACES = [
  "sticky-card--cream",
  "sticky-card--mint",
  "sticky-card--teal",
  "sticky-card--blush",
] as const;

export function SiteCard({
  site,
  currentPageviews,
  previousPageviews,
  currentVisitors,
  previousVisitors,
  currentGoogleVisitors,
  previousGoogleVisitors,
  visitorHistory,
  error,
}: SiteMetricPayload) {
  const evolutionPv = getEvolution(currentPageviews, previousPageviews);
  const evolutionVisitors = getEvolution(currentVisitors, previousVisitors);
  const evolutionGoogle = getEvolution(
    currentGoogleVisitors,
    previousGoogleVisitors,
  );
  const ratio = getPagesPerVisitorRatio(currentPageviews, currentVisitors);
  const ratioEngagement = getPagesPerVisitorEngagement(ratio);
  const siteHref = publicSiteHref(site.gscSiteUrl);
  const surfaceIndex =
    site.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    CARD_SURFACES.length;
  const surface = CARD_SURFACES[surfaceIndex];

  return (
    <section className={`sticky-card ${surface} p-5`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-forest">{site.name}</h2>
        {siteHref ? (
          <a
            href={siteHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ouvrir le site ${site.name} (nouvel onglet)`}
            className="case-study-tag"
          >
            Site
            <ExternalLink className="h-3 w-3 opacity-80" aria-hidden />
          </a>
        ) : null}
      </div>

      {error ? <p className="admin-error-box mb-4">{error}</p> : null}

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
          value={formatPagesPerVisitorRatio(ratio)}
          valueClassName={ratioEngagement?.valueClass}
          footer={
            ratioEngagement ? (
              <RatioEngagementIndicator engagement={ratioEngagement} />
            ) : null
          }
          deltaPercent={null}
        />
        <KPIBox
          title="Visiteurs Google"
          subtitle="30 j · referrer Google"
          source="PostHog · visiteurs uniques avec $referring_domain ou $referrer Google (trafic organique approximatif, une fois sur le site)"
          value={formatCompactNumber(currentGoogleVisitors)}
          deltaPercent={evolutionGoogle}
        />
      </div>

      {visitorHistory ? (
        <VisitorHistoryPanel history={visitorHistory} siteName={site.name} />
      ) : null}
    </section>
  );
}

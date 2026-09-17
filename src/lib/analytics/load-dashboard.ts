import type { SiteVisitorsRow } from "../../components/dashboard/SitesTable";
import { ANALYTICS_SITES } from "../../config/analytics-sites";
import { getPosthogTrafficMetrics } from "./posthog";

export type SiteMetricPayload = SiteVisitorsRow;

const emptyPayload = (
  site: (typeof ANALYTICS_SITES)[number],
  error: string,
): SiteMetricPayload => ({
  site,
  currentVisitors: 0,
  previousVisitors: 0,
  error,
});

export async function loadDashboardRows(): Promise<SiteMetricPayload[]> {
  return Promise.all(
    ANALYTICS_SITES.map(async (site) => {
      if (!site.posthogProjectId.trim()) {
        let missingId: string;
        if (site.id === "amidou") {
          missingId =
            "Renseignez POSTHOG_PROJECT_ID_AMIDOU (Project settings → Project ID).";
        } else if (site.id === "ats-seduction") {
          missingId =
            "Renseignez POSTHOG_PROJECT_ID_ATS_SEDUCTION (repli possible : POSTHOG_PROJECT_ID_ATS).";
        } else {
          missingId = `Renseignez l’identifiant projet PostHog pour « ${site.name} ».`;
        }
        return emptyPayload(site, missingId);
      }

      try {
        const metrics = await getPosthogTrafficMetrics(site.id);
        return {
          site,
          currentVisitors: metrics.currentVisitors,
          previousVisitors: metrics.previousVisitors,
          error: null,
        };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "PostHog métriques : erreur";
        return emptyPayload(site, message);
      }
    }),
  );
}

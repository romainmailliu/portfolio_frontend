import { ANALYTICS_SITES, type AnalyticsSite } from "../../config/analytics-sites";
import { getPosthogTrafficMetrics } from "./posthog";

export type SiteVisitorsRow = {
  site: AnalyticsSite;
  /** Personnes distinctes ayant vu au moins une page sur la fenêtre demandée (30 j par défaut). */
  currentVisitors: number;
  /** Même mesure sur la fenêtre précédente de même durée. */
  previousVisitors: number;
  error: string | null;
};

const emptyPayload = (site: AnalyticsSite, error: string): SiteVisitorsRow => ({
  site,
  currentVisitors: 0,
  previousVisitors: 0,
  error,
});

/** Une ligne par site suivi sur une fenêtre glissante — 7 et 30 j dans l'email hebdo. */
export async function loadDashboardRows(
  windowDays = 30,
): Promise<SiteVisitorsRow[]> {
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
        const metrics = await getPosthogTrafficMetrics(site.id, windowDays);
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

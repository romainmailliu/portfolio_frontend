import type { SiteMetricPayload } from "../../components/dashboard/SiteCard";
import { ANALYTICS_SITES } from "../../config/analytics-sites";
import {
  getPosthogTrafficMetrics,
  getPosthogVisitorHistory,
} from "./posthog";

const emptyPayload = (
  site: (typeof ANALYTICS_SITES)[number],
  error: string,
): SiteMetricPayload => ({
  site,
  currentPageviews: 0,
  previousPageviews: 0,
  currentVisitors: 0,
  previousVisitors: 0,
  currentGoogleVisitors: 0,
  previousGoogleVisitors: 0,
  visitorHistory: null,
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

      let currentPageviews = 0;
      let previousPageviews = 0;
      let currentVisitors = 0;
      let previousVisitors = 0;
      let currentGoogleVisitors = 0;
      let previousGoogleVisitors = 0;
      let visitorHistory: SiteMetricPayload["visitorHistory"] = null;
      const errs: string[] = [];

      const [rMetrics, rHistory] = await Promise.allSettled([
        getPosthogTrafficMetrics(site.id),
        getPosthogVisitorHistory(site.id),
      ]);

      if (rMetrics.status === "fulfilled") {
        currentPageviews = rMetrics.value.currentPageviews;
        previousPageviews = rMetrics.value.previousPageviews;
        currentVisitors = rMetrics.value.currentVisitors;
        previousVisitors = rMetrics.value.previousVisitors;
        currentGoogleVisitors = rMetrics.value.currentGoogleVisitors;
        previousGoogleVisitors = rMetrics.value.previousGoogleVisitors;
      } else {
        const msg =
          rMetrics.reason instanceof Error
            ? rMetrics.reason.message
            : "PostHog métriques : erreur";
        errs.push(msg);
      }

      if (rHistory.status === "fulfilled") {
        visitorHistory = rHistory.value;
      } else {
        const msg =
          rHistory.reason instanceof Error
            ? rHistory.reason.message
            : "PostHog historique visiteurs : erreur";
        errs.push(msg);
      }

      return {
        site,
        currentPageviews,
        previousPageviews,
        currentVisitors,
        previousVisitors,
        currentGoogleVisitors,
        previousGoogleVisitors,
        visitorHistory,
        error: errs.length ? errs.join(" · ") : null,
      };
    }),
  );
}

import type { SiteMetricPayload } from "../../components/dashboard/SiteCard";
import { ANALYTICS_SITES } from "../../config/analytics-sites";
import { getGSCClicks } from "./gsc";
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
  seoClicks: 0,
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
      let seoClicks = 0;
      let visitorHistory: SiteMetricPayload["visitorHistory"] = null;
      const errs: string[] = [];

      const [rMetrics, rHistory, rSeo] = await Promise.allSettled([
        getPosthogTrafficMetrics(site.id),
        getPosthogVisitorHistory(site.id),
        getGSCClicks(site.gscSiteUrl),
      ]);

      if (rMetrics.status === "fulfilled") {
        currentPageviews = rMetrics.value.currentPageviews;
        previousPageviews = rMetrics.value.previousPageviews;
        currentVisitors = rMetrics.value.currentVisitors;
        previousVisitors = rMetrics.value.previousVisitors;
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

      if (rSeo.status === "fulfilled") {
        seoClicks = rSeo.value;
      } else {
        const msg =
          rSeo.reason instanceof Error
            ? rSeo.reason.message
            : "Search Console : erreur";
        errs.push(msg);
      }

      return {
        site,
        currentPageviews,
        previousPageviews,
        currentVisitors,
        previousVisitors,
        seoClicks,
        visitorHistory,
        error: errs.length ? errs.join(" · ") : null,
      };
    }),
  );
}

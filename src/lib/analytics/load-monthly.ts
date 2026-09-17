import { ANALYTICS_SITES, type AnalyticsSite } from "../../config/analytics-sites";
import { type CalendarMonth, lastCalendarMonths } from "./months";
import { getPosthogMonthlyVisitors } from "./posthog";

export type SiteMonthlyRow = {
  site: AnalyticsSite;
  /** Visiteurs uniques par mois, aligné sur `months` (0 si aucun événement). */
  visitorsByMonth: number[];
  error: string | null;
};

export type MonthlyDashboard = {
  months: CalendarMonth[];
  rows: SiteMonthlyRow[];
};

const MONTHS_SHOWN = 6;

/** Une ligne par site suivi, six mois civils dont le mois en cours. */
export async function loadMonthlyRows(now = new Date()): Promise<MonthlyDashboard> {
  const months = lastCalendarMonths(now, MONTHS_SHOWN);
  const empty = (site: AnalyticsSite, error: string): SiteMonthlyRow => ({
    site,
    visitorsByMonth: months.map(() => 0),
    error,
  });

  const rows = await Promise.all(
    ANALYTICS_SITES.map(async (site) => {
      if (!site.posthogProjectId.trim()) {
        return empty(
          site,
          `Renseignez POSTHOG_PROJECT_ID_${site.posthogCredentialSuffix ?? "<SUFFIX>"} (Project settings → Project ID).`,
        );
      }
      try {
        const byMonth = await getPosthogMonthlyVisitors(site.id, MONTHS_SHOWN);
        return {
          site,
          visitorsByMonth: months.map((m) => byMonth.get(m.key) ?? 0),
          error: null,
        };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "PostHog visiteurs mensuels : erreur";
        return empty(site, message);
      }
    }),
  );

  return { months, rows };
}

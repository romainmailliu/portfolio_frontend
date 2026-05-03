import type { AnalyticsSite } from "../../config/analytics-sites";
import { getSiteById } from "../../config/analytics-sites";

const DEFAULT_POSTHOG_HOST = "https://us.posthog.com";

function normalizeHost(raw: string): string {
  return raw.replace(/\/$/, "");
}

/** Clé + host API pour HogQL selon le site (compte global ou suffixe dédié). */
function resolvePosthogCredentials(site: AnalyticsSite): {
  apiKey: string;
  host: string;
} {
  const suffix = site.posthogCredentialSuffix?.trim();

  if (suffix) {
    const keyVar = `POSTHOG_API_KEY_${suffix}` as const;
    const hostVar = `POSTHOG_HOST_${suffix}` as const;
    let apiKey = process.env[keyVar]?.trim() ?? "";
    const separateAccountNoLegacyFallback = suffix === "AMIDOU";
    if (!apiKey && !separateAccountNoLegacyFallback) {
      apiKey = process.env.POSTHOG_API_KEY?.trim() ?? "";
    }
    if (!apiKey) {
      throw new Error(
        separateAccountNoLegacyFallback
          ? `${keyVar} manquant (${site.name}, compte PostHog dédié).`
          : `${keyVar} ou POSTHOG_API_KEY manquant (${site.name}).`,
      );
    }
    const rawHost =
      process.env[hostVar]?.trim() ||
      process.env.POSTHOG_HOST ||
      DEFAULT_POSTHOG_HOST;
    return { apiKey, host: normalizeHost(rawHost) };
  }

  const apiKey = process.env.POSTHOG_API_KEY?.trim() ?? "";
  if (!apiKey)
    throw new Error(
      "POSTHOG_API_KEY manquant (ex. carte Portfolio sans suffixe)",
    );
  const rawHost = process.env.POSTHOG_HOST || DEFAULT_POSTHOG_HOST;
  return { apiKey, host: normalizeHost(rawHost) };
}

async function runHogQLJson(
  projectId: string,
  hogql: string,
  credentials: { apiKey: string; host: string },
  queryName: string,
): Promise<unknown> {
  const { apiKey, host } = credentials;

  const res = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query: hogql },
      name: queryName,
    }),
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PostHog ${res.status}: ${body.slice(0, 180)}`);
  }

  return res.json();
}

function extractScalar(payload: unknown): number {
  if (!payload || typeof payload !== "object") return 0;
  const results = (payload as { results?: unknown }).results;
  if (!Array.isArray(results) || results.length === 0) return 0;
  const row = results[0];
  if (typeof row === "number") return Math.round(row);
  if (Array.isArray(row) && typeof row[0] === "number") return Math.round(row[0]);
  if (row && typeof row === "object") {
    for (const v of Object.values(row)) {
      if (typeof v === "number") return Math.round(v);
    }
  }
  return 0;
}

async function runHogQLScalar(
  projectId: string,
  hogql: string,
  credentials: { apiKey: string; host: string },
  queryName: string,
): Promise<number> {
  const json = await runHogQLJson(projectId, hogql, credentials, queryName);
  return extractScalar(json);
}

function parseMonth(raw: unknown): { monthKey: string; label: string } | null {
  if (raw == null) return null;
  let d: Date;
  if (raw instanceof Date) d = raw;
  else if (typeof raw === "string") {
    d = new Date(raw);
  } else if (typeof raw === "number") {
    d = new Date(raw);
  } else return null;
  if (Number.isNaN(d.getTime())) return null;
  const monthKey = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  const label = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
  return { monthKey, label };
}

function extractMonthlyVisitors(payload: unknown): MonthlyVisitorBin[] {
  if (!payload || typeof payload !== "object") return [];
  const results = (payload as { results?: unknown }).results;
  if (!Array.isArray(results)) return [];

  const bins: MonthlyVisitorBin[] = [];

  for (const row of results) {
    let rawMonth: unknown;
    let visitors = 0;

    if (Array.isArray(row)) {
      rawMonth = row[0];
      visitors = Math.round(Number(row[1]));
    } else if (row && typeof row === "object") {
      const o = row as Record<string, unknown>;
      rawMonth = o.month_start ?? o.monthStart;
      visitors = Math.round(
        Number(o.visitors ?? o.c ?? o.unique_visitors ?? 0),
      );
    }

    if (!Number.isFinite(visitors) || visitors < 0) visitors = 0;
    const parsed = parseMonth(rawMonth);
    if (!parsed) continue;
    bins.push({
      monthKey: parsed.monthKey,
      label: parsed.label,
      visitors,
    });
  }

  bins.sort((a, b) => a.monthKey.localeCompare(b.monthKey));
  return bins;
}

export type MonthlyVisitorBin = {
  monthKey: string;
  label: string;
  visitors: number;
};

/** Total `uniq(person_id)` sur tout l’historique + série mensuelle de personnes actives. */
export type PosthogVisitorHistory = {
  totalUniqueVisitorsAllTime: number;
  monthlyActiveVisitors: MonthlyVisitorBin[];
};

export type PosthogTrafficMetrics = {
  currentPageviews: number;
  previousPageviews: number;
  currentVisitors: number;
  previousVisitors: number;
};

/**
 * Fenêtres glissantes 30 j vs 30 j précédents — pages vues et visiteurs uniques PostHog.
 */
export async function getPosthogTrafficMetrics(
  siteId: string,
): Promise<PosthogTrafficMetrics> {
  const site = getSiteById(siteId);
  if (!site?.posthogProjectId) {
    throw new Error(`Site inconnu ou POSTHOG_PROJECT_ID_* non défini (${siteId})`);
  }

  const credentials = resolvePosthogCredentials(site);

  const extra = site.posthogExtraFilter?.trim()
    ? ` ${site.posthogExtraFilter}`
    : "";

  const pageCurrent = `
    SELECT count() AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND timestamp < now()
      ${extra}
  `.trim();

  const pagePrevious = `
    SELECT count() AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 60 DAY
      AND timestamp < now() - INTERVAL 30 DAY
      ${extra}
  `.trim();

  const visitorCurrent = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND timestamp < now()
      ${extra}
  `.trim();

  const visitorPrevious = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 60 DAY
      AND timestamp < now() - INTERVAL 30 DAY
      ${extra}
  `.trim();

  const pid = site.posthogProjectId;

  const [
    currentPageviews,
    previousPageviews,
    currentVisitors,
    previousVisitors,
  ] = await Promise.all([
    runHogQLScalar(pid, pageCurrent, credentials, "dash_pv_current"),
    runHogQLScalar(pid, pagePrevious, credentials, "dash_pv_previous"),
    runHogQLScalar(pid, visitorCurrent, credentials, "dash_vis_current"),
    runHogQLScalar(pid, visitorPrevious, credentials, "dash_vis_previous"),
  ]);

  return {
    currentPageviews,
    previousPageviews,
    currentVisitors,
    previousVisitors,
  };
}

/**
 * Visiteurs uniques depuis la première donnée + histogramme mensuel
 * (`uniq(person_id)` par mois calendaire UTC sur `$pageview`).
 */
export async function getPosthogVisitorHistory(
  siteId: string,
): Promise<PosthogVisitorHistory> {
  const site = getSiteById(siteId);
  if (!site?.posthogProjectId) {
    throw new Error(`Site inconnu ou POSTHOG_PROJECT_ID_* non défini (${siteId})`);
  }

  const credentials = resolvePosthogCredentials(site);
  const extra = site.posthogExtraFilter?.trim()
    ? ` ${site.posthogExtraFilter}`
    : "";

  const totalSql = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      ${extra}
  `.trim();

  const monthlySql = `
    SELECT
      toStartOfMonth(timestamp) AS month_start,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      ${extra}
    GROUP BY month_start
    ORDER BY month_start ASC
  `.trim();

  const pid = site.posthogProjectId;

  const [totalJson, monthlyJson] = await Promise.all([
    runHogQLJson(pid, totalSql, credentials, "dash_vis_total_alltime"),
    runHogQLJson(pid, monthlySql, credentials, "dash_vis_monthly"),
  ]);

  return {
    totalUniqueVisitorsAllTime: extractScalar(totalJson),
    monthlyActiveVisitors: extractMonthlyVisitors(monthlyJson),
  };
}

import type { AnalyticsSite } from "../../config/analytics-sites";
import { getSiteById } from "../../config/analytics-sites";

const DEFAULT_POSTHOG_HOST = "https://eu.posthog.com";

function normalizeHost(raw: string): string {
  return raw.replace(/\/$/, "");
}

/** HogQL `/query` exige une clé personnelle (phx_), pas la clé projet client (phc_). */
function assertPersonalApiKey(apiKey: string, varName: string): void {
  if (apiKey.startsWith("phc_")) {
    throw new Error(
      `${varName} : clé projet (phc_) détectée. Créez une clé personnelle (phx_) dans PostHog → Settings → Personal API keys, scope « query:read ».`,
    );
  }
}

/** Clé + host API pour HogQL selon le site (clé globale ou clé dédiée par suffixe). */
function resolvePosthogCredentials(site: AnalyticsSite): {
  apiKey: string;
  host: string;
} {
  const suffix = site.posthogCredentialSuffix?.trim();
  const keyVar = suffix ? `POSTHOG_API_KEY_${suffix}` : "POSTHOG_API_KEY";

  let apiKey = process.env[keyVar]?.trim() ?? "";
  let usedVar = keyVar;

  // Une clé personnelle unique couvre toutes les organisations du compte ;
  // seuls les sites hébergés sur un autre compte PostHog exigent leur propre clé.
  if (!apiKey && suffix && !site.dedicatedKeyOnly) {
    apiKey = process.env.POSTHOG_API_KEY?.trim() ?? "";
    usedVar = "POSTHOG_API_KEY";
  }

  if (!apiKey) {
    throw new Error(
      site.dedicatedKeyOnly
        ? `${keyVar} manquant (${site.name}, compte PostHog dédié).`
        : `${keyVar} ou POSTHOG_API_KEY manquant (${site.name}).`,
    );
  }
  assertPersonalApiKey(apiKey, usedVar);

  const rawHost =
    (suffix ? process.env[`POSTHOG_HOST_${suffix}`]?.trim() : "") ||
    process.env.POSTHOG_HOST?.trim() ||
    DEFAULT_POSTHOG_HOST;

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
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    let hint = "";
    if (
      res.status === 403 &&
      body.includes("authentication_failed") &&
      body.includes("invalid")
    ) {
      hint =
        " Vérifiez : clé personnelle phx_ (scope query:read), POSTHOG_HOST = région du compte (eu.posthog.com vs us.posthog.com), clé du même compte que le project ID.";
    }
    throw new Error(`PostHog ${res.status}: ${body.slice(0, 180)}${hint}`);
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

export type PosthogTrafficMetrics = {
  currentVisitors: number;
  previousVisitors: number;
};

/**
 * Visiteurs uniques PostHog (`uniq(person_id)` sur `$pageview`),
 * fenêtre glissante de `windowDays` jours vs la fenêtre précédente de même durée.
 */
export async function getPosthogTrafficMetrics(
  siteId: string,
  windowDays = 30,
): Promise<PosthogTrafficMetrics> {
  const site = getSiteById(siteId);
  if (!site?.posthogProjectId) {
    throw new Error(`Site inconnu ou POSTHOG_PROJECT_ID_* non défini (${siteId})`);
  }

  const credentials = resolvePosthogCredentials(site);

  const extra = site.posthogExtraFilter?.trim()
    ? ` ${site.posthogExtraFilter}`
    : "";

  const visitorCurrent = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL ${windowDays} DAY
      AND timestamp < now()
      ${extra}
  `.trim();

  const visitorPrevious = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL ${windowDays * 2} DAY
      AND timestamp < now() - INTERVAL ${windowDays} DAY
      ${extra}
  `.trim();

  const pid = site.posthogProjectId;

  const [currentVisitors, previousVisitors] = await Promise.all([
    runHogQLScalar(pid, visitorCurrent, credentials, `dash_vis_current_${windowDays}d`),
    runHogQLScalar(pid, visitorPrevious, credentials, `dash_vis_previous_${windowDays}d`),
  ]);

  return { currentVisitors, previousVisitors };
}

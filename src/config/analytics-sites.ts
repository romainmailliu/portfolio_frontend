export type AnalyticsSite = {
  /** Passed to getPosthogTrafficMetrics(siteId) */
  id: string;
  /** Display name */
  name: string;
  /** PostHog project numeric id (Project settings → Project ID) */
  posthogProjectId: string;
  /** Extra HogQL predicates, e.g. `AND ilike(toString(properties.$host), '%mysite.com%')` */
  posthogExtraFilter?: string;
  /** Search Console property: https://www.example.com/ ou sc-domain:example.com */
  gscSiteUrl: string;
  /**
   * Identifiants dédiés : `POSTHOG_API_KEY_<SUFFIX>` et `POSTHOG_HOST_<SUFFIX>`.
   * Host : repli sur `POSTHOG_HOST`. Clé Amidou (`AMIDOU`) sans repli ; ATS (`ATS_SEDUCTION`) repli `POSTHOG_API_KEY` (héritage).
   */
  posthogCredentialSuffix?: string;
};

/**
 * ATS Seduction — même schéma qu’Amidou : `POSTHOG_PROJECT_ID_ATS_SEDUCTION` (+ clé `*_ATS_SEDUCTION`).
 * Repli legacy : `POSTHOG_PROJECT_ID_ATS`.
 */
const atsSeduction: AnalyticsSite = {
  id: "ats-seduction",
  name: "ATS Seduction",
  posthogProjectId:
    process.env.POSTHOG_PROJECT_ID_ATS_SEDUCTION?.trim() ||
    process.env.POSTHOG_PROJECT_ID_ATS?.trim() ||
    "",
  gscSiteUrl:
    process.env.GSC_SITE_URL_ATS_SEDUCTION?.trim() ||
    process.env.GSC_SITE_URL_ATS?.trim() ||
    "https://ats-seduction.vercel.app/",
  posthogCredentialSuffix: "ATS_SEDUCTION",
};

/** Amidou — clé / ID dédiés (suffixe AMIDOU). https://www.amidou.eu/ */
const amidou: AnalyticsSite = {
  id: "amidou",
  name: "Amidou",
  posthogProjectId: process.env.POSTHOG_PROJECT_ID_AMIDOU ?? "",
  gscSiteUrl:
    process.env.GSC_SITE_URL_AMIDOU ?? "https://www.amidou.eu/",
  posthogCredentialSuffix: "AMIDOU",
};

const portfolio: AnalyticsSite | null = process.env.POSTHOG_PROJECT_ID_PORTFOLIO
  ? {
      id: "portfolio",
      name: "romainmailliu.com",
      posthogProjectId: process.env.POSTHOG_PROJECT_ID_PORTFOLIO,
      gscSiteUrl:
        process.env.GSC_SITE_URL_PORTFOLIO ??
        "https://www.romainmailliu.com/",
    }
  : null;

/**
 * Sites sur /dashboard (une carte par ligne). Ordre d’affichage.
 */
export const ANALYTICS_SITES: AnalyticsSite[] = [
  atsSeduction,
  amidou,
  ...(portfolio ? [portfolio] : []),
];

export function getSiteById(siteId: string): AnalyticsSite | undefined {
  return ANALYTICS_SITES.find((s) => s.id === siteId);
}

/** URL publique pour un lien « voir le site », dérivée de la propriété GSC. */
export function publicSiteHref(gscSiteUrl: string): string | null {
  const u = gscSiteUrl.trim();
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("sc-domain:")) {
    const host = u.slice("sc-domain:".length).trim();
    return host ? `https://${host}` : null;
  }
  return null;
}

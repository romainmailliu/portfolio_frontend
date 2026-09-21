export type AnalyticsSite = {
  /** Passed to getPosthogTrafficMetrics(siteId) */
  id: string;
  /** Display name */
  name: string;
  /** PostHog project numeric id (Project settings → Project ID) */
  posthogProjectId: string;
  /** Extra HogQL predicates, e.g. `AND ilike(toString(properties.$host), '%mysite.com%')` */
  posthogExtraFilter?: string;
  /** URL publique du site (lien « Site ») : https://www.example.com/ ou sc-domain:example.com */
  gscSiteUrl: string;
  /**
   * Identifiants dédiés : `POSTHOG_API_KEY_<SUFFIX>` et `POSTHOG_HOST_<SUFFIX>`.
   * Repli sur `POSTHOG_API_KEY` / `POSTHOG_HOST` sauf si `dedicatedKeyOnly`.
   */
  posthogCredentialSuffix?: string;
  /** Compte PostHog distinct : `POSTHOG_API_KEY_<SUFFIX>` obligatoire, pas de repli global. */
  dedicatedKeyOnly?: boolean;
};

type SiteDefinition = {
  id: string;
  name: string;
  /** Suffixe des variables `POSTHOG_*_<SUFFIX>` et `GSC_SITE_URL_<SUFFIX>`. */
  suffix: string;
  /** Suffixe de repli lu si le principal est vide (ancien nom, ou projet PostHog partagé). */
  fallbackSuffix?: string;
  /**
   * Hosts (`properties.$host`) retenus dans le projet PostHog. Sert à séparer
   * deux sites qui envoient dans le même projet, et écarte `localhost`.
   */
  hosts?: string[];
  /** URL publique par défaut si `GSC_SITE_URL_<SUFFIX>` est vide. */
  siteUrl: string;
  dedicatedKeyOnly?: boolean;
};

/**
 * Un projet PostHog par site. Le project ID vient toujours de l’environnement
 * (`POSTHOG_PROJECT_ID_<SUFFIX>`) : rien d’identifiant client dans le dépôt public.
 * Une seule clé personnelle `POSTHOG_API_KEY` couvre toutes les organisations,
 * sauf Amidou qui vit sur un autre compte PostHog.
 */
const SITE_DEFINITIONS: SiteDefinition[] = [
  {
    id: "ats-seduction",
    name: "ATS Seduction",
    suffix: "ATS_SEDUCTION",
    fallbackSuffix: "ATS",
    siteUrl: "https://ats-seduction.vercel.app/",
  },
  {
    id: "amidou",
    name: "Amidou",
    suffix: "AMIDOU",
    siteUrl: "https://www.amidou.eu/",
    dedicatedKeyOnly: true,
  },
  {
    id: "gomett",
    name: "Gomett",
    suffix: "GOMETT",
    siteUrl: "https://www.gomett.com/",
    hosts: ["www.gomett.com", "gomett.com"],
  },
  {
    // Même projet PostHog que Gomett (repli sur POSTHOG_PROJECT_ID_GOMETT), séparé par host.
    id: "gomett-communaute",
    name: "Gomett Communauté",
    suffix: "GOMETT_COMMUNAUTE",
    fallbackSuffix: "GOMETT",
    siteUrl: "https://communaute.gomett.com/",
    hosts: ["communaute.gomett.com"],
  },
  {
    id: "coexister",
    name: "Coexister",
    suffix: "COEXISTER",
    siteUrl: "https://www.coexister.fr/",
  },
  {
    id: "annuaire-la-ruche",
    name: "Annuaire La Ruche",
    suffix: "ANNUAIRE_LA_RUCHE",
    siteUrl: "https://annuaire-transforama-la-ruche.vercel.app/",
  },
  {
    id: "klink",
    name: "Klink, le son du vin",
    suffix: "KLINK",
    siteUrl: "https://www.lesonduvin.fr/",
  },
  {
    id: "levat",
    name: "Jadin LEVAT",
    suffix: "LEVAT",
    siteUrl: "https://www.assolevat.fr/",
  },
  {
    id: "albane",
    name: "Albane",
    suffix: "ALBANE",
    siteUrl: "https://www.albanedharcourt.com/",
  },
  {
    id: "la-camaraderie",
    name: "La Camaraderie",
    suffix: "LA_CAMARADERIE",
    siteUrl: "https://www.lacamaraderie.net/",
  },
  {
    id: "riviere",
    name: "Rivière",
    suffix: "RIVIERE",
    siteUrl: "https://www.rivieredereves.org/",
  },
  {
    id: "storynous",
    name: "Storynous",
    suffix: "STORYNOUS",
    siteUrl: "https://www.storynous.fr/",
  },
  {
    id: "portfolio",
    name: "romainmailliu.com",
    suffix: "PORTFOLIO",
    siteUrl: "https://www.romainmailliu.com/",
  },
];

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function buildSite(def: SiteDefinition): AnalyticsSite {
  const projectId =
    readEnv(`POSTHOG_PROJECT_ID_${def.suffix}`) ||
    (def.fallbackSuffix ? readEnv(`POSTHOG_PROJECT_ID_${def.fallbackSuffix}`) : "");

  const gscSiteUrl =
    readEnv(`GSC_SITE_URL_${def.suffix}`) ||
    (def.fallbackSuffix ? readEnv(`GSC_SITE_URL_${def.fallbackSuffix}`) : "") ||
    def.siteUrl;

  const posthogExtraFilter = def.hosts?.length
    ? `AND properties.$host IN (${def.hosts.map((h) => `'${h}'`).join(", ")})`
    : undefined;

  return {
    id: def.id,
    name: def.name,
    posthogProjectId: projectId,
    posthogExtraFilter,
    gscSiteUrl,
    posthogCredentialSuffix: def.suffix,
    dedicatedKeyOnly: def.dedicatedKeyOnly,
  };
}

/**
 * Sites sur /admin (une ligne par site). Ordre d’affichage.
 */
export const ANALYTICS_SITES: AnalyticsSite[] = SITE_DEFINITIONS.map(buildSite);

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

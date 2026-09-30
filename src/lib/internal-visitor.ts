/**
 * Exclut les visites de Romain des statistiques PostHog.
 *
 * Le dashboard /admin pose ce marqueur dans le navigateur ; ensuite
 * `instrumentation-client.ts` n'initialise plus PostHog sur ce navigateur. Le
 * marqueur ne sert qu'au propriétaire du site, il ne suit aucun visiteur.
 */

const STORAGE_KEY = "rm_internal_visitor";

export function isInternalVisitor(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markInternalVisitor(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Navigation privée ou stockage bloqué : rien à faire.
  }
}

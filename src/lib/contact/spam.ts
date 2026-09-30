/**
 * Signaux anti-spam du formulaire contact, partagés par le client (pour ne pas
 * compter un bot comme une conversion dans PostHog) et par l'action serveur
 * (pour ne pas l'envoyer par email). Module sans dépendance : il ne doit pas
 * tirer zod dans le bundle de la home.
 *
 * Les bots observés en septembre 2026 remplissaient et envoyaient le
 * formulaire environ 2 s après le chargement de la page.
 */

/** En dessous de ce délai entre l'affichage du formulaire et l'envoi : bot. */
export const MIN_FILL_MS = 3000;

export function looksLikeBot({
  website,
  elapsedMs,
}: {
  website?: string;
  elapsedMs?: number;
}): boolean {
  if (website) return true;
  return typeof elapsedMs === "number" && elapsedMs < MIN_FILL_MS;
}

import type { SiteVisitorsRow } from "./load-dashboard";
import { formatSignedPercent, getEvolution } from "./math";

const DASHBOARD_URL = "https://www.romainmailliu.com/admin";
const UNAVAILABLE = "données indisponibles";

const numberFr = new Intl.NumberFormat("fr-FR");
const dateFr = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
});

/**
 * Rapport texte des visiteurs 30 j par site, même tri que `SitesTable`.
 * Une ligne « Site : visiteurs (évolution) » par site : lisible en police
 * proportionnelle (Gmail n'affiche pas le texte brut en monospace).
 * Pure : aucun accès réseau, testable avec des lignes factices.
 */
export function buildTrafficReport(
  rows: SiteVisitorsRow[],
  now: Date,
): { subject: string; text: string } {
  const sorted = [...rows].sort(
    (a, b) => b.currentVisitors - a.currentVisitors,
  );
  const totalCurrent = sorted.reduce((s, r) => s + r.currentVisitors, 0);
  const totalPrevious = sorted.reduce((s, r) => s + r.previousVisitors, 0);

  const summary = (visitors: number, previous: number) =>
    `${numberFr.format(visitors)} (${formatSignedPercent(getEvolution(visitors, previous))})`;

  const siteLines = sorted.map((r) =>
    r.error
      ? `${r.site.name} : ${UNAVAILABLE}`
      : `${r.site.name} : ${summary(r.currentVisitors, r.previousVisitors)}`,
  );

  const total = summary(totalCurrent, totalPrevious);

  const text = [
    `Visiteurs uniques des 30 derniers jours (au ${dateFr.format(now)}), comparés aux 30 jours précédents.`,
    "",
    ...siteLines,
    "",
    `Total : ${total}`,
    "",
    `Détail : ${DASHBOARD_URL}`,
    "",
  ].join("\n");

  const subject = `Trafic des 30 derniers jours · ${numberFr.format(totalCurrent)} visiteurs (${formatSignedPercent(getEvolution(totalCurrent, totalPrevious))})`;

  return { subject, text };
}

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
 * Rapport texte des visiteurs 30 j par site, même tri et mêmes règles que
 * `SitesTable`. Pure : aucun accès réseau, testable avec des lignes factices.
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
  const totalEvolution = formatSignedPercent(
    getEvolution(totalCurrent, totalPrevious),
  );

  const nameWidth =
    Math.max("Total".length, ...sorted.map((r) => r.site.name.length)) + 2;

  const line = (name: string, visitors: number, evolution: string) =>
    `${name.padEnd(nameWidth)}${numberFr.format(visitors).padStart(6)}   ${evolution.padStart(8)}`;

  const siteLines = sorted.map((r) =>
    line(
      r.site.name,
      r.currentVisitors,
      r.error
        ? UNAVAILABLE
        : formatSignedPercent(getEvolution(r.currentVisitors, r.previousVisitors)),
    ),
  );

  const text = [
    `Visiteurs uniques des 30 derniers jours (au ${dateFr.format(now)}), comparés aux 30 jours précédents.`,
    "",
    ...siteLines,
    "─".repeat(nameWidth + 6 + 3 + 8),
    line("Total", totalCurrent, totalEvolution),
    "",
    `Détail : ${DASHBOARD_URL}`,
    "",
  ].join("\n");

  const subject = `Trafic des 30 derniers jours · ${numberFr.format(totalCurrent)} visiteurs (${totalEvolution})`;

  return { subject, text };
}

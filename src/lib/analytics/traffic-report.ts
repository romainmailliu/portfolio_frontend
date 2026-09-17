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

type Window = { current: number; previous: number };

/** `896 (+132.1%)` */
function summary({ current, previous }: Window): string {
  return `${numberFr.format(current)} (${formatSignedPercent(getEvolution(current, previous))})`;
}

function sum(rows: SiteVisitorsRow[]): Window {
  return {
    current: rows.reduce((s, r) => s + r.currentVisitors, 0),
    previous: rows.reduce((s, r) => s + r.previousVisitors, 0),
  };
}

/**
 * Rapport texte des visiteurs par site sur 7 j et 30 j, trié par visiteurs
 * de la semaine. Une ligne « Site : 7 j … · 30 j … » par site : lisible en
 * police proportionnelle (Gmail n'affiche pas le texte brut en monospace).
 * Pure : aucun accès réseau, testable avec des lignes factices.
 */
export function buildTrafficReport(
  { week, month }: { week: SiteVisitorsRow[]; month: SiteVisitorsRow[] },
  now: Date,
): { subject: string; text: string } {
  const monthById = new Map(month.map((r) => [r.site.id, r]));
  const sorted = [...week].sort(
    (a, b) => b.currentVisitors - a.currentVisitors,
  );

  const siteLines = sorted.map((w) => {
    const m = monthById.get(w.site.id);
    if (w.error || !m || m.error) return `${w.site.name} : ${UNAVAILABLE}`;
    const weekPart = summary({ current: w.currentVisitors, previous: w.previousVisitors });
    const monthPart = summary({ current: m.currentVisitors, previous: m.previousVisitors });
    return `${w.site.name} : 7 j ${weekPart} · 30 j ${monthPart}`;
  });

  const weekTotal = sum(week);
  const monthTotal = sum(month);

  const text = [
    `Visiteurs uniques au ${dateFr.format(now)} — 7 derniers jours (vs 7 précédents) · 30 derniers jours (vs 30 précédents).`,
    "",
    ...siteLines,
    "",
    `Total : 7 j ${summary(weekTotal)} · 30 j ${summary(monthTotal)}`,
    "",
    `Détail : ${DASHBOARD_URL}`,
    "",
  ].join("\n");

  const subject = `Trafic de la semaine · ${numberFr.format(weekTotal.current)} visiteurs (${formatSignedPercent(getEvolution(weekTotal.current, weekTotal.previous))}) · 30 j : ${summary(monthTotal)}`;

  return { subject, text };
}

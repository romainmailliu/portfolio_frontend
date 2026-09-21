import type { SiteVisitorsRow } from "./load-dashboard";
import { formatSignedPercent, getEvolution } from "./math";

const DASHBOARD_URL = "https://www.romainmailliu.com/admin";
const UNAVAILABLE = "données indisponibles";

const numberFr = new Intl.NumberFormat("fr-FR");

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

/* Couleurs du design system (src/styles/design-system.css) et de /admin. */
const INK = "#1a3300";
const CREAM = "#fcfaf5";
const PENCIL = "#b6b6b6";
const UP = "#047857"; // emerald-700
const DOWN = "#b91c1c"; // red-700

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const ROW_BORDER = `1px solid ${PENCIL}`;
const TOTAL_BORDER = `2px solid ${INK}`;

/** Chiffre + évolution en petit dessous, colorée comme sur /admin (rien si la période précédente est vide). */
function cellHtml({ current, previous }: Window, border = ROW_BORDER, bold = false): string {
  const delta = getEvolution(current, previous);
  const tone = delta > 0 ? UP : delta < 0 ? DOWN : "rgba(26,51,0,.5)";
  const deltaHtml =
    previous > 0
      ? `<span style="display:block;font-size:11px;line-height:1.3;color:${tone};font-weight:400">${formatSignedPercent(delta)}</span>`
      : "";
  return `<td align="right" style="padding:10px 16px;border-top:${border};white-space:nowrap;font-variant-numeric:tabular-nums;${bold ? "font-weight:700;" : ""}">${numberFr.format(current)}${deltaHtml}</td>`;
}

const TH = `padding:8px 16px;font:600 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;color:rgba(26,51,0,.65)`;

/**
 * Rapport des visiteurs par site sur 7 j et 30 j, trié par visiteurs de la
 * semaine. `html` : un tableau Site · 7 j · 30 j, évolution en petit sous
 * chaque chiffre (même lecture que /admin). `text` : une ligne
 * « Site : 7 j … · 30 j … » par site, pour les clients sans HTML.
 * Pure : aucun accès réseau, testable avec des lignes factices.
 */
export function buildTrafficReport(
  { week, month }: { week: SiteVisitorsRow[]; month: SiteVisitorsRow[] },
): { subject: string; text: string; html: string } {
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
    ...siteLines,
    "",
    `Total : 7 j ${summary(weekTotal)} · 30 j ${summary(monthTotal)}`,
    "",
    `Détail : ${DASHBOARD_URL}`,
    "",
  ].join("\n");

  const rowsHtml = sorted
    .map((w) => {
      const m = monthById.get(w.site.id);
      const name = `<td style="padding:10px 16px;border-top:1px solid ${PENCIL};font-weight:500;white-space:nowrap">${escapeHtml(w.site.name)}</td>`;
      if (w.error || !m || m.error) {
        return `<tr>${name}<td colspan="2" align="right" style="padding:10px 16px;border-top:${ROW_BORDER};color:${DOWN};font-size:12px">${UNAVAILABLE}</td></tr>`;
      }
      return `<tr>${name}${cellHtml({ current: w.currentVisitors, previous: w.previousVisitors })}${cellHtml({ current: m.currentVisitors, previous: m.previousVisitors })}</tr>`;
    })
    .join("");

  const html = `<!doctype html><html lang="fr"><body style="margin:0;padding:24px 12px;background:${CREAM};color:${INK};font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid ${PENCIL};border-radius:12px">
<tr><td style="padding:20px 16px 12px">
<div style="font:600 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;text-transform:uppercase;color:rgba(26,51,0,.65)">Trafic de la semaine</div>
<div style="margin-top:4px;font-size:22px;font-weight:800;line-height:1.2">${numberFr.format(weekTotal.current)} visiteurs <span style="color:${getEvolution(weekTotal.current, weekTotal.previous) < 0 ? DOWN : UP};font-size:14px;font-weight:600">${formatSignedPercent(getEvolution(weekTotal.current, weekTotal.previous))}</span></div>
</td></tr>
<tr><td style="padding:0 0 4px">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
<thead><tr><th align="left" style="${TH}">Site</th><th align="right" style="${TH}">7 j</th><th align="right" style="${TH}">30 j</th></tr></thead>
<tbody>${rowsHtml}
<tr style="background:${CREAM}"><td style="padding:12px 16px;border-top:${TOTAL_BORDER};font-weight:700">Total</td>${cellHtml(weekTotal, TOTAL_BORDER, true)}${cellHtml(monthTotal, TOTAL_BORDER, true)}</tr>
</tbody></table>
</td></tr>
<tr><td style="padding:12px 16px 20px;font-size:12px"><a href="${DASHBOARD_URL}" style="color:${INK};font-weight:600">Voir le détail par mois →</a></td></tr>
</table>
</body></html>`;

  const subject = `Trafic de la semaine · ${numberFr.format(weekTotal.current)} visiteurs (${formatSignedPercent(getEvolution(weekTotal.current, weekTotal.previous))}) · 30 j : ${summary(monthTotal)}`;

  return { subject, text, html };
}

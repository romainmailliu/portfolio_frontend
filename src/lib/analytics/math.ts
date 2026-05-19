/** Percent change vs previous period (can be negative). */
export function getEvolution(current: number, previous: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) return 0;
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

/** e.g. 12000 → "12k", 950 → "950" */
export function formatCompactNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1_000_000)
    return `${(n / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`.replace(
      /\.0$/,
      "",
    );
  if (abs >= 1000)
    return `${(n / 1000).toFixed(abs >= 10000 ? 0 : 1)}k`.replace(/\.0$/, "");
  return String(Math.round(n));
}

export function formatSignedPercent(delta: number): string {
  if (!Number.isFinite(delta)) return "—";
  const rounded = Math.round(delta * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded}%`;
}

export function getPagesPerVisitorRatio(
  pageviews: number,
  visitors: number,
): number | null {
  if (!Number.isFinite(pageviews) || !Number.isFinite(visitors) || visitors <= 0) {
    return null;
  }
  return pageviews / visitors;
}

export function formatPagesPerVisitorRatio(ratio: number | null): string {
  if (ratio == null || !Number.isFinite(ratio)) return "—";
  return `${ratio.toFixed(1)}×`;
}

export type PagesPerVisitorLevel = "low" | "fair" | "good" | "excellent";

export type PagesPerVisitorEngagement = {
  level: PagesPerVisitorLevel;
  label: string;
  hint: string;
  valueClass: string;
  badgeClass: string;
  dotClass: string;
  barFillClass: string;
  /** 1–4 segments actifs sur la jauge */
  barSegments: number;
};

/** Seuils d’engagement (pages vues ÷ visiteurs, 30 j). */
export function getPagesPerVisitorEngagement(
  ratio: number | null,
): PagesPerVisitorEngagement | null {
  if (ratio == null || !Number.isFinite(ratio)) return null;

  if (ratio < 1.3) {
    return {
      level: "low",
      label: "Faible",
      hint: "Souvent une seule page par visite",
      valueClass: "text-red-700",
      badgeClass: "border-red-200 bg-red-50 text-red-800",
      dotClass: "bg-red-500",
      barFillClass: "bg-red-500",
      barSegments: 1,
    };
  }
  if (ratio < 2) {
    return {
      level: "fair",
      label: "Modéré",
      hint: "Navigation limitée",
      valueClass: "text-amber-800",
      badgeClass: "border-amber-200 bg-amber-50 text-amber-900",
      dotClass: "bg-amber-500",
      barFillClass: "bg-amber-500",
      barSegments: 2,
    };
  }
  if (ratio < 3.5) {
    return {
      level: "good",
      label: "Bon",
      hint: "Les visiteurs explorent le site",
      valueClass: "text-emerald-800",
      badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-900",
      dotClass: "bg-emerald-500",
      barFillClass: "bg-emerald-500",
      barSegments: 3,
    };
  }
  return {
    level: "excellent",
    label: "Élevé",
    hint: "Fort engagement par visiteur",
    valueClass: "text-sky-900",
    badgeClass: "border-sky-200 bg-sky-50 text-sky-900",
    dotClass: "bg-sky-600",
    barFillClass: "bg-sky-600",
    barSegments: 4,
  };
}

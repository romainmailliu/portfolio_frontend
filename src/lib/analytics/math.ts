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

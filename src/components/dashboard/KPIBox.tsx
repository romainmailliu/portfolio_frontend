type KPIBoxProps = {
  title: string;
  /** Précision courte (ex. « 30 j · fenêtre glissante ») */
  subtitle?: string;
  /** Détail technique / provenance */
  source?: string;
  value: string;
  /** Évolution vs la fenêtre −30 j (même durée), affichée sous la valeur */
  deltaPercent?: number | null;
  valueEvolutionHint?: number | null;
};

export function KPIBox({
  title,
  subtitle,
  source,
  value,
  deltaPercent,
  valueEvolutionHint,
}: KPIBoxProps) {
  const showDeltaLine =
    deltaPercent !== undefined && deltaPercent !== null && Number.isFinite(deltaPercent);

  const toneFrom = (x: number) =>
    x === 0 ? "text-neutral-600" : x > 0 ? "text-emerald-600" : "text-red-600";

  const valueTone =
    valueEvolutionHint !== undefined &&
    valueEvolutionHint !== null &&
    Number.isFinite(valueEvolutionHint)
      ? toneFrom(valueEvolutionHint)
      : "text-neutral-900";

  const deltaTone = showDeltaLine ? toneFrom(deltaPercent!) : "";

  const formattedDelta =
    showDeltaLine && deltaPercent !== undefined && deltaPercent !== null
      ? `${deltaPercent > 0 ? "+" : ""}${Math.round(deltaPercent * 10) / 10}%`
      : "";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-0.5 text-xs font-medium text-neutral-600">{subtitle}</p>
      ) : null}
      {source ? (
        <p className="mt-1 text-[11px] leading-snug text-neutral-400">{source}</p>
      ) : null}
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${valueTone}`}>
        {value}
      </p>
      {showDeltaLine ? (
        <p className={`mt-1 text-sm font-medium tabular-nums ${deltaTone}`}>
          vs fenêtre −30 j · {formattedDelta}
        </p>
      ) : null}
    </div>
  );
}

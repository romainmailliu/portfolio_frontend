type KPIBoxProps = {
  title: string;
  subtitle?: string;
  source?: string;
  value: string;
  deltaPercent?: number | null;
  valueEvolutionHint?: number | null;
  valueClassName?: string;
  footer?: React.ReactNode;
};

export function KPIBox({
  title,
  subtitle,
  source,
  value,
  deltaPercent,
  valueEvolutionHint,
  valueClassName,
  footer,
}: KPIBoxProps) {
  const showDeltaLine =
    deltaPercent !== undefined && deltaPercent !== null && Number.isFinite(deltaPercent);

  const toneFrom = (x: number) =>
    x === 0 ? "text-forest/60" : x > 0 ? "text-emerald-700" : "text-red-700";

  const valueTone =
    valueClassName ??
    (valueEvolutionHint !== undefined &&
    valueEvolutionHint !== null &&
    Number.isFinite(valueEvolutionHint)
      ? toneFrom(valueEvolutionHint)
      : "text-forest");

  const deltaTone = showDeltaLine ? toneFrom(deltaPercent!) : "";

  const formattedDelta =
    showDeltaLine && deltaPercent !== undefined && deltaPercent !== null
      ? `${deltaPercent > 0 ? "+" : ""}${Math.round(deltaPercent * 10) / 10}%`
      : "";

  return (
    <div className="sticky-card sticky-card--cream px-4 py-3 !bg-cream/90">
      <p className="field-label !opacity-100">{title}</p>
      {subtitle ? (
        <p className="mt-0.5 text-xs font-medium text-forest/80">{subtitle}</p>
      ) : null}
      {source ? (
        <p className="mt-1 text-[11px] leading-snug text-pencil">{source}</p>
      ) : null}
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${valueTone}`}>
        {value}
      </p>
      {footer}
      {showDeltaLine ? (
        <p className={`mt-1 text-sm font-medium tabular-nums ${deltaTone}`}>
          vs fenêtre −30 j · {formattedDelta}
        </p>
      ) : null}
    </div>
  );
}

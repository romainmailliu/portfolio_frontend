import type { PagesPerVisitorEngagement } from "../../lib/analytics/math";

type RatioEngagementIndicatorProps = {
  engagement: PagesPerVisitorEngagement;
  /** compact = pastille + label ; full = + jauge 4 segments */
  variant?: "compact" | "full";
};

export function RatioEngagementIndicator({
  engagement,
  variant = "full",
}: RatioEngagementIndicatorProps) {
  return (
    <div className="mt-2 space-y-2" title={engagement.hint}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${engagement.badgeClass}`}
      >
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${engagement.dotClass}`}
          aria-hidden
        />
        {engagement.label}
      </span>
      {variant === "full" ? (
        <div
          className="flex gap-1"
          role="img"
          aria-label={`Engagement ${engagement.label}, ${engagement.barSegments} sur 4`}
        >
          {[1, 2, 3, 4].map((segment) => (
            <div
              key={segment}
              className={`h-1.5 flex-1 rounded-full ${
                segment <= engagement.barSegments
                  ? engagement.barFillClass
                  : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}


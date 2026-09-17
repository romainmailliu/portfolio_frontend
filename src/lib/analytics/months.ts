export type CalendarMonth = {
  /** `YYYY-MM`, clé de jointure avec PostHog (`toStartOfMonth`). */
  key: string;
  /** `avr. 2026` sur la première colonne et en janvier, `mai` sinon. */
  label: string;
};

const monthFr = new Intl.DateTimeFormat("fr-FR", {
  month: "short",
  timeZone: "Europe/Paris",
});

/** Les `count` derniers mois civils, du plus ancien au mois en cours. */
export function lastCalendarMonths(now: Date, count: number): CalendarMonth[] {
  const months: CalendarMonth[] = [];
  for (let back = count - 1; back >= 0; back--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - back, 1));
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1;
    const key = `${year}-${String(month).padStart(2, "0")}`;
    const short = monthFr.format(d);
    const showYear = back === count - 1 || month === 1;
    months.push({ key, label: showYear ? `${short} ${year}` : short });
  }
  return months;
}

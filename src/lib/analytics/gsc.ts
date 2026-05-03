function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Total Search clicks over the last 30 days (rolling window). */
export async function getGSCClicks(siteUrl: string): Promise<number> {
  const token = process.env.GSC_ACCESS_TOKEN;
  if (!token) throw new Error("GSC_ACCESS_TOKEN manquant");

  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - 30);

  const encoded = encodeURIComponent(siteUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encoded}/searchAnalytics/query`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: formatDate(start),
      endDate: formatDate(end),
      dimensions: [],
      rowLimit: 25000,
      dataState: "all",
    }),
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Search Console ${res.status}: ${body.slice(0, 180)}`);
  }

  const json = (await res.json()) as { rows?: { clicks?: number }[] };
  const rows = json.rows ?? [];
  return rows.reduce((sum, row) => sum + (typeof row.clicks === "number" ? row.clicks : 0), 0);
}

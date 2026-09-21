import { NextResponse } from "next/server";
import { loadDashboardRows } from "../../../../lib/analytics/load-dashboard";
import { buildTrafficReport } from "../../../../lib/analytics/traffic-report";
import { timingSafePasswordEqual } from "../../../../lib/dashboard-password";
import { sendNotification } from "../../../../lib/email/resend";

export const dynamic = "force-dynamic";
/** 48 requêtes HogQL (7 j + 30 j) ; plusieurs minutes quand PostHog throttle la clé. */
export const maxDuration = 300;

/**
 * Appelée par le cron Vercel (`vercel.json`) chaque lundi matin avec
 * `Authorization: Bearer <CRON_SECRET>`. Test manuel : même en-tête via curl.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const bearer =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";

  if (!secret || !timingSafePasswordEqual(bearer, secret)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const [week, month] = await Promise.all([
    loadDashboardRows(7),
    loadDashboardRows(30),
  ]);
  const { subject, text, html } = buildTrafficReport({ week, month });

  await sendNotification({
    subject,
    text,
    html,
    fromName: "Trafic romainmailliu.com",
  });

  return NextResponse.json({
    sent: true,
    sites: week.length,
    unavailable: [...week, ...month].filter((r) => r.error).length,
  });
}

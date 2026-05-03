import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafePasswordEqual } from "../../../../lib/dashboard-password";
import { createDashboardSessionCookie } from "../../../../lib/dashboard-session";
import {
  consumeLoginRateLimit,
  loginAttemptClientIp,
} from "../../../../lib/login-rate-limit";

export async function POST(request: Request) {
  const expected = process.env.DASHBOARD_PASSWORD;
  const sessionSecret = process.env.DASHBOARD_SESSION_SECRET;

  if (!expected || !sessionSecret) {
    return NextResponse.json(
      { error: "Configuration serveur incomplète." },
      { status: 500 },
    );
  }

  const ip = loginAttemptClientIp(request);
  if (!consumeLoginRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      {
        status: 429,
        headers: { "Retry-After": "900" },
      },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  if (!timingSafePasswordEqual(body.password ?? "", expected)) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const cookieValue = await createDashboardSessionCookie(sessionSecret);
  const jar = await cookies();
  jar.set("dashboard_session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true });
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyLogoutCsrfToken } from "../../../../lib/dashboard-session";

export async function POST(request: Request) {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Configuration serveur incomplète." }, { status: 500 });
  }

  let csrf: string | undefined;
  try {
    const formData = await request.formData();
    csrf = formData.get("csrf")?.toString();
  } catch {
    return NextResponse.redirect(new URL("/dashboard?logout_err=form", request.url));
  }

  if (!(await verifyLogoutCsrfToken(csrf, secret))) {
    return NextResponse.redirect(new URL("/dashboard?logout_err=csrf", request.url));
  }

  const jar = await cookies();
  jar.set("dashboard_session", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.redirect(new URL("/dashboard/login", request.url));
}

import { type NextRequest, NextResponse } from "next/server";
import { verifyDashboardSessionCookie } from "./lib/dashboard-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("dashboard_session")?.value;
  const secret = process.env.DASHBOARD_SESSION_SECRET;

  if (
    !secret ||
    !(await verifyDashboardSessionCookie(token, secret))
  ) {
    const login = new URL("/dashboard/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

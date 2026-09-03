import type { NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { redirectToAdminLogin } from "@/lib/auth/request-origin";

const publicAdminPaths = ["/admin/login", "/admin/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return;
  }

  if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return;
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return redirectToAdminLogin(request);
  }

  try {
    await verifySessionToken(token);
    return;
  } catch {
    return redirectToAdminLogin(request);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

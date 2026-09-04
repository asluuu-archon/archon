import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session-token";
import { redirectToAdminLogin } from "@/lib/auth/request-origin";

const publicAdminPaths = ["/admin/login", "/admin/logout"];

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    await verifySessionToken(token);
    return true;
  } catch {
    return false;
  }
}

/**
 * Soft navigations send `?_rsc=…` flight requests. An HTTP 307 from middleware
 * is not a valid App Router flight response — the client follows Location and
 * lands on login even when a later document request would succeed with the
 * same cookie. For RSC, pass through and let the protected layout `redirect()`.
 */
function isRscRequest(request: NextRequest) {
  return request.nextUrl.searchParams.has("_rsc");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (await isAuthenticated(request)) {
    return NextResponse.next();
  }

  if (isRscRequest(request)) {
    return NextResponse.next();
  }

  return redirectToAdminLogin(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};

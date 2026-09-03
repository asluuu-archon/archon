import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Public site origin for redirects behind reverse proxies (Render, etc.).
 * Avoids Location headers pointing at internal hosts like localhost:10000.
 */
export function getPublicOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto =
    forwardedProto ||
    (host && !host.includes("localhost") ? "https" : request.nextUrl.protocol.replace(":", ""));

  if (host && !host.includes("localhost") && !host.startsWith("127.")) {
    return `${proto}://${host}`;
  }

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (configured) {
    return configured;
  }

  return request.nextUrl.origin;
}

export function redirectToAdminLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/login", getPublicOrigin(request)));
}

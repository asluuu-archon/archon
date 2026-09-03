import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { clearSessionCookieOnResponse } from "@/lib/auth/session";
import { getPublicOrigin } from "@/lib/auth/request-origin";

export async function GET(request: NextRequest) {
  return clearSessionCookieOnResponse(
    NextResponse.redirect(new URL("/admin/login", getPublicOrigin(request)))
  );
}

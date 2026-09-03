import { NextResponse } from "next/server";

import { clearSessionCookieOnResponse } from "@/lib/auth/session";

export async function GET(request: Request) {
  return clearSessionCookieOnResponse(
    NextResponse.redirect(new URL("/admin/login", request.url))
  );
}

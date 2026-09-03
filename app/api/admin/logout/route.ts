import { NextResponse } from "next/server";

import { clearSessionCookieOnResponse } from "@/lib/auth/session";

export async function POST() {
  return clearSessionCookieOnResponse(NextResponse.json({ ok: true }));
}

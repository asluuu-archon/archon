import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return null;
  }
  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

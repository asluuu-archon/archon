import { NextResponse } from "next/server";

import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured. Set DATABASE_URL in .env.local." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      role: "ADMIN",
    });

    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      {
        error:
          "Cannot connect to the database. Start Postgres and run: npx prisma db push && npm run db:seed",
      },
      { status: 503 }
    );
  }
}

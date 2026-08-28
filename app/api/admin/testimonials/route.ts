import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const body = (await request.json()) as {
    authorName?: string;
    authorRole?: string;
    company?: string;
    content?: string;
    rating?: number;
  };

  const authorName = body.authorName?.trim();
  const content = body.content?.trim();

  if (!authorName || !content) {
    return NextResponse.json(
      { error: "Author name and review text are required" },
      { status: 400 }
    );
  }

  const item = await prisma.testimonial.create({
    data: {
      authorName,
      authorRole: body.authorRole?.trim() || null,
      company: body.company?.trim() || null,
      content,
      rating: Math.min(5, Math.max(1, body.rating ?? 5)),
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const body = (await request.json()) as {
    id?: string;
    authorName?: string;
    authorRole?: string;
    company?: string;
    content?: string;
    rating?: number;
  };

  const id = body.id?.trim();
  const authorName = body.authorName?.trim();
  const content = body.content?.trim();

  if (!id || !authorName || !content) {
    return NextResponse.json(
      { error: "id, author name and review text are required" },
      { status: 400 }
    );
  }

  const item = await prisma.testimonial.update({
    where: { id },
    data: {
      authorName,
      authorRole: body.authorRole?.trim() || null,
      company: body.company?.trim() || null,
      content,
      rating: Math.min(5, Math.max(1, body.rating ?? 5)),
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

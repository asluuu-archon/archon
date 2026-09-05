import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const folders = await prisma.galleryFolder.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { images: true } } },
  });

  return NextResponse.json(folders);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
  }

  try {
    const folder = await prisma.galleryFolder.create({ data: { name } });
    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    console.error("Gallery folder create failed:", error);
    return NextResponse.json(
      { error: "Could not create folder. The name may already exist." },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const body = (await request.json()) as { id?: string; name?: string };
  const id = body.id?.trim();
  const name = body.name?.trim();
  if (!id || !name) {
    return NextResponse.json({ error: "id and name are required" }, { status: 400 });
  }

  try {
    const folder = await prisma.galleryFolder.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(folder);
  } catch (error) {
    console.error("Gallery folder rename failed:", error);
    return NextResponse.json({ error: "Could not rename folder" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  // Images keep their files; folder link is cleared via onDelete: SetNull
  await prisma.galleryFolder.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

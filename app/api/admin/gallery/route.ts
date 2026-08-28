import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { saveUpload } from "@/lib/uploads/save-upload";

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const caption = String(formData.get("caption") ?? "").trim() || null;
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    // Backward compatibility with single-file clients
    const single = formData.get("file");
    if (files.length === 0 && single instanceof File && single.size > 0) {
      files.push(single);
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Select one or more photos or videos to upload" },
        { status: 400 }
      );
    }

    const created = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        const { url, mediaType } = await saveUpload(file, "gallery");
        const item = await prisma.galleryImage.create({
          data: {
            imageUrl: url,
            mediaType,
            caption,
          },
        });
        created.push(item);
      } catch (error) {
        errors.push(
          `${file.name}: ${error instanceof Error ? error.message : "Upload failed"}`
        );
      }
    }

    if (created.length === 0) {
      return NextResponse.json(
        { error: errors.join("; ") || "Upload failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        items: created,
        uploaded: created.length,
        failed: errors.length,
        errors,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const captionRaw = formData.get("caption");
    const caption =
      captionRaw === null ? undefined : String(captionRaw).trim() || null;
    const file = formData.get("file");

    const data: { caption?: string | null; imageUrl?: string; mediaType?: string } = {};
    if (caption !== undefined) data.caption = caption;

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "gallery");
      data.imageUrl = uploaded.url;
      data.mediaType = uploaded.mediaType;
    }

    const item = await prisma.galleryImage.update({
      where: { id },
      data,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Gallery update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.galleryImage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

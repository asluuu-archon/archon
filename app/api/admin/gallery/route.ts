import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { saveUpload } from "@/lib/uploads/save-upload";

function parseOrientation(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "").trim().toLowerCase();
  return value === "landscape" || value === "portrait" ? value : "portrait";
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { folder: true },
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const caption = String(formData.get("caption") ?? "").trim() || null;
    const folderIdRaw = String(formData.get("folderId") ?? "").trim();
    const folderId = folderIdRaw || null;
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

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

    const orientations = formData.getAll("orientations").map((entry) => parseOrientation(entry));

    const created = [];
    const errors: string[] = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      try {
        const { url, mediaType } = await saveUpload(file, "gallery");
        const item = await prisma.galleryImage.create({
          data: {
            imageUrl: url,
            mediaType,
            orientation: orientations[index] ?? "portrait",
            caption,
            folderId,
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
    const contentType = request.headers.get("content-type") ?? "";

    // Bulk move: JSON { ids: string[], folderId: string | null }
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as {
        ids?: string[];
        folderId?: string | null;
        id?: string;
        caption?: string | null;
        orientation?: string;
      };

      if (Array.isArray(body.ids)) {
        if (body.ids.length === 0) {
          return NextResponse.json({ error: "Select at least one item" }, { status: 400 });
        }
        const folderId =
          body.folderId === undefined
            ? undefined
            : body.folderId
              ? String(body.folderId)
              : null;

        await prisma.galleryImage.updateMany({
          where: { id: { in: body.ids } },
          data: { folderId: folderId ?? null },
        });

        const items = await prisma.galleryImage.findMany({
          where: { id: { in: body.ids } },
          include: { folder: true },
        });
        return NextResponse.json({ items, moved: items.length });
      }

      const id = body.id?.trim();
      if (!id) {
        return NextResponse.json({ error: "id is required" }, { status: 400 });
      }
      const item = await prisma.galleryImage.update({
        where: { id },
        data: {
          caption: body.caption === undefined ? undefined : body.caption,
          orientation:
            body.orientation === "landscape" || body.orientation === "portrait"
              ? body.orientation
              : undefined,
          folderId:
            body.folderId === undefined
              ? undefined
              : body.folderId
                ? String(body.folderId)
                : null,
        },
        include: { folder: true },
      });
      return NextResponse.json(item);
    }

    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const captionRaw = formData.get("caption");
    const caption =
      captionRaw === null ? undefined : String(captionRaw).trim() || null;
    const file = formData.get("file");
    const folderRaw = formData.get("folderId");
    const orientation = parseOrientation(formData.get("orientation"));

    const data: {
      caption?: string | null;
      imageUrl?: string;
      mediaType?: string;
      orientation?: string;
      folderId?: string | null;
    } = {};
    if (caption !== undefined) data.caption = caption;
    if (folderRaw !== null) {
      const folderId = String(folderRaw).trim();
      data.folderId = folderId || null;
    }
    if (formData.get("orientation")) data.orientation = orientation;

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "gallery");
      data.imageUrl = uploaded.url;
      data.mediaType = uploaded.mediaType;
      data.orientation = orientation;
    }

    const item = await prisma.galleryImage.update({
      where: { id },
      data,
      include: { folder: true },
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

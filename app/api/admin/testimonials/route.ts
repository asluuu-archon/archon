import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { saveUpload } from "@/lib/uploads/save-upload";

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const authorName = String(formData.get("authorName") ?? "").trim();
    const authorRole = String(formData.get("authorRole") ?? "").trim() || null;
    const company = String(formData.get("company") ?? "").trim() || null;
    const content = String(formData.get("content") ?? "").trim();
    const ratingRaw = Number(formData.get("rating") ?? 5);
    const rating = Number.isFinite(ratingRaw)
      ? Math.min(5, Math.max(1, ratingRaw))
      : 5;
    const file = formData.get("file");

    let mediaUrl: string | null = null;
    let mediaType: string | null = null;
    let orientation: string | null = null;

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "testimonials");
      mediaUrl = uploaded.url;
      mediaType = uploaded.mediaType;
      const raw = String(formData.get("orientation") ?? "portrait").trim();
      orientation = raw === "landscape" || raw === "portrait" ? raw : "portrait";
    }

    if (!mediaUrl && !authorName && !content && !authorRole && !company) {
      return NextResponse.json(
        { error: "Add a photo/video or at least one review detail" },
        { status: 400 }
      );
    }

    const item = await prisma.testimonial.create({
      data: {
        authorName,
        authorRole,
        company,
        content,
        rating,
        mediaUrl,
        mediaType,
        orientation,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Testimonial create failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save review" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    const authorName = String(formData.get("authorName") ?? "").trim();
    const authorRole = String(formData.get("authorRole") ?? "").trim() || null;
    const company = String(formData.get("company") ?? "").trim() || null;
    const content = String(formData.get("content") ?? "").trim();
    const ratingRaw = Number(formData.get("rating") ?? 5);
    const rating = Number.isFinite(ratingRaw)
      ? Math.min(5, Math.max(1, ratingRaw))
      : 5;
    const file = formData.get("file");
    const clearMedia = String(formData.get("clearMedia") ?? "") === "1";

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const data: {
      authorName: string;
      authorRole: string | null;
      company: string | null;
      content: string;
      rating: number;
      mediaUrl?: string | null;
      mediaType?: string | null;
      orientation?: string | null;
    } = { authorName, authorRole, company, content, rating };

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "testimonials");
      data.mediaUrl = uploaded.url;
      data.mediaType = uploaded.mediaType;
      const raw = String(formData.get("orientation") ?? "portrait").trim();
      data.orientation = raw === "landscape" || raw === "portrait" ? raw : "portrait";
    } else if (clearMedia) {
      data.mediaUrl = null;
      data.mediaType = null;
      data.orientation = null;
    }

    const item = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Testimonial update failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
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

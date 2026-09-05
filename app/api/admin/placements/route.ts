import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { saveUpload } from "@/lib/uploads/save-upload";

function parseSalary(raw: string): string | null | { error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const amount = Number(trimmed.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter a valid salary amount, e.g. 4.5" };
  }
  const display = Number.isInteger(amount)
    ? String(amount)
    : String(Math.round(amount * 100) / 100);
  return `₹${display} LPA`;
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.placement.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const companyName = String(formData.get("companyName") ?? "").trim();
    const course = String(formData.get("course") ?? "").trim();
    const salaryResult = parseSalary(String(formData.get("salary") ?? ""));

    if (salaryResult && typeof salaryResult === "object" && "error" in salaryResult) {
      return NextResponse.json({ error: salaryResult.error }, { status: 400 });
    }

    let imageUrl: string | null = null;
    let mediaType = "image";
    let orientation = String(formData.get("orientation") ?? "portrait").trim();
    if (orientation !== "landscape" && orientation !== "portrait") {
      orientation = "portrait";
    }

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "placements");
      imageUrl = uploaded.url;
      mediaType = uploaded.mediaType;
    }

    if (!imageUrl && !companyName && !course && !salaryResult) {
      return NextResponse.json(
        { error: "Add a photo/video or at least one placement detail" },
        { status: 400 }
      );
    }

    const item = await prisma.placement.create({
      data: {
        imageUrl,
        mediaType,
        orientation,
        companyName,
        course,
        salary: salaryResult,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Placement create failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save placement" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    const companyName = String(formData.get("companyName") ?? "").trim();
    const course = String(formData.get("course") ?? "").trim();
    const file = formData.get("file");
    const clearMedia = String(formData.get("clearMedia") ?? "") === "1";
    const salaryResult = parseSalary(String(formData.get("salary") ?? ""));

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    if (salaryResult && typeof salaryResult === "object" && "error" in salaryResult) {
      return NextResponse.json({ error: salaryResult.error }, { status: 400 });
    }

    const data: {
      companyName: string;
      course: string;
      salary: string | null;
      imageUrl?: string | null;
      mediaType?: string;
      orientation?: string;
    } = { companyName, course, salary: salaryResult };

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "placements");
      data.imageUrl = uploaded.url;
      data.mediaType = uploaded.mediaType;
      const orientation = String(formData.get("orientation") ?? "portrait").trim();
      data.orientation =
        orientation === "landscape" || orientation === "portrait"
          ? orientation
          : "portrait";
    } else if (clearMedia) {
      data.imageUrl = null;
      data.mediaType = "image";
    }

    const item = await prisma.placement.update({
      where: { id },
      data,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Placement update failed:", error);
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

  await prisma.placement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

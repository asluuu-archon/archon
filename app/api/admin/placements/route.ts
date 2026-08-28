import { NextResponse } from "next/server";

import { requireAdminSession, unauthorizedResponse } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { saveUpload } from "@/lib/uploads/save-upload";

export async function GET() {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const items = await prisma.placement.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  const formData = await request.formData();
  const file = formData.get("file");
  const companyName = String(formData.get("companyName") ?? "").trim();
  const course = String(formData.get("course") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Photo is required" }, { status: 400 });
  }

  if (!companyName || !course) {
    return NextResponse.json(
      { error: "Company name and course are required" },
      { status: 400 }
    );
  }

  const salaryRaw = String(formData.get("salary") ?? "").trim();
  let salary: string | null = null;
  if (salaryRaw) {
    const amount = Number(salaryRaw.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Enter a valid salary amount, e.g. 4.5" },
        { status: 400 }
      );
    }
    const display = Number.isInteger(amount)
      ? String(amount)
      : String(Math.round(amount * 100) / 100);
    salary = `₹${display} LPA`;
  }

  const { url: imageUrl } = await saveUpload(file, "placements");
  const item = await prisma.placement.create({
    data: { imageUrl, companyName, course, salary },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdminSession())) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    const companyName = String(formData.get("companyName") ?? "").trim();
    const course = String(formData.get("course") ?? "").trim();
    const file = formData.get("file");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    if (!companyName || !course) {
      return NextResponse.json(
        { error: "Company name and course are required" },
        { status: 400 }
      );
    }

    const salaryRaw = String(formData.get("salary") ?? "").trim();
    let salary: string | null = null;
    if (salaryRaw) {
      const amount = Number(salaryRaw.replace(/[^\d.]/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json(
          { error: "Enter a valid salary amount, e.g. 4.5" },
          { status: 400 }
        );
      }
      const display = Number.isInteger(amount)
        ? String(amount)
        : String(Math.round(amount * 100) / 100);
      salary = `₹${display} LPA`;
    }

    const data: {
      companyName: string;
      course: string;
      salary: string | null;
      imageUrl?: string;
    } = { companyName, course, salary };

    if (file instanceof File && file.size > 0) {
      const uploaded = await saveUpload(file, "placements");
      data.imageUrl = uploaded.url;
    }

    const item = await prisma.placement.update({
      where: { id },
      data,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Placement update failed:", error);
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

  await prisma.placement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

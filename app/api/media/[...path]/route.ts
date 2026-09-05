import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  m4v: "video/x-m4v",
};

const ALLOWED_FOLDERS = new Set(["gallery", "placements", "testimonials"]);

export async function GET(_request: Request, context: RouteContext) {
  const segments = (await context.params).path ?? [];
  if (segments.length !== 2) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [folder, filename] = segments;
  if (!ALLOWED_FOLDERS.has(folder) || !filename || filename.includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "uploads", folder, filename);

  try {
    const data = await readFile(filePath);
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

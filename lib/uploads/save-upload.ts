import { mkdir, writeFile } from "fs/promises";
import path from "path";

const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const VIDEO_MAX_BYTES = 80 * 1024 * 1024;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"]);

export type MediaKind = "image" | "video";

export function detectMediaKind(file: File): MediaKind | null {
  if (IMAGE_TYPES.has(file.type)) return "image";
  if (VIDEO_TYPES.has(file.type) || file.type.startsWith("video/")) return "video";
  return null;
}

export async function saveUpload(
  file: File,
  folder: "gallery" | "placements"
): Promise<{ url: string; mediaType: MediaKind }> {
  const mediaType = detectMediaKind(file);

  if (!mediaType) {
    throw new Error("Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, MOV) are allowed");
  }

  if (folder === "placements" && mediaType !== "image") {
    throw new Error("Placement uploads must be images");
  }

  const maxBytes = mediaType === "video" ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
  if (file.size > maxBytes) {
    throw new Error(
      mediaType === "video"
        ? "Video must be 80 MB or smaller"
        : "Image must be 8 MB or smaller"
    );
  }

  const rawExt = file.name.split(".").pop()?.toLowerCase();
  const typeExt = file.type.split("/")[1]?.replace("jpeg", "jpg").replace("quicktime", "mov");
  const ext = rawExt && rawExt.length <= 5 ? rawExt : typeExt ?? (mediaType === "video" ? "mp4" : "jpg");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return { url: `/uploads/${folder}/${filename}`, mediaType };
}

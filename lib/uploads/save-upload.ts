const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const VIDEO_MAX_BYTES = 80 * 1024 * 1024;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"]);

export type MediaKind = "image" | "video";
export type UploadFolder = "gallery" | "placements" | "testimonials";

const BUCKET = "media";
let bucketReady: Promise<void> | null = null;

export function detectMediaKind(file: File): MediaKind | null {
  if (IMAGE_TYPES.has(file.type)) return "image";
  if (VIDEO_TYPES.has(file.type) || file.type.startsWith("video/")) return "video";
  return null;
}

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function storageHeaders(key: string, contentType?: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
  if (contentType) headers["Content-Type"] = contentType;
  return headers;
}

async function ensureMediaBucket(url: string, key: string) {
  if (!bucketReady) {
    bucketReady = (async () => {
      const listResponse = await fetch(`${url}/storage/v1/bucket`, {
        headers: storageHeaders(key),
        cache: "no-store",
      });
      if (!listResponse.ok) {
        throw new Error(`Could not list storage buckets (${listResponse.status})`);
      }

      const buckets = (await listResponse.json()) as Array<{ name?: string; id?: string }>;
      const exists = buckets.some(
        (bucket) => bucket.name === BUCKET || bucket.id === BUCKET
      );
      if (exists) return;

      const createResponse = await fetch(`${url}/storage/v1/bucket`, {
        method: "POST",
        headers: storageHeaders(key, "application/json"),
        body: JSON.stringify({
          id: BUCKET,
          name: BUCKET,
          public: true,
        }),
      });

      if (!createResponse.ok) {
        const text = await createResponse.text();
        if (!/already exists|duplicate|409/i.test(text) && createResponse.status !== 409) {
          throw new Error(`Could not create media bucket: ${text || createResponse.status}`);
        }
      }
    })().catch((error) => {
      bucketReady = null;
      throw error;
    });
  }

  await bucketReady;
}

function buildObjectPath(folder: UploadFolder, file: File, mediaType: MediaKind) {
  const rawExt = file.name.split(".").pop()?.toLowerCase();
  const typeExt = file.type.split("/")[1]?.replace("jpeg", "jpg").replace("quicktime", "mov");
  const preferredVideoExt = file.type.includes("webm") ? "webm" : "mp4";
  const ext =
    rawExt && rawExt.length <= 5
      ? rawExt
      : typeExt ?? (mediaType === "video" ? preferredVideoExt : "jpg");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  return `${folder}/${filename}`;
}

async function saveUploadLocally(
  file: File,
  folder: UploadFolder,
  mediaType: MediaKind
): Promise<{ url: string; mediaType: MediaKind }> {
  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  const objectPath = buildObjectPath(folder, file, mediaType);
  const filename = objectPath.split("/")[1];
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));
  return { url: `/api/media/${folder}/${filename}`, mediaType };
}

export async function saveUpload(
  file: File,
  folder: UploadFolder
): Promise<{ url: string; mediaType: MediaKind }> {
  const mediaType = detectMediaKind(file);

  if (!mediaType) {
    throw new Error("Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, MOV) are allowed");
  }

  const maxBytes = mediaType === "video" ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
  if (file.size > maxBytes) {
    throw new Error(
      mediaType === "video"
        ? "Video must be 80 MB or smaller"
        : "Image must be 8 MB or smaller"
    );
  }

  const config = supabaseConfig();
  if (!config) {
    return saveUploadLocally(file, folder, mediaType);
  }

  await ensureMediaBucket(config.url, config.key);

  const objectPath = buildObjectPath(folder, file, mediaType);
  const contentType =
    file.type || (mediaType === "video" ? "video/mp4" : "image/jpeg");
  const body = Buffer.from(await file.arrayBuffer());

  const uploadResponse = await fetch(
    `${config.url}/storage/v1/object/${BUCKET}/${objectPath}?cacheControl=31536000`,
    {
      method: "POST",
      headers: {
        ...storageHeaders(config.key, contentType),
        "x-upsert": "false",
      },
      body,
    }
  );

  if (!uploadResponse.ok) {
    const text = await uploadResponse.text();
    throw new Error(text || `Upload failed (${uploadResponse.status})`);
  }

  return {
    url: `${config.url}/storage/v1/object/public/${BUCKET}/${objectPath}`,
    mediaType,
  };
}

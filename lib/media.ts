export type MediaKind = "image" | "video";
export type MediaOrientation = "landscape" | "portrait";

export function isVideoMedia(item: {
  mediaType?: string | null;
  imageUrl?: string | null;
  mediaUrl?: string | null;
}) {
  const url = item.mediaUrl ?? item.imageUrl ?? "";
  return item.mediaType === "video" || /\.(mp4|webm|mov|m4v)$/i.test(url);
}

export function isImageMedia(item: {
  mediaType?: string | null;
  imageUrl?: string | null;
  mediaUrl?: string | null;
}) {
  const url = item.mediaUrl ?? item.imageUrl ?? "";
  if (!url) return false;
  return !isVideoMedia(item);
}

export function resolveOrientation(
  orientation?: string | null,
  width?: number | null,
  height?: number | null
): MediaOrientation {
  // Prefer measured dimensions so existing items stored as the wrong default
  // still frame correctly once metadata loads.
  if (width && height) {
    return width >= height ? "landscape" : "portrait";
  }
  if (orientation === "landscape" || orientation === "portrait") {
    return orientation;
  }
  return "portrait";
}

export function orientationAspectClass(orientation: MediaOrientation) {
  // Hint only — prefer natural file ratio in the UI instead of these boxes.
  return orientation === "landscape" ? "aspect-video" : "aspect-[9/16]";
}

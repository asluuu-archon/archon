export type MediaKind = "image" | "video";

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

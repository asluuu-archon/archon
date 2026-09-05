import type { CSSProperties } from "react";

import { isVideoMedia } from "@/lib/media";

type UploadedMediaProps = {
  src: string;
  alt: string;
  mediaType?: string | null;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
};

/**
 * Renders admin-uploaded images/videos from durable public URLs (Supabase)
 * or local /api/media paths. Uses native tags so Next image optimization
 * never 404s runtime uploads.
 */
export function UploadedMedia({
  src,
  alt,
  mediaType,
  className,
  style,
  fill = false,
}: UploadedMediaProps) {
  const video = isVideoMedia({ mediaType, imageUrl: src, mediaUrl: src });
  const fillClass = fill ? "absolute inset-0 h-full w-full object-cover" : className;

  if (video) {
    return (
      <video
        src={src}
        controls
        className={fillClass}
        style={style}
        preload="metadata"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- user uploads are remote/runtime URLs
    <img src={src} alt={alt} className={fillClass} style={style} loading="lazy" />
  );
}

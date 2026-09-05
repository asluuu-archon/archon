"use client";

import { UploadedMedia } from "@/components/media/UploadedMedia";

type OrientedMediaProps = {
  src: string;
  alt: string;
  mediaType?: string | null;
  /** Kept for API compatibility; frame size follows the file’s real ratio. */
  orientation?: string | null;
  className?: string;
};

/**
 * Displays media at its natural aspect ratio — no forced 9:16 / 16:9 letterboxing.
 */
export function OrientedMedia({
  src,
  alt,
  mediaType,
  className = "",
}: OrientedMediaProps) {
  return (
    <div className={`w-full overflow-hidden bg-transparent ${className}`.trim()}>
      <UploadedMedia src={src} alt={alt} mediaType={mediaType} />
    </div>
  );
}

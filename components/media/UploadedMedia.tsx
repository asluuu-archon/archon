"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useId, useRef } from "react";

import { pauseOtherVideos, useMediaPlayback } from "@/components/media/MediaPlayback";
import { isVideoMedia } from "@/lib/media";

type UploadedMediaProps = {
  src: string;
  alt: string;
  mediaType?: string | null;
  className?: string;
  style?: CSSProperties;
  /** Stretch to fill a sized parent (object-contain). Prefer natural for collage. */
  fill?: boolean;
  onNaturalSize?: (width: number, height: number) => void;
};

function blockContextMenu(event: MouseEvent) {
  event.preventDefault();
}

/**
 * Renders admin-uploaded images/videos. Only one video plays at a time.
 */
export function UploadedMedia({
  src,
  alt,
  mediaType,
  className,
  style,
  fill = false,
  onNaturalSize,
}: UploadedMediaProps) {
  const video = isVideoMedia({ mediaType, imageUrl: src, mediaUrl: src });
  const playback = useMediaPlayback();
  const reactId = useId();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const mediaClass = fill
    ? `absolute inset-0 h-full w-full object-contain ${className ?? ""}`.trim()
    : `block h-auto w-full ${className ?? ""}`.trim();

  useEffect(() => {
    if (!video || !playback) return;
    const el = videoRef.current;
    playback.register(reactId, el);
    return () => playback.register(reactId, null);
  }, [playback, reactId, video]);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={src}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        playsInline
        className={mediaClass}
        style={style}
        preload="metadata"
        onContextMenu={blockContextMenu}
        onLoadedMetadata={(event) => {
          const el = event.currentTarget;
          if (el.videoWidth && el.videoHeight) {
            onNaturalSize?.(el.videoWidth, el.videoHeight);
          }
        }}
        onPlay={(event) => {
          const el = event.currentTarget;
          if (playback) {
            playback.notifyPlay(reactId);
          } else {
            pauseOtherVideos(el);
          }
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- user uploads are remote/runtime URLs
    <img
      src={src}
      alt={alt}
      className={mediaClass}
      style={style}
      loading="lazy"
      draggable={false}
      onContextMenu={blockContextMenu}
      onLoad={(event) => {
        const el = event.currentTarget;
        if (el.naturalWidth && el.naturalHeight) {
          onNaturalSize?.(el.naturalWidth, el.naturalHeight);
        }
      }}
    />
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type MediaPlaybackContextValue = {
  register: (id: string, el: HTMLVideoElement | null) => void;
  notifyPlay: (id: string) => void;
};

const MediaPlaybackContext = createContext<MediaPlaybackContextValue | null>(null);

export function MediaPlaybackProvider({ children }: { children: ReactNode }) {
  const videosRef = useRef(new Map<string, HTMLVideoElement>());

  const register = useCallback((id: string, el: HTMLVideoElement | null) => {
    if (el) {
      videosRef.current.set(id, el);
    } else {
      videosRef.current.delete(id);
    }
  }, []);

  const notifyPlay = useCallback((id: string) => {
    videosRef.current.forEach((video, key) => {
      if (key !== id && !video.paused) {
        video.pause();
      }
    });
  }, []);

  const value = useMemo(() => ({ register, notifyPlay }), [register, notifyPlay]);

  return (
    <MediaPlaybackContext.Provider value={value}>{children}</MediaPlaybackContext.Provider>
  );
}

export function useMediaPlayback() {
  return useContext(MediaPlaybackContext);
}

/** Pause siblings even when no provider is mounted (document-scoped fallback). */
export function pauseOtherVideos(except: HTMLVideoElement) {
  document.querySelectorAll("video").forEach((node) => {
    if (node !== except && !node.paused) {
      node.pause();
    }
  });
}

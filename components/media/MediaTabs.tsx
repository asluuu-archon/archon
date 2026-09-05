"use client";

import { useMemo, useState, type ReactNode } from "react";

import { isImageMedia, isVideoMedia } from "@/lib/media";

type MediaItem = {
  id: string;
  mediaType?: string | null;
  imageUrl?: string | null;
  mediaUrl?: string | null;
};

type MediaTabsProps<T extends MediaItem> = {
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
  className?: string;
};

export function MediaTabs<T extends MediaItem>({
  items,
  emptyMessage,
  renderItem,
  className = "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
}: MediaTabsProps<T>) {
  const [tab, setTab] = useState<"videos" | "photos">("videos");

  const videos = useMemo(() => items.filter((item) => isVideoMedia(item)), [items]);
  const photos = useMemo(() => items.filter((item) => isImageMedia(item)), [items]);
  const activeItems = tab === "videos" ? videos : photos;

  return (
    <div className="mt-12">
      <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
        <button
          type="button"
          onClick={() => setTab("videos")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            tab === "videos"
              ? "bg-cyan-300 text-[#031018]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Videos{videos.length ? ` (${videos.length})` : ""}
        </button>
        <button
          type="button"
          onClick={() => setTab("photos")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            tab === "photos"
              ? "bg-cyan-300 text-[#031018]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Photos{photos.length ? ` (${photos.length})` : ""}
        </button>
      </div>

      {activeItems.length === 0 ? (
        <p className="mt-10 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
          {emptyMessage.replace("{tab}", tab === "videos" ? "videos" : "photos")}
        </p>
      ) : (
        <div className={className}>
          {activeItems.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

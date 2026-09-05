"use client";

import { UploadedMedia } from "@/components/media/UploadedMedia";

export type PublicGalleryItem = {
  id: string;
  imageUrl: string;
  mediaType: string;
  caption: string | null;
};

export function GalleryMediaGrid({ items }: { items: PublicGalleryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
        Gallery photos and videos will appear here once added from the admin dashboard.
      </p>
    );
  }

  return (
    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70"
        >
          <div className="relative mx-auto aspect-[9/16] w-full max-w-sm bg-black/40">
            <UploadedMedia
              src={item.imageUrl}
              mediaType={item.mediaType}
              alt={item.caption ?? "Archon gallery image"}
              fill
            />
          </div>
          {item.caption ? (
            <p className="p-5 text-sm leading-7 text-slate-300">{item.caption}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

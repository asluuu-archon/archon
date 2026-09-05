"use client";

import { MediaPlaybackProvider } from "@/components/media/MediaPlayback";
import { OrientedMedia } from "@/components/media/OrientedMedia";

export type PublicGalleryItem = {
  id: string;
  imageUrl: string;
  mediaType: string;
  orientation?: string | null;
  caption: string | null;
  folderId?: string | null;
  folder?: { id: string; name: string } | null;
};

/** Interleave landscape and portrait so masonry columns pack more evenly. */
function collageOrder(items: PublicGalleryItem[]) {
  const landscape: PublicGalleryItem[] = [];
  const portrait: PublicGalleryItem[] = [];

  for (const item of items) {
    if (item.orientation === "landscape") landscape.push(item);
    else portrait.push(item);
  }

  const ordered: PublicGalleryItem[] = [];
  let li = 0;
  let pi = 0;
  while (li < landscape.length || pi < portrait.length) {
    if (pi < portrait.length) ordered.push(portrait[pi++]);
    if (li < landscape.length) ordered.push(landscape[li++]);
    if (pi < portrait.length) ordered.push(portrait[pi++]);
  }
  return ordered;
}

export function GalleryMediaGrid({ items }: { items: PublicGalleryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
        Gallery photos and videos will appear here once added from the admin dashboard.
      </p>
    );
  }

  const unfiled = items.filter((item) => !item.folderId);
  const folderMap = new Map<string, { name: string; items: PublicGalleryItem[] }>();

  items.forEach((item) => {
    if (!item.folderId || !item.folder) return;
    const existing = folderMap.get(item.folderId) ?? {
      name: item.folder.name,
      items: [],
    };
    existing.items.push(item);
    folderMap.set(item.folderId, existing);
  });

  const folders = Array.from(folderMap.entries()).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  function renderCollage(list: PublicGalleryItem[]) {
    return (
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {collageOrder(list).map((item) => (
          <article
            key={item.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/70"
          >
            <OrientedMedia
              src={item.imageUrl}
              mediaType={item.mediaType}
              orientation={item.orientation}
              alt={item.caption ?? "Archon gallery image"}
            />
            {item.caption ? (
              <p className="p-4 text-sm leading-7 text-slate-300">{item.caption}</p>
            ) : null}
          </article>
        ))}
      </div>
    );
  }

  return (
    <MediaPlaybackProvider>
      <div className="mt-16 space-y-14">
        {folders.map(([folderId, folder]) => (
          <section key={folderId}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              {folder.name}
            </h2>
            {renderCollage(folder.items)}
          </section>
        ))}

        {unfiled.length > 0 ? (
          <section>
            {folders.length > 0 ? (
              <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Unfiled
              </h2>
            ) : null}
            {renderCollage(unfiled)}
          </section>
        ) : null}
      </div>
    </MediaPlaybackProvider>
  );
}

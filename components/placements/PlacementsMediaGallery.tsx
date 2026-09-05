"use client";

import { MediaTabs } from "@/components/media/MediaTabs";
import { UploadedMedia } from "@/components/media/UploadedMedia";

export type PublicPlacement = {
  id: string;
  imageUrl: string | null;
  mediaType: string;
  companyName: string;
  salary: string | null;
  course: string;
};

export function PlacementsMediaGallery({ items }: { items: PublicPlacement[] }) {
  const mediaItems = items.filter((item) => Boolean(item.imageUrl));
  const textOnly = items.filter((item) => !item.imageUrl);

  if (items.length === 0) {
    return (
      <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
        Placement stories will appear here once added from the admin dashboard.
      </p>
    );
  }

  return (
    <>
      <MediaTabs
        items={mediaItems}
        emptyMessage="No placement {tab} yet. Switch tabs or check back soon."
        renderItem={(item) => (
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70">
            {item.imageUrl ? (
              <div className="relative aspect-[4/5] bg-black/40">
                <UploadedMedia
                  src={item.imageUrl}
                  mediaType={item.mediaType}
                  alt={
                    item.companyName
                      ? `Placement at ${item.companyName}`
                      : "Archon placement"
                  }
                  fill
                />
              </div>
            ) : null}
            {(item.companyName || item.course || item.salary) && (
              <div className="p-6">
                {item.companyName ? (
                  <h2 className="text-xl font-semibold text-white">{item.companyName}</h2>
                ) : null}
                {item.course ? (
                  <p className="mt-2 text-sm text-cyan-300">{item.course}</p>
                ) : null}
                {item.salary ? (
                  <p className="mt-3 text-sm text-slate-400">{item.salary}</p>
                ) : null}
              </div>
            )}
          </article>
        )}
      />

      {textOnly.length > 0 ? (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <h2 className="col-span-full text-sm uppercase tracking-[0.28em] text-slate-500">
            Placement details
          </h2>
          {textOnly.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-6"
            >
              {item.companyName ? (
                <h2 className="text-xl font-semibold text-white">{item.companyName}</h2>
              ) : null}
              {item.course ? (
                <p className="mt-2 text-sm text-cyan-300">{item.course}</p>
              ) : null}
              {item.salary ? (
                <p className="mt-3 text-sm text-slate-400">{item.salary}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

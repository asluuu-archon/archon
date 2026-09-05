"use client";

import { MediaTabs } from "@/components/media/MediaTabs";
import { UploadedMedia } from "@/components/media/UploadedMedia";

export type PublicTestimonial = {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  rating: number;
  mediaUrl: string | null;
  mediaType: string | null;
};

export function TestimonialsMediaGallery({
  items,
}: {
  items: PublicTestimonial[];
}) {
  const mediaItems = items.filter((item) => Boolean(item.mediaUrl));
  const textOnly = items.filter((item) => !item.mediaUrl);

  if (items.length === 0) {
    return (
      <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
        Testimonials will appear here once added from the admin dashboard.
      </p>
    );
  }

  return (
    <>
      <MediaTabs
        items={mediaItems}
        emptyMessage="No review {tab} yet. Switch tabs or check back soon."
        className="mt-10 grid gap-6 sm:grid-cols-2"
        renderItem={(item) => (
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70">
            {item.mediaUrl ? (
              <div className="relative mx-auto aspect-[9/16] w-full max-w-sm bg-black/40">
                <UploadedMedia
                  src={item.mediaUrl}
                  mediaType={item.mediaType}
                  alt={item.authorName || "Archon review"}
                  fill
                />
              </div>
            ) : null}
            {(item.authorName ||
              item.authorRole ||
              item.company ||
              item.content) && (
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {item.authorName ? (
                      <h2 className="text-xl font-semibold text-white">
                        {item.authorName}
                      </h2>
                    ) : null}
                    {(item.authorRole || item.company) && (
                      <p className="mt-1 text-sm text-cyan-300">
                        {[item.authorRole, item.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-300">
                    {item.rating}/5
                  </span>
                </div>
                {item.content ? (
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.content}</p>
                ) : null}
              </div>
            )}
          </article>
        )}
      />

      {textOnly.length > 0 ? (
        <div className="mt-16 space-y-6">
          <h2 className="text-sm uppercase tracking-[0.28em] text-slate-500">
            Written reviews
          </h2>
          {textOnly.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {item.authorName ? (
                    <h2 className="text-xl font-semibold text-white">{item.authorName}</h2>
                  ) : null}
                  {(item.authorRole || item.company) && (
                    <p className="mt-1 text-sm text-cyan-300">
                      {[item.authorRole, item.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-300">
                  {item.rating}/5
                </span>
              </div>
              {item.content ? (
                <p className="mt-5 text-base leading-8 text-slate-300">{item.content}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

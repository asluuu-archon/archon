import Image from "next/image";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getPublishedGallery } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Archon Solutions",
  description: "Photos and videos from Archon learning programs, consulting work, and community events.",
};

function isVideo(item: { mediaType?: string | null; imageUrl: string }) {
  return item.mediaType === "video" || /\.(mp4|webm|mov|m4v)$/i.test(item.imageUrl);
}

export default async function GalleryPage() {
  const items = await getPublishedGallery();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Inside Archon</p>
          <h1 className="mt-4 text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Gallery
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Real moments from classrooms, client work, and the people building capability with us.
          </p>

          {items.length === 0 ? (
            <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
              Gallery photos and videos will appear here once added from the admin dashboard.
            </p>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70"
                >
                  <div className="relative aspect-[4/3] bg-black/40">
                    {isVideo(item) ? (
                      <video
                        src={item.imageUrl}
                        controls
                        className="h-full w-full object-cover"
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={item.imageUrl}
                        alt={item.caption ?? "Archon gallery image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  {item.caption ? (
                    <p className="p-5 text-sm leading-7 text-slate-300">{item.caption}</p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

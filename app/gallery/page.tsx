import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { GalleryMediaGrid } from "@/components/gallery/GalleryMediaGrid";
import { getPublishedGallery } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Archon Solutions",
  description: "Photos and videos from Archon learning programs, consulting work, and community events.",
};

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

          <GalleryMediaGrid items={items} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

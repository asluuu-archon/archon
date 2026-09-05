import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { PlacementsMediaGallery } from "@/components/placements/PlacementsMediaGallery";
import { getPublishedPlacements } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Placements | Archon Solutions",
  description: "Recent Archon learner placements with companies, courses, and career outcomes.",
};

export default async function PlacementsPage() {
  const items = await getPublishedPlacements();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Career outcomes</p>
          <h1 className="mt-4 text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Placements
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Learners who moved from training into roles that match the skills they built with us.
          </p>

          <PlacementsMediaGallery items={items} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

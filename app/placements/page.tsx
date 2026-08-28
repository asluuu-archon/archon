import Image from "next/image";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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

          {items.length === 0 ? (
            <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
              Placement stories will appear here once added from the admin dashboard.
            </p>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/70"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.imageUrl}
                      alt={`Placement at ${item.companyName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white">{item.companyName}</h2>
                    <p className="mt-2 text-sm text-cyan-300">{item.course}</p>
                    {item.salary ? (
                      <p className="mt-3 text-sm text-slate-400">{item.salary}</p>
                    ) : null}
                  </div>
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

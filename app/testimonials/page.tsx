import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getPublishedTestimonials } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonials | Archon Solutions",
  description: "Reviews from business owners, learners, and partners who work with Archon.",
};

export default async function TestimonialsPage() {
  const items = await getPublishedTestimonials();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">What people say</p>
          <h1 className="mt-4 text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Reviews & testimonials
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Honest feedback from owners, hiring managers, and learners who needed results—not
            promises.
          </p>

          {items.length === 0 ? (
            <p className="mt-16 rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8 text-slate-400">
              Testimonials will appear here once added from the admin dashboard.
            </p>
          ) : (
            <div className="mt-16 space-y-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{item.authorName}</h2>
                      <p className="mt-1 text-sm text-cyan-300">
                        {[item.authorRole, item.company].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-300">
                      {item.rating}/5
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-8 text-slate-300">{item.content}</p>
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

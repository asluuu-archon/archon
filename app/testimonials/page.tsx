import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TestimonialsMediaGallery } from "@/components/testimonials/TestimonialsMediaGallery";
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

          <TestimonialsMediaGallery items={items} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

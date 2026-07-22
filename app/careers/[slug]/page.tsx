import { safeSanityFetch } from "@/lib/sanity.safe";
import { CAREERS_QUERY } from "@/lib/sanity.queries";
import { Career } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    defaultValue: [],
  });

  return careers.map((career) => ({
    slug: career.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    defaultValue: [],
  });

  const career = careers.find((c) => c.slug.current === params.slug);

  if (!career) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: career.seoTitle || career.title,
    description: career.seoDescription || career.description,
  };
}

export default async function CareerPage({
  params,
}: {
  params: { slug: string };
}) {
  const careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    defaultValue: [],
  });

  const career = careers.find((c) => c.slug.current === params.slug);

  if (!career) {
    return (
      <main className="relative min-h-screen bg-[#050816] text-white">
        <Navbar />
        <div className="relative z-10 pt-32 pb-20">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Position Not Found</h1>
            <p className="text-slate-400 mb-8">
              The position you're looking for doesn't exist.
            </p>
            <Link
              href="/careers"
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Back to Careers
            </Link>
          </section>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-6">{career.title}</h1>
            <p className="text-xl text-slate-300 mb-6">{career.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Department</p>
                <p className="font-semibold">{career.department}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Location</p>
                <p className="font-semibold">{career.location}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Employment Type</p>
                <p className="font-semibold">{career.employmentType}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                Posted on {new Date(career.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            {career.content ? (
              <PortableText value={career.content} />
            ) : (
              <p className="text-slate-400">No detailed job description available.</p>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-900 to-slate-900 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-slate-300 mb-6">
              Send us your resume and let's talk about how you can contribute to the Archon mission.
            </p>
            <Link
              href={`/contact?position=${encodeURIComponent(career.title)}`}
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Apply Now
            </Link>
          </div>

          {/* Back Link */}
          <div className="pt-8 border-t border-slate-700">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Careers
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

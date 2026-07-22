import { safeSanityFetch } from "@/lib/sanity.safe";
import { INSIGHT_BY_SLUG_QUERY, INSIGHTS_QUERY } from "@/lib/sanity.queries";
import { Insight } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const insights = await safeSanityFetch<Insight[]>({
    query: INSIGHTS_QUERY,
    defaultValue: [],
  });

  return insights.map((insight) => ({
    slug: insight.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const insight = await safeSanityFetch<Insight | null>({
    query: INSIGHT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    defaultValue: null,
  });

  if (!insight) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: insight.seoTitle || insight.title,
    description: insight.seoDescription || insight.excerpt,
  };
}

export default async function InsightPage({
  params,
}: {
  params: { slug: string };
}) {
  const insight = await safeSanityFetch<Insight | null>({
    query: INSIGHT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    defaultValue: null,
  });

  if (!insight) {
    return (
      <main className="relative min-h-screen bg-[#050816] text-white">
        <Navbar />
        <div className="relative z-10 pt-32 pb-20">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-slate-400 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link
              href="/insights"
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Back to Insights
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
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-semibold text-cyan-400 uppercase">
                {insight.category}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(insight.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{insight.title}</h1>
            <p className="text-xl text-slate-300 mb-6">{insight.excerpt}</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-700">
              <div>
                <p className="text-sm font-semibold">By {insight.author}</p>
                <p className="text-xs text-slate-400">
                  {Math.ceil((insight.body?.length || 0) / 200)} min read
                </p>
              </div>
              {insight.tags && insight.tags.length > 0 && (
                <div className="flex gap-2">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800 text-xs rounded-full text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {insight.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${insight.featuredImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                alt={insight.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            {insight.body ? (
              <PortableText value={insight.body} />
            ) : (
              <p className="text-slate-400">No content available.</p>
            )}
          </div>

          {/* Back Link */}
          <div className="pt-8 border-t border-slate-700">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Insights
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

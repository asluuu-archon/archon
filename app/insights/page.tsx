import { safeSanityFetch } from "@/lib/sanity.safe";
import { INSIGHTS_QUERY } from "@/lib/sanity.queries";
import { Insight } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Insights | Archon",
  description: "Thought leadership and insights from the Archon ecosystem.",
};

export default async function InsightsPage() {
  let insights: Insight[] = [];

  insights = await safeSanityFetch<Insight[]>({
    query: INSIGHTS_QUERY,
    tags: ["insights"],
    defaultValue: [],
  });

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Insights</h1>
            <p className="text-lg text-slate-300">
              Thought leadership, technical deep dives, and perspectives on enterprise technology, AI, and career growth.
            </p>
          </div>

          {insights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight) => (
                <Link
                  key={insight._id}
                  href={`/insights/${insight.slug.current}`}
                  className="group"
                >
                  <div className="bg-slate-900 rounded-lg overflow-hidden hover:bg-slate-800 transition-colors">
                    {insight.featuredImage && (
                      <div className="w-full h-48 bg-slate-800 overflow-hidden">
                        <img
                          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${insight.featuredImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-cyan-400 uppercase">
                          {insight.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(insight.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-3">
                        {insight.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs text-slate-500">By {insight.author}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">
                No insights published yet. Check back soon!
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

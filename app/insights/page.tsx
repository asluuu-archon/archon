import { ArrowRight, ArrowUpRight, BookOpenText, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { sanityClient } from "@/sanity/client";
import { allInsightsQuery } from "@/sanity/queries";
import type { Insight } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Archon Insights | Technology, Careers and Innovation",
  description:
    "Explore practical Archon insights on SAP, AI, software engineering, careers, consulting, cloud and enterprise innovation.",
  alternates: {
    canonical: absoluteUrl("/insights"),
  },
  openGraph: {
    title: "Archon Insights | Technology, Careers and Innovation",
    description:
      "Practical thinking on SAP, AI, software engineering, careers, consulting, cloud and enterprise innovation.",
    url: absoluteUrl("/insights"),
  },
};

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  "sap-erp": "SAP & ERP",
  "ai-automation": "AI & Automation",
  "software-engineering": "Software Engineering",
  "cloud-devops": "Cloud & DevOps",
  "data-analytics": "Data & Analytics",
  cybersecurity: "Cybersecurity",
  careers: "Careers",
  consulting: "Consulting",
  "founder-notes": "Founder Notes",
  "learner-stories": "Learner Stories",
  "company-updates": "Company Updates",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function InsightsPage() {
  let insights: Insight[] = [];

  try {
    insights = await sanityClient.fetch<Insight[]>(
      allInsightsQuery,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["insights"],
        },
      }
    );
  } catch (error) {
    console.error("Unable to load Insights:", error);
  }

  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Archon Insights",
    itemListElement: insights.map((insight, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: insight.title,
        description: insight.excerpt,
        datePublished: insight.publishedAt,
        url: `${siteUrl}/insights/${insight.slug}`,
        author: {
          "@type": "Person",
          name: insight.authorName ?? "Archon",
        },
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-cyan-300">
                <BookOpenText className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Archon Insights
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
                Learn. Question.
                <br />
                <span className="text-slate-400">Build better.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Practical thinking from across Archon’s learning, consulting,
                product and global technology ecosystem.
              </p>
            </div>

            <aside className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-7">
              <Sparkles className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-5 text-xl font-semibold">Ideas with a point of view.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                We focus on useful context, practical implications and the
                questions worth asking before you make the next move.
              </p>
            </aside>
          </section>

          <section aria-labelledby="article-list" className="mt-20">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-sm font-medium text-cyan-300">Latest thinking</p>
                <h2 id="article-list" className="mt-2 text-3xl font-semibold tracking-tight">
                  Ideas worth carrying forward.
                </h2>
              </div>
              {insights.length > 0 && (
                <p className="text-sm text-slate-500">{insights.length} published insights</p>
              )}
            </div>

            {insights.length === 0 ? (
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 md:p-14">
                <BookOpenText className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-2xl font-semibold">The first Insight is being prepared.</h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
                  Original analysis on enterprise technology, careers and
                  meaningful business outcomes will appear here as it is
                  published through the Archon CMS.
                </p>
                <Link
                  href="/#contact"
                  className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full border border-white/10 px-6 text-sm font-medium text-white transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Suggest an Insight Topic
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {insights.map((insight) => (
                  <Link
                    key={insight._id}
                    href={`/insights/${insight.slug}`}
                    className="group flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.04]"
                  >
                    {insight.imageUrl ? (
                      <div className="-mx-6 -mt-6 mb-6 h-40 overflow-hidden border-b border-white/10">
                        <img
                          src={insight.imageUrl}
                          alt={insight.imageAlt ?? insight.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {categoryLabels[insight.category] ?? insight.category}
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-cyan-200">
                      {insight.title}
                    </h3>
                    <p className="mt-5 line-clamp-4 text-sm leading-7 text-slate-400">
                      {insight.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <div>
                        <div className="text-xs text-white">{insight.authorName ?? "Archon"}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {formatDate(insight.publishedAt)}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

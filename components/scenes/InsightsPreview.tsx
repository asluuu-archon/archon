import { ArrowUpRight, BookOpenText, Clock3 } from "lucide-react";
import Link from "next/link";

import { sanityClient } from "@/sanity/client";
import { latestInsightsQuery } from "@/sanity/queries";
import type { Insight } from "@/sanity/types";

const fallbackInsights: Insight[] = [
  {
    _id: "fallback-understanding",
    title:
      "Why real understanding matters more than collecting certificates",
    slug: "real-understanding-over-certificates",
    excerpt:
      "A certificate can support a career, but practical understanding, mentorship and exposure are what create confidence.",
    category: "founder-notes",
    authorName: "Mohamed Aslam",
    publishedAt: "2026-07-01T00:00:00.000Z",
    featured: true,
  },
  {
    _id: "fallback-sap-career",
    title: "Why qualified candidates still struggle to enter SAP careers",
    slug: "why-qualified-candidates-struggle-with-sap-careers",
    excerpt:
      "Training and certification alone may not prepare candidates for the expectations of a first SAP role.",
    category: "careers",
    authorName: "Archon",
    publishedAt: "2026-06-25T00:00:00.000Z",
  },
  {
    _id: "fallback-ai",
    title: "Building AI that supports people instead of replacing judgment",
    slug: "building-responsible-ai-assistants",
    excerpt:
      "The strongest AI products do not merely automate conversations. They preserve context, human judgment and accountability.",
    category: "ai-automation",
    authorName: "Archon Future Labs",
    publishedAt: "2026-06-20T00:00:00.000Z",
  },
];

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
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function calculateReadingTime(excerpt: string) {
  const words = excerpt.trim().split(/\s+/).length;

  return Math.max(2, Math.ceil(words / 40));
}

export default async function InsightsPreview() {
  let insights: Insight[] = [];

  try {
    insights = await sanityClient.fetch<Insight[]>(
      latestInsightsQuery,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["insights"],
        },
      }
    );
  } catch (error) {
    console.error("Unable to load Insight articles:", error);
  }

  const displayedInsights =
    insights.length > 0 ? insights : fallbackInsights;

  return (
    <section
      id="insights"
      className="relative overflow-hidden border-y border-white/5 bg-[#050816] px-6 py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.045] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
              <BookOpenText className="h-4 w-4" />
              Archon Insights
            </div>

            <h2 className="mt-7 text-5xl font-bold leading-[1.03] text-white md:text-7xl">
              Ideas worth
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                building upon.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              Practical perspectives on careers, enterprise technology,
              learning, consulting, AI and the future we are building.
            </p>
          </div>

          <Link
            href="/insights"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.07] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.12]"
          >
            Explore all insights

            <ArrowUpRight className="h-4 w-4 text-cyan-300 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {displayedInsights.map((insight, index) => (
            <Link
              key={insight._id}
              href={
                insights.length > 0
                  ? `/insights/${insight.slug}`
                  : "/insights"
              }
              className={`group relative flex min-h-[390px] flex-col overflow-hidden rounded-[2.2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
                index === 0
                  ? "border-cyan-300/30 bg-cyan-300/[0.07] shadow-[0_0_80px_rgba(34,211,238,0.08)]"
                  : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
              }`}
            >
              {insight.imageUrl && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={insight.imageUrl}
                    alt={insight.imageAlt ?? insight.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-700 group-hover:scale-105 group-hover:opacity-30"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/85 to-[#050816]/35" />
                </>
              )}

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {categoryLabels[insight.category] ??
                      insight.category}
                  </span>

                  {insight.featured && (
                    <span className="text-[8px] uppercase tracking-[0.25em] text-emerald-400">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-24">
                  <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {insight.title}
                  </h3>

                  <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-400">
                    {insight.excerpt}
                  </p>

                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <div className="text-xs text-white">
                        {insight.authorName ?? "Archon"}
                      </div>

                      <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                        {formatDate(insight.publishedAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-500">
                      <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                      {calculateReadingTime(insight.excerpt)} min
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
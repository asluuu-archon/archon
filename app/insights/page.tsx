import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { sanityClient } from "@/sanity/client";
import { allInsightsQuery } from "@/sanity/queries";
import type { Insight } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Archon Insights | Technology, Careers and Innovation",
  description:
    "Explore practical insights from Archon covering SAP, AI, software engineering, careers, consulting, cloud and innovation.",
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
  return new Intl.DateTimeFormat("en", {
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

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-28 pt-32 text-white">
      <div className="mx-auto max-w-[1450px]">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
            <BookOpenText className="h-4 w-4" />
            Archon Insights
          </div>

          <h1 className="mt-8 text-6xl font-bold leading-[0.98] md:text-8xl">
            Learn.
            <br />
            Question.
            <br />
            <span className="text-cyan-300">Build better.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Practical thinking from across Archon’s learning,
            consulting, product and global technology ecosystem.
          </p>
        </div>

        {insights.length === 0 ? (
          <section className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              Knowledge platform coming online
            </div>

            <h2 className="mt-5 text-3xl font-semibold">
              The first Archon Insights article is being prepared.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Articles published through the Archon CMS will appear
              here automatically.
            </p>
          </section>
        ) : (
          <section className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {insights.map((insight) => (
              <Link
                key={insight._id}
                href={`/insights/${insight.slug}`}
                className="group flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/[0.05]"
              >
                <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  {categoryLabels[insight.category] ??
                    insight.category}
                </div>

                <h2 className="mt-8 text-2xl font-semibold leading-tight">
                  {insight.title}
                </h2>

                <p className="mt-5 line-clamp-4 text-sm leading-7 text-slate-400">
                  {insight.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <div className="text-xs text-white">
                      {insight.authorName ?? "Archon"}
                    </div>

                    <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                      {formatDate(insight.publishedAt)}
                    </div>
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
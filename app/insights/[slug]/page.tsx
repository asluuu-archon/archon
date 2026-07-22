import {
  ArrowLeft,
  BookOpenText,
  Clock3,
  Share2,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableArticle from "@/components/insights/PortableArticle";
import { sanityClient } from "@/sanity/client";
import { insightBySlugQuery } from "@/sanity/queries";
import type { InsightArticle } from "@/sanity/types";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

function countPortableTextWords(
  body: InsightArticle["body"]
) {
  return body.reduce((total, block) => {
    if (
      block._type !== "block" ||
      !("children" in block) ||
      !Array.isArray(block.children)
    ) {
      return total;
    }

    const text = block.children
      .map((child) =>
        typeof child === "object" &&
        child !== null &&
        "text" in child &&
        typeof child.text === "string"
          ? child.text
          : ""
      )
      .join(" ");

    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

async function getArticle(slug: string) {
  return sanityClient.fetch<InsightArticle | null>(
    insightBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: [`insight-${slug}`, "insights"],
      },
    }
  );
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Archon",
    };
  }

  return {
    title:
      article.seoTitle ??
      `${article.title} | Archon Insights`,
    description:
      article.seoDescription ?? article.excerpt,

    openGraph: {
      title: article.seoTitle ?? article.title,
      description:
        article.seoDescription ?? article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.imageUrl
        ? [
            {
              url: article.imageUrl,
              alt: article.imageAlt ?? article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: InsightPageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const wordCount = countPortableTextWords(article.body);
  const readingTime = Math.max(
    2,
    Math.ceil(wordCount / 220)
  );

  return (
    <main className="min-h-screen bg-[#050816] pb-28 text-white">
      <header className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-12">
        {article.imageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.13] blur-sm"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/70 via-[#050816]/90 to-[#050816]" />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>

          <div className="mt-20 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
            <BookOpenText className="h-4 w-4" />

            {categoryLabels[article.category] ??
              article.category}
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-[1.03] md:text-7xl">
            {article.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            {article.excerpt}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
            <div>
              <div className="text-sm font-semibold text-white">
                {article.authorName ?? "Archon"}
              </div>

              <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Author
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-300">
                {formatDate(article.publishedAt)}
              </div>

              <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Published
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              {readingTime} min read
            </div>

            <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-500">
              <Share2 className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pt-16 lg:grid-cols-[minmax(0,760px)_280px]">
        <article>
          {article.body?.length > 0 ? (
            <PortableArticle value={article.body} />
          ) : (
            <p className="text-slate-400">
              This article does not contain any published body
              content yet.
            </p>
          )}
        </article>

        <aside className="h-fit rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.045] p-6 lg:sticky lg:top-28">
          <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Explore with Archon AI
          </div>

          <h2 className="mt-4 text-xl font-semibold text-white">
            Have a question about this article?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Open Archon AI and ask for clarification, related
            career guidance or additional practical examples.
          </p>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#031018]"
          >
            Ask Archon AI
          </button>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-[9px] uppercase tracking-[0.22em] text-slate-600">
                Topics
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
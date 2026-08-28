import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Users, ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { safeSanityFetch } from "@/lib/sanity.safe";
import { PROGRAM_BY_SLUG_QUERY, PROGRAMS_QUERY } from "@/lib/sanity.queries";
import { Program } from "@/lib/sanity.types";
import { displayProgramTitle } from "@/lib/program-titles";
import { absoluteUrl, siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const programs = await safeSanityFetch<Program[]>({
    query: PROGRAMS_QUERY,
    tags: ["program"],
    defaultValue: [],
  });

  return programs.map((program) => ({
    slug: program.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await safeSanityFetch<Program | null>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug },
    tags: [`program:${slug}`],
    defaultValue: null,
  });

  if (!program) {
    return {
      title: "Programme Not Found | Archon Solutions",
    };
  }

  const pathname = `/programs/${program.slug.current}`;
  const title = displayProgramTitle(program.title);

  return {
    title: `${title} | Archon Learning`,
    description: program.description,
    alternates: {
      canonical: absoluteUrl(pathname),
    },
    openGraph: {
      title: `${title} | Archon Learning`,
      description: program.description,
      url: absoluteUrl(pathname),
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await safeSanityFetch<Program | null>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug },
    tags: [`program:${slug}`],
    defaultValue: null,
  });

  if (!program) {
    notFound();
  }

  // AEO/SEO: Course Structured Data for Answer Engines
  const displayTitle = displayProgramTitle(program.title);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absoluteUrl(`/programs/${program.slug.current}`),
    "url": absoluteUrl(`/programs/${program.slug.current}`),
    "name": displayTitle,
    "description": program.description,
    "provider": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Archon Solutions",
      "sameAs": siteUrl
    },
    "educationalCredentialAwarded": program.outcome,
    "audience": {
      "@type": "Audience",
      "audienceType": program.audience
    },
    "timeRequired": program.duration
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Link
            href="/programs"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Programmes
          </Link>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:p-16">
            <div className="flex items-center gap-3 text-cyan-300">
              <div className="h-px w-8 bg-cyan-300/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">{program.pathwayEyebrow}</span>
            </div>
            
            <h1 className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {displayTitle}
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-slate-300 md:text-xl">
              {program.description}
            </p>

            <div className="mt-12 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Intended Outcome</h3>
                  <p className="mt-1 text-sm text-slate-400">{program.outcome}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Duration</h3>
                  <p className="mt-1 text-sm text-slate-400">{program.duration}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Designed For</h3>
                  <p className="mt-1 text-sm text-slate-400">{program.audience}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-16">
              <h2 className="text-2xl font-semibold text-white">Learning Pathway</h2>
              <p className="mt-4 text-slate-400">The step-by-step sequence to build real understanding and capability.</p>
              
              <div className="mt-12 space-y-8">
                {program.stages?.map((stage, index) => (
                  <div key={index} className="relative pl-10 md:pl-12">
                    <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-medium text-cyan-400 ring-1 ring-cyan-400/20">
                      {index + 1}
                    </div>
                    {index !== program.stages!.length - 1 && (
                      <div className="absolute bottom-[-24px] left-[11px] top-[32px] w-px bg-white/10" />
                    )}
                    <h3 className="text-lg font-medium text-white">{stage.title}</h3>
                    <p className="mt-2 text-slate-400">{stage.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Ready to start?</h3>
                <p className="mt-2 text-sm text-slate-400">Connect with an advisor to discuss your career path.</p>
              </div>
              <Link
                href="/#contact"
                className="group flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-all hover:bg-cyan-300"
              >
                Talk to an Advisor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

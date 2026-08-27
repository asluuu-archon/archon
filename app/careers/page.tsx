import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { safeSanityFetch } from "@/lib/sanity.safe";
import { CAREERS_QUERY } from "@/lib/sanity.queries";
import type { Career } from "@/lib/sanity.types";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers | Archon Solutions",
  description:
    "Explore current opportunities at Archon Solutions and help build practical technology, enterprise and career outcomes.",
  alternates: {
    canonical: absoluteUrl("/careers"),
  },
  openGraph: {
    title: "Careers | Archon Solutions",
    description:
      "Explore current opportunities at Archon Solutions and help build practical technology, enterprise and career outcomes.",
    url: absoluteUrl("/careers"),
  },
};

const employmentLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const workModeLabels: Record<NonNullable<Career["workMode"]>, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export default async function CareersPage() {
  const careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    tags: ["career"],
    defaultValue: [],
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-cyan-300">
                <div className="h-px w-8 bg-cyan-300/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Careers at Archon
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Build what makes
                <br />
                <span className="text-slate-400">progress possible.</span>
              </h1>

              <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl">
                We bring together people who care about practical learning,
                responsible technology and meaningful enterprise outcomes. If
                you want your work to improve how people and organisations
                move forward, we would like to hear from you.
              </p>
            </div>

            <aside className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-7">
              <Sparkles className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-5 text-xl font-semibold">A mission with range.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Learning, consulting, software, AI and community are not
                separate silos here. They are one connected ecosystem.
              </p>
            </aside>
          </section>

          <section aria-labelledby="open-roles" className="mt-20">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-300">Open roles</p>
                <h2 id="open-roles" className="mt-2 text-3xl font-semibold tracking-tight">
                  Find your next contribution.
                </h2>
              </div>
              <p className="text-sm text-slate-400">
                {careers.length === 0
                  ? "No active openings today"
                  : `${careers.length} active ${careers.length === 1 ? "opening" : "openings"}`}
              </p>
            </div>

            {careers.length > 0 ? (
              <div className="mt-6 space-y-4">
                {careers.map((career) => (
                  <Link
                    key={career._id}
                    href={`/careers/${career.slug.current}`}
                    className="group block rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.04] md:p-8"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                          <span>{career.department}</span>
                          {career.employmentType && (
                            <span className="rounded-full border border-white/10 px-3 py-1 text-slate-400">
                              {employmentLabels[career.employmentType] ?? career.employmentType}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200">
                          {career.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-slate-400">
                          {career.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400 lg:justify-end">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                          {career.location}
                        </span>
                        {career.workMode && (
                          <span className="inline-flex items-center gap-2">
                            <MonitorSmartphone className="h-4 w-4 text-cyan-300" />
                            {workModeLabels[career.workMode]}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-2 font-medium text-white">
                          View role
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:grid-cols-[auto_1fr] md:items-start md:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">There are no published roles right now.</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
                    We are always interested in thoughtful people who can add
                    real value. Share your profile and the kind of work you do;
                    our team will keep it in mind as the next opportunity opens.
                  </p>
                  <Link
                    href="/#contact"
                    className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
                  >
                    Introduce Yourself
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

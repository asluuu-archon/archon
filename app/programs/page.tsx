import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Code2, BarChart3, CloudCog } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { safeSanityFetch } from "@/lib/sanity.safe";
import { PROGRAMS_QUERY } from "@/lib/sanity.queries";
import { Program } from "@/lib/sanity.types";
import { displayProgramTitle } from "@/lib/program-titles";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learning Programmes | Archon Solutions",
  description:
    "Explore mentorship-led pathways in SAP, software engineering, data analytics and cloud infrastructure.",
  alternates: {
    canonical: absoluteUrl("/programs"),
  },
  openGraph: {
    title: "Learning Programmes | Archon Solutions",
    description:
      "Explore mentorship-led pathways in SAP, software engineering, data analytics and cloud infrastructure.",
    url: absoluteUrl("/programs"),
  },
};

// Use the same icons as the homepage scene for consistency
const icons = [BrainCircuit, Code2, BarChart3, CloudCog];

export default async function ProgramsIndexPage() {
  const programs = await safeSanityFetch<Program[]>({
    query: PROGRAMS_QUERY,
    tags: ["program"],
    defaultValue: [],
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-cyan-300">
              <div className="h-px w-8 bg-cyan-300/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Learning</span>
            </div>
            
            <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Learn by building.<br />
              <span className="text-slate-400">Grow through outcomes.</span>
            </h1>
            
            <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl">
              Archon programs combine direction, practical learning, mentorship, project exposure and career preparation. We believe real understanding builds a career.
            </p>
          </div>

          {programs.length > 0 ? (
            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {programs.map((program, index) => {
                const Icon = icons[index % icons.length];
                
                return (
                  <Link
                    key={program._id}
                    href={`/programs/${program.slug.current}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.04]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                          <Icon className="h-6 w-6 text-cyan-300" />
                        </div>
                        
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-300">
                          {program.label}
                        </div>
                      </div>
                      
                      <h2 className="mt-8 text-2xl font-semibold text-white">
                        {displayProgramTitle(program.title)}
                      </h2>
                      
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        {program.description}
                      </p>
                    </div>
                    
                    <div className="relative z-10 mt-12 flex items-center gap-2 text-sm font-medium text-cyan-300">
                      Explore programme
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.02] p-12 text-center">
              <h3 className="text-xl font-medium text-white">Programmes are being updated</h3>
              <p className="mt-4 text-slate-400">Please check back shortly to view our learning pathways.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

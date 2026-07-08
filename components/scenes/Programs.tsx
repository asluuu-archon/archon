import {
  BarChart3,
  BrainCircuit,
  CloudCog,
  Code2,
} from "lucide-react";

import { programs } from "@/data/home";
import GlowCard from "@/components/ui/GlowCard";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const icons = [BrainCircuit, Code2, BarChart3, CloudCog];

export default function Programs() {
  return (
    <section id="learning" className="relative overflow-hidden bg-[#050816] py-40">
      <SectionBackground word="LEARNING" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="PROGRAMS"
          title={"Learn by building.\nGrow through outcomes."}
          description="Archon programs are designed around real-world skills, project exposure, mentorship and career transformation."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {programs.map((program, index) => {
            const Icon = icons[index] ?? BrainCircuit;

            return (
              <GlowCard key={program.title} delay={index * 0.08}>
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="h-10 w-10 text-cyan-300 transition duration-300 group-hover:scale-110" />

                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
                    {program.label}
                  </div>
                </div>

                <h3 className="text-3xl font-semibold text-white">
                  {program.title}
                </h3>

                <p className="mt-5 max-w-xl leading-7 text-slate-300">
                  {program.description}
                </p>

                <div className="mt-auto pt-10 text-sm font-semibold tracking-wide text-cyan-300">
                  Explore path →
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
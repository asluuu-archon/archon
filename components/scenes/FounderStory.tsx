import { Quote } from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import GlowCard from "@/components/ui/GlowCard";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const founderLines = [
  "I was not a topper.",
  "I studied mainly to pass exams.",
  "After college, I realised marks did not teach me how the real industry works.",
  "That struggle became the reason Archon exists.",
];

const beliefs = [
  "Average marks should not define someone’s future.",
  "Technology should be learned through real business problems.",
  "Certificates matter less than real understanding.",
  "Students should dream first, then build the skill to reach there.",
];

export default function FounderStory() {
  return (
    <CinematicSection id="founder" glow="left">
      <SectionBackground word="FOUNDER" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="FOUNDER STORY"
          title={"I was not a topper.\nThat became the reason Archon exists."}
          description="Archon was built from a deeply personal realization: students need more than marks, certificates and theory. They need basics, business understanding, mentorship, confidence and real-world exposure."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <GlowCard className="min-h-[560px]">
            <Quote className="mb-10 h-12 w-12 text-cyan-300/70" />

            <div className="space-y-7">
              {founderLines.map((line) => (
                <p
                  key={line}
                  className="text-3xl font-semibold leading-tight text-white md:text-4xl"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Mohamed Aslam
              </div>
              <div className="mt-3 text-slate-400">Founder, Archon</div>
            </div>
          </GlowCard>

          <div className="grid gap-5">
            {beliefs.map((belief, index) => (
              <GlowCard
                key={belief}
                delay={index * 0.08}
                className="min-h-[130px]"
              >
                <div className="flex items-start gap-5">
                  <div className="text-sm font-semibold tracking-[0.3em] text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="text-xl font-semibold leading-8 text-white">
                    {belief}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
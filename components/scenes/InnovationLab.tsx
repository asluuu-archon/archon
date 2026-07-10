"use client";

import {
  Cpu,
  Bot,
  Video,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import CircuitGrid from "@/components/effects/CircuitGrid";

const products = [
  {
    icon: Bot,
    name: "SAP Guru Assistant",
    status: "ONLINE",
    description:
      "AI-powered SAP mentor capable of answering questions, analysing certificates, replying to social media and guiding learners.",
  },
  {
    icon: Cpu,
    name: "AI Command Center",
    status: "BUILDING",
    description:
      "Business intelligence, automation, analytics and communication platform powering the Archon ecosystem.",
  },
  {
    icon: Video,
    name: "ArchRoom",
    status: "PROTOTYPE",
    description:
      "Next-generation collaboration platform designed first for the Archon community.",
  },
  {
    icon: Activity,
    name: "Future Labs",
    status: "R&D",
    description:
      "Where tomorrow's products are imagined, prototyped and launched.",
  },
];

export default function InnovationLab() {
  return (
    <CinematicSection id="innovation" glow="center">
        <CircuitGrid />
      <SectionBackground word="LAB" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="INNOVATION LAB"
          title={"We don't just adapt\nto the future.\nWe build it."}
          description="Beyond consulting and learning, Archon is building products, AI systems and platforms that solve real business problems."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}

          <div className="grid gap-6 md:grid-cols-2">

            {products.map((product, index) => {

              const Icon = product.icon;

              return (

                <GlowCard key={product.name} delay={index * 0.08}>

                  <div className="flex items-center justify-between">

                    <Icon className="h-10 w-10 text-cyan-300" />

                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-300">

                      {product.status}

                    </span>

                  </div>

                  <h3 className="mt-8 text-3xl font-semibold text-white">

                    {product.name}

                  </h3>

                  <p className="mt-5 leading-7 text-slate-300">

                    {product.description}

                  </p>

                  <div className="mt-10 flex items-center gap-2 text-cyan-300">

                    Explore

                    <ArrowUpRight size={18} />

                  </div>

                </GlowCard>

              );

            })}

          </div>

          {/* RIGHT PANEL */}

          <GlowCard>

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-semibold text-white">

                LIVE STATUS

              </h3>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs uppercase tracking-[0.3em] text-green-400">

                  ONLINE

                </span>

              </div>

            </div>

            <div className="mt-12 space-y-10">

              <Metric
                number="7,000+"
                label="Students Guided"
              />

              <Metric
                number="4"
                label="Countries Connected"
              />

              <Metric
                number="24/7"
                label="AI Availability"
              />

              <Metric
                number="∞"
                label="Ideas Being Built"
              />

            </div>

          </GlowCard>

        </div>

      </div>

    </CinematicSection>
  );
}

function Metric({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div>

      <div className="text-5xl font-black text-cyan-300">

        {number}

      </div>

      <div className="mt-2 uppercase tracking-[0.25em] text-xs text-slate-400">

        {label}

      </div>

    </div>
  );
}
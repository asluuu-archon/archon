"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Code2,
  Compass,
  Radio,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";


import CinematicSection from "@/components/ui/CinematicSection";
import CircuitGrid from "@/components/effects/CircuitGrid";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import SAPIndependenceDisclosure from "@/components/ui/SAPIndependenceDisclosure";
import { programs as fallbackProgramCards } from "@/Data/home";

const icons = [BrainCircuit, Code2, BarChart3, CloudCog];

const pathwayData = [
  {
    eyebrow: "Mentorship-led pathway",
    outcome: "SAP and enterprise career readiness",
    duration: "Outcome focused",
    audience: "Graduates and career switchers",
    stages: [
      {
        title: "Career Direction",
        text: "Understand the right pathway based on background, interest and long-term goals.",
      },
      {
        title: "Strong Fundamentals",
        text: "Build practical understanding before moving into tools, systems and complex scenarios.",
      },
      {
        title: "Business Scenarios",
        text: "Learn through realistic enterprise processes instead of theory-only sessions.",
      },
      {
        title: "Project Exposure",
        text: "Apply knowledge through guided assignments, projects and implementation-style exercises.",
      },
      {
        title: "Industry Readiness",
        text: "Develop interview confidence, communication and clarity for real opportunities.",
      },
    ],
  },
  {
    eyebrow: "Engineering pathway",
    outcome: "Production-ready software capability",
    duration: "Project driven",
    audience: "Students and aspiring developers",
    stages: [
      {
        title: "Programming Foundation",
        text: "Develop logical thinking, coding fundamentals and confidence with modern development tools.",
      },
      {
        title: "Application Development",
        text: "Build complete applications using current frontend, backend and database technologies.",
      },
      {
        title: "Engineering Practices",
        text: "Work with version control, testing, APIs, deployment and collaborative development.",
      },
      {
        title: "Portfolio Projects",
        text: "Create practical projects that demonstrate real capability beyond course completion.",
      },
      {
        title: "Developer Readiness",
        text: "Prepare for technical discussions, coding evaluations and project-based roles.",
      },
    ],
  },
  {
    eyebrow: "Intelligence pathway",
    outcome: "Data and AI problem-solving capability",
    duration: "Hands-on learning",
    audience: "Analysts and technology learners",
    stages: [
      {
        title: "Data Foundation",
        text: "Understand data structures, analysis principles and how organisations use information.",
      },
      {
        title: "Analytics Practice",
        text: "Build reports, dashboards and insights around meaningful business questions.",
      },
      {
        title: "AI Fundamentals",
        text: "Learn machine learning and AI concepts through practical, understandable examples.",
      },
      {
        title: "Applied Projects",
        text: "Use datasets and AI tools to solve realistic analytical and automation problems.",
      },
      {
        title: "Business Intelligence",
        text: "Translate data into decisions, recommendations and measurable outcomes.",
      },
    ],
  },
  {
    eyebrow: "Infrastructure pathway",
    outcome: "Modern cloud and operations readiness",
    duration: "Industry aligned",
    audience: "Infrastructure and security learners",
    stages: [
      {
        title: "Infrastructure Basics",
        text: "Build strong understanding of systems, networking and modern computing environments.",
      },
      {
        title: "Cloud Platforms",
        text: "Learn how workloads, storage, networking and services operate in cloud environments.",
      },
      {
        title: "DevOps Workflow",
        text: "Practice automation, CI/CD, containers and reliable deployment processes.",
      },
      {
        title: "Security Awareness",
        text: "Understand access, risk, monitoring and resilient infrastructure practices.",
      },
      {
        title: "Operations Readiness",
        text: "Develop the ability to support modern platforms and technology operations.",
      },
    ],
  },
];

import { Program } from "@/lib/sanity.types";

const fallbackPrograms: Program[] = pathwayData.map((pathway, index) => {
  const card = fallbackProgramCards[index];

  return {
    _id: `fallback-program-${index + 1}`,
    _type: "program",
    slug: {
      current: card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    },
    title: card.title,
    description: card.description,
    label: card.label,
    pathwayEyebrow: pathway.eyebrow,
    outcome: pathway.outcome,
    duration: pathway.duration,
    audience: pathway.audience,
    stages: pathway.stages,
    displayOrder: (index + 1) * 10,
  };
});

export default function Programs({ programs }: { programs?: Program[] }) {
  const programList = programs?.length ? programs : fallbackPrograms;
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = Math.min(activeIndex, Math.max(programList.length - 1, 0));
  const activeProgram = programList[selectedIndex];
  const activePathway = pathwayData[selectedIndex] ?? pathwayData[0];
  const ActiveIcon = icons[selectedIndex] ?? BrainCircuit;
  const progressWidth = programList.length
    ? `${((selectedIndex + 1) / programList.length) * 100}%`
    : "0%";

  if (!activeProgram) return null;

  return (
    <CinematicSection id="learning" glow="right">
      <CircuitGrid />
      <HolographicField />
      <SectionBackground word="LEARNING" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6">
        <SectionHeader
          eyebrow="PROGRAMS"
          title={"Learn by building.\nGrow through outcomes."}
          description="Archon programs combine direction, practical learning, mentorship, project exposure and career preparation."
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-4">
            {programList.map((program, index) => {
              const Icon = icons[index] ?? BrainCircuit;
              const active = activeIndex === index;

              return (
                <motion.button
                  key={program.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ x: 6 }}
                  className={`group w-full rounded-[1.8rem] border p-6 text-left transition-all duration-300 ${
                    active
                      ? "border-cyan-300/45 bg-cyan-300/[0.09] shadow-[0_0_55px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-13 w-13 items-center justify-center rounded-2xl border p-3 ${
                          active
                            ? "border-cyan-300/35 bg-cyan-300/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      <div>
                        <div className="text-[10px] uppercase tracking-[0.27em] text-cyan-300">
                          {program.label}
                        </div>

                        <div className="mt-2 text-xl font-semibold text-white">
                          {program.title}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`mt-3 h-2.5 w-2.5 rounded-full ${
                        active
                          ? "animate-pulse bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    {program.description}
                  </p>
                </motion.button>
              );
            })}

            <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  Pathway navigation
                </div>

                <div className="font-mono text-xs text-cyan-300">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(programList.length).padStart(2, "0")}
                </div>
              </div>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-white"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.8rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_130px_rgba(34,211,238,0.1)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
              <div className="flex items-center gap-3">
                <Compass className="h-4 w-4 text-cyan-300" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                  Career Path Engine
                </span>
              </div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Pathway active
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram.title}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                className="p-7 md:p-10"
              >
                <div className="grid gap-9 lg:grid-cols-[1fr_0.95fr]">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                        <ActiveIcon className="h-8 w-8 text-cyan-300" />
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                        <Radio className="h-4 w-4" />
                        {activeProgram.label}
                      </div>
                    </div>

                    <div className="mt-8 text-xs uppercase tracking-[0.34em] text-cyan-300">
                      {activeProgram.pathwayEyebrow || activePathway.eyebrow}
                    </div>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                      {activeProgram.title}
                    </h3>

                    <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                      {activeProgram.description}
                    </p>

                    <div className="mt-9 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-5">
                        <Target className="h-5 w-5 text-cyan-300" />

                        <div className="mt-4 text-[9px] uppercase tracking-[0.25em] text-slate-500">
                          Intended outcome
                        </div>

                        <div className="mt-2 font-semibold text-white">
                          {activeProgram.outcome || activePathway.outcome}
                        </div>
                      </div>

                      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-5">
                        <Users className="h-5 w-5 text-cyan-300" />

                        <div className="mt-4 text-[9px] uppercase tracking-[0.25em] text-slate-500">
                          Designed for
                        </div>

                        <div className="mt-2 font-semibold text-white">
                          {activeProgram.audience || activePathway.audience}
                        </div>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="group mt-6 flex w-full items-center justify-between rounded-[1.6rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 text-left transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.1]"
                    >
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.25em] text-cyan-300">
                          Explore pathway
                        </div>

                        <div className="mt-2 text-lg font-semibold text-white">
                          Build your learning journey
                        </div>
                      </div>

                      <ArrowUpRight className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020611] p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_54%)]" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                          Outcome sequence
                        </div>

                        <Rocket className="h-5 w-5 text-cyan-300" />
                      </div>

                      <div className="relative mt-8">
                        <div className="absolute bottom-5 left-[17px] top-5 w-px bg-white/10" />

                        <motion.div
                          key={`${activeProgram.title}-line`}
                          initial={{ height: 0 }}
                          animate={{ height: "calc(100% - 40px)" }}
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute left-[17px] top-5 w-px bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent"
                        />

                        <div className="space-y-4">
                          {activeProgram.stages?.map((stage, index) => (
                            <motion.div
                              key={stage.title}
                              initial={{ opacity: 0, x: 22 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.12 + index * 0.13,
                              }}
                              className="relative flex gap-4"
                            >
                              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-[#07111f] text-[10px] font-semibold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.22)]">
                                {String(index + 1).padStart(2, "0")}
                              </div>

                              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />

                                  <div className="text-sm font-semibold text-white">
                                    {stage.title}
                                  </div>
                                </div>

                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                  {stage.text}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5 text-cyan-300" />

                          <div>
                            <div className="text-[9px] uppercase tracking-[0.28em] text-cyan-300">
                              Learning model
                            </div>

                            <div className="mt-2 font-semibold text-white">
                              {activeProgram.duration || activePathway.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
                </div>

        <div className="mt-6">
          <SAPIndependenceDisclosure variant="compact" />
        </div>
      </div>
    </CinematicSection>

  );
}
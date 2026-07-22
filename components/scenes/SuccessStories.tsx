"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Radio,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { successStories } from "@/data/home";
import CinematicSection from "@/components/ui/CinematicSection";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const icons = [GraduationCap, TrendingUp, Globe2];

const journeys = [
  {
    id: "learner",
    eyebrow: "Learner Transformation",
    title: "From uncertainty to real-world confidence.",
    description:
      "Archon focuses on practical understanding, project exposure and mentorship so learners leave with stronger skills and clearer direction.",
    status: "Growing",
    highlight: "7,000+",
    highlightLabel: "Learners skilled",
    destination: "Global technology careers",
    steps: [
      "Career direction",
      "Practical learning",
      "Project exposure",
      "Mentorship",
      "Industry readiness",
    ],
  },
  {
    id: "first-student",
    eyebrow: "The First Journey",
    title: "One student became proof that the belief could work.",
    description:
      "Jimmy, Archon’s first student, went on to build an international consulting career in Switzerland.",
    status: "Milestone",
    highlight: "1st",
    highlightLabel: "Student journey",
    destination: "Consulting career in Switzerland",
    steps: [
      "First classroom",
      "Strong fundamentals",
      "Career development",
      "International exposure",
      "Consulting success",
    ],
  },
  {
    id: "global",
    eyebrow: "Global Expansion",
    title: "A Kerala beginning became a global ecosystem.",
    description:
      "Archon expanded across India, Belgium, Australia and the United Kingdom through learning, consulting and technology opportunities.",
    status: "Connected",
    highlight: "4",
    highlightLabel: "Global locations",
    destination: "One connected Archon ecosystem",
    steps: [
      "Kerala",
      "Belgium",
      "United Kingdom",
      "Sydney",
      "Global ecosystem",
    ],
  },
];

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeJourney = journeys[activeIndex];
  const ActiveIcon = icons[activeIndex] ?? Sparkles;

  const activeStat = useMemo(
    () => successStories[activeIndex] ?? successStories[0],
    [activeIndex]
  );

  return (
    <CinematicSection id="stories" glow="center">
      <HolographicField />
      <SectionBackground word="IMPACT" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6">
        <SectionHeader
          eyebrow="SUCCESS STORIES"
          title={
            "We may not promise jobs to everyone.\nBut we promise skill, direction and honest effort."
          }
          description="Impact is not measured only by placements. It is measured by confidence gained, careers redirected, skills built and opportunities created."
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            {successStories.map((story, index) => {
              const Icon = icons[index] ?? Sparkles;
              const active = activeIndex === index;

              return (
                <motion.button
                  key={story.title}
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
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          active
                            ? "border-cyan-300/30 bg-cyan-300/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      <div>
                        <div className="text-3xl font-black text-cyan-300">
                          {story.number}
                        </div>

                        <div className="mt-1 font-semibold text-white">
                          {story.title}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`mt-2 h-2.5 w-2.5 rounded-full ${
                        active
                          ? "animate-pulse bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    {story.text}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[2.8rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_130px_rgba(34,211,238,0.1)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
              <div className="flex items-center gap-3">
                <Radio className="h-4 w-4 text-cyan-300" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                  Impact Transmission
                </span>
              </div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Story active
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeJourney.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                className="p-7 md:p-10"
              >
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                        <ActiveIcon className="h-8 w-8 text-cyan-300" />
                      </div>

                      <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.23em] text-cyan-300">
                        {activeJourney.status}
                      </div>
                    </div>

                    <div className="mt-8 text-xs uppercase tracking-[0.35em] text-cyan-300">
                      {activeJourney.eyebrow}
                    </div>

                    <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                      {activeJourney.title}
                    </h3>

                    <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                      {activeJourney.description}
                    </p>

                    <div className="mt-9 flex items-end gap-5">
                      <div className="text-6xl font-black text-cyan-300 md:text-7xl">
                        {activeJourney.highlight}
                      </div>

                      <div className="pb-2 text-xs uppercase tracking-[0.26em] text-slate-500">
                        {activeJourney.highlightLabel}
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#020611] p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_54%)]" />

                    <div className="relative z-10">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                        Journey progression
                      </div>

                      <div className="relative mt-8">
                        <div className="absolute bottom-5 left-[17px] top-5 w-px bg-white/10" />

                        <motion.div
                          key={`${activeJourney.id}-line`}
                          initial={{ height: 0 }}
                          animate={{ height: "calc(100% - 40px)" }}
                          transition={{
                            duration: 1.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute left-[17px] top-5 w-px bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent"
                        />

                        <div className="space-y-5">
                          {activeJourney.steps.map((step, index) => (
                            <motion.div
                              key={step}
                              initial={{ opacity: 0, x: 22 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15 + index * 0.13,
                              }}
                              className="relative flex items-center gap-5"
                            >
                              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-[#07111f] text-[10px] font-semibold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.22)]">
                                {String(index + 1).padStart(2, "0")}
                              </div>

                              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">
                                <div className="text-sm font-semibold text-white">
                                  {step}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5"
                      >
                        <div className="text-[9px] uppercase tracking-[0.28em] text-cyan-300">
                          Destination
                        </div>

                        <div className="mt-2 text-base font-semibold text-white">
                          {activeJourney.destination}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-6">
                    <div className="text-3xl font-black text-cyan-300">
                      {activeStat.number}
                    </div>

                    <div className="mt-2 text-[10px] uppercase tracking-[0.23em] text-slate-500">
                      Verified impact
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-6">
                    <BriefcaseBusiness className="h-6 w-6 text-cyan-300" />

                    <div className="mt-5 text-lg font-semibold text-white">
                      Career outcomes
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Built through skill and direction
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="group flex items-center justify-between rounded-[1.7rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 text-left transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.1]"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                        Next journey
                      </div>

                      <div className="mt-3 text-lg font-semibold text-white">
                        Yours could begin here
                      </div>
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
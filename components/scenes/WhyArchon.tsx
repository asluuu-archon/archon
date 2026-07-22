"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Radio,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";

const principles = [
  {
    id: "understanding",
    number: "01",
    title: "Understanding before certification.",
    shortTitle: "Understanding",
    icon: BrainCircuit,
    statement:
      "Certificates may open a conversation. Real understanding builds a career.",
    description:
      "Archon was created around a simple belief: learners should understand how technology solves real business problems, not merely memorise content for an examination.",
    outcomes: [
      "Strong conceptual foundation",
      "Business-process understanding",
      "Confidence beyond course completion",
    ],
  },
  {
    id: "practice",
    number: "02",
    title: "Practice before confidence.",
    shortTitle: "Practice",
    icon: BookOpenCheck,
    statement:
      "Confidence is not taught. It is built through repeated practical exposure.",
    description:
      "Learners work through scenarios, assignments, tools and project-style exercises so knowledge gradually becomes usable capability.",
    outcomes: [
      "Hands-on system exposure",
      "Scenario-based learning",
      "Project-oriented preparation",
    ],
  },
  {
    id: "mentorship",
    number: "03",
    title: "Direction before speed.",
    shortTitle: "Direction",
    icon: Target,
    statement:
      "Moving quickly in the wrong direction does not create meaningful progress.",
    description:
      "Career guidance, mentorship and honest feedback help learners choose a practical path based on their background, strengths and ambitions.",
    outcomes: [
      "Clearer career direction",
      "Realistic learning pathway",
      "Experienced mentor support",
    ],
  },
  {
    id: "industry",
    number: "04",
    title: "Industry before theory.",
    shortTitle: "Industry",
    icon: BriefcaseBusiness,
    statement:
      "Technology becomes meaningful only when it is connected to real work.",
    description:
      "Archon brings consulting experience, enterprise processes and technology delivery into the learning environment.",
    outcomes: [
      "Enterprise context",
      "Consulting-oriented thinking",
      "Real-world problem solving",
    ],
  },
  {
    id: "ambition",
    number: "05",
    title: "Ambition with execution.",
    shortTitle: "Execution",
    icon: Rocket,
    statement:
      "Dreaming matters. Building the capability to reach the dream matters more.",
    description:
      "The Archon ecosystem connects learning, consulting, products, mentorship and innovation so ambition can gradually become measurable outcome.",
    outcomes: [
      "Skill development",
      "Career readiness",
      "Long-term growth mindset",
    ],
  },
];

const manifestoLines = [
  "We do not believe marks should define a future.",
  "We do not believe certificates alone create capability.",
  "We believe understanding creates confidence.",
  "We believe practice creates readiness.",
  "We believe mentorship creates direction.",
  "We believe ordinary beginnings can produce extraordinary journeys.",
];

export default function WhyArchon() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manifestoIndex, setManifestoIndex] = useState(0);

  const activePrinciple = useMemo(
    () => principles[activeIndex] ?? principles[0],
    [activeIndex]
  );

  const ActiveIcon = activePrinciple.icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setManifestoIndex(
        (current) => (current + 1) % manifestoLines.length
      );
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <CinematicSection id="problem" glow="left">
      <HolographicField />
      <SectionBackground word="WHY" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300"
            >
              Why Archon Exists
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-5xl text-balance text-5xl font-bold leading-[1.04] text-white md:text-7xl"
            >
              Certificates don’t build careers.
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                Real understanding does.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.045] p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <Radio className="h-4 w-4 text-cyan-300" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                Archon Manifesto
              </span>
            </div>

            <div className="mt-6 min-h-[88px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={manifestoIndex}
                  initial={{
                    opacity: 0,
                    y: 16,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -16,
                    filter: "blur(6px)",
                  }}
                  transition={{ duration: 0.45 }}
                  className="text-xl font-semibold leading-8 text-white"
                >
                  {manifestoLines[manifestoIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex gap-2">
              {manifestoLines.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`View manifesto line ${index + 1}`}
                  onClick={() => setManifestoIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    manifestoIndex === index
                      ? "w-8 bg-cyan-300"
                      : "w-3 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const active = activeIndex === index;

              return (
                <motion.button
                  key={principle.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ x: 6 }}
                  className={`group w-full rounded-[1.7rem] border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-cyan-300/45 bg-cyan-300/[0.09] shadow-[0_0_50px_rgba(34,211,238,0.11)]"
                      : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          active
                            ? "border-cyan-300/35 bg-cyan-300/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      <div>
                        <div className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">
                          {principle.number}
                        </div>

                        <div className="mt-1 text-lg font-semibold text-white">
                          {principle.shortTitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active
                          ? "animate-pulse bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}

            <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
              <div className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
                The founding belief
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Students need more than information. They need direction,
                exposure, mentorship and a chance to build confidence through
                real understanding.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.8rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_130px_rgba(34,211,238,0.1)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-cyan-300" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                  Founding Principle
                </span>
              </div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Belief active
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePrinciple.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                className="p-7 md:p-10"
              >
                <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                        <ActiveIcon className="h-8 w-8 text-cyan-300" />
                      </div>

                      <div className="text-5xl font-black text-cyan-300/30 md:text-7xl">
                        {activePrinciple.number}
                      </div>
                    </div>

                    <div className="mt-8 text-xs uppercase tracking-[0.34em] text-cyan-300">
                      Archon Principle
                    </div>

                    <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                      {activePrinciple.title}
                    </h3>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-cyan-100">
                      “{activePrinciple.statement}”
                    </p>

                    <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                      {activePrinciple.description}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020611] p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.17),transparent_55%)]" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                          What this creates
                        </span>

                        <GraduationCap className="h-5 w-5 text-cyan-300" />
                      </div>

                      <div className="mt-8 space-y-4">
                        {activePrinciple.outcomes.map((outcome, index) => (
                          <motion.div
                            key={outcome}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.12 + index * 0.14,
                            }}
                            className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
                              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                            </div>

                            <span className="font-semibold text-white">
                              {outcome}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-7 rounded-[1.6rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5"
                      >
                        <div className="flex items-center gap-4">
                          <ArrowDownRight className="h-6 w-6 text-cyan-300" />

                          <div>
                            <div className="text-[9px] uppercase tracking-[0.27em] text-cyan-300">
                              The result
                            </div>

                            <div className="mt-2 text-lg font-semibold text-white">
                              Capability with confidence
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {[
            {
              value: "Real",
              label: "Business understanding",
            },
            {
              value: "Practical",
              label: "Technology capability",
            },
            {
              value: "Honest",
              label: "Career direction",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
            >
              <div className="text-2xl font-black text-cyan-300">
                {item.value}
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </CinematicSection>
  );
}
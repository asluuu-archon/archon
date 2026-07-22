"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Globe2,
  GraduationCap,
  Quote,
  Rocket,
  Sparkles,
  UserRound,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import FounderProfiles from "@/components/ui/FounderProfiles";

const milestones = [
  {
    id: "beginning",
    year: "Before Archon",
    title: "An average student searching for direction.",
    description:
      "I was not a topper. I studied mainly to pass examinations, and after college I realised that marks had not taught me how the real industry worked.",
    icon: GraduationCap,
  },
  {
    id: "archon",
    year: "2013",
    title: "Archon began in one small room.",
    description:
      "Archon started in Kerala with one founder, one student and one belief: learning should prepare people for real work, not merely examinations.",
    icon: Rocket,
  },
  {
    id: "jimmy",
    year: "First Student",
    title: "Jimmy became the first proof of the belief.",
    description:
      "Archon’s first student went on to build an international consulting career in Switzerland—showing what strong fundamentals and direction can create.",
    icon: UserRound,
  },
  {
    id: "global",
    year: "Global Journey",
    title: "Kerala expanded into Belgium, the UK and Sydney.",
    description:
      "Learning, consulting and technology opportunities gradually took Archon beyond India and created a connected international ecosystem.",
    icon: Globe2,
  },
  {
    id: "future",
    year: "The Future",
    title: "A new campus, products and thousands of new journeys.",
    description:
      "Today, Archon is building a 15,000 sq ft campus, AI platforms and new opportunities for learners, consultants, businesses and future founders.",
    icon: Building2,
  },
];

const founderMetrics = [
  {
    value: "18+",
    label: "Years in SAP and technology",
  },
  {
    value: "7,000+",
    label: "Learners influenced",
  },
  {
    value: "4",
    label: "Global locations",
  },
];

export default function StoryScroller() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMilestone = milestones[activeIndex];
  const ActiveIcon = activeMilestone.icon;

  return (
    <CinematicSection id="founder" glow="left">
      <HolographicField />
      <SectionBackground word="FOUNDER" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6">
        <div className="grid items-start gap-12 xl:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="xl:sticky xl:top-32"
          >
            <div className="relative overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-white/[0.035] p-3 shadow-[0_0_130px_rgba(34,211,238,0.1)] backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] bg-[#07111f]">
                <motion.div
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/mohamed-aslam.jpg"
                    alt="Mohamed Aslam, founder of Archon"
                    fill
                    priority={false}
                    className="object-cover object-top"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/15 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/[0.04] via-transparent to-transparent" />

                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 px-4 py-2 backdrop-blur-xl">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,1)]" />

                  <span className="text-[9px] uppercase tracking-[0.28em] text-cyan-300">
                    Founder Story
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-black/55 p-6 backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                    Mohamed Aslam
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-white">
                    Founder, Archon
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    SAP Architect · Educator · Entrepreneur
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.055] p-7 backdrop-blur-xl"
            >
              <Quote className="h-8 w-8 text-cyan-300" />

              <p className="mt-6 text-2xl font-semibold leading-9 text-white">
                “Average marks should never decide how extraordinary someone’s
                future can become.”
              </p>

              <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                The belief behind Archon
              </div>
            </motion.div>

            <FounderProfiles />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300"
            >
              Founder
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
              className="mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.04] text-white md:text-7xl"
            >
              The struggle became
              <br />

              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                the reason to build.
              </span>
            </motion.h2>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Archon was not created from a perfect academic journey. It was
              created from the realisation that learners need understanding,
              mentorship, practical exposure and confidence—not merely marks
              and certificates.
            </p>

            <div className="mt-12 grid gap-3 sm:grid-cols-5">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const active = activeIndex === index;

                return (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                      active
                        ? "border-cyan-300/45 bg-cyan-300/[0.1] shadow-[0_0_40px_rgba(34,211,238,0.1)]"
                        : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-cyan-300" />

                      <span
                        className={`h-2 w-2 rounded-full ${
                          active
                            ? "animate-pulse bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,1)]"
                            : "bg-white/20"
                        }`}
                      />
                    </div>

                    <div className="mt-4 text-[9px] uppercase tracking-[0.22em] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-2 text-xs font-semibold text-white">
                      {milestone.year}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-7 overflow-hidden rounded-[2.8rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_120px_rgba(34,211,238,0.09)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-cyan-300" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                    Founder Journey
                  </span>
                </div>

                <div className="font-mono text-[10px] text-cyan-300">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(milestones.length).padStart(2, "0")}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.id}
                  initial={{
                    opacity: 0,
                    y: 28,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="p-7 md:p-10"
                >
                  <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                      <ActiveIcon className="h-8 w-8 text-cyan-300" />
                    </div>

                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-[0.34em] text-cyan-300">
                        {activeMilestone.year}
                      </div>

                      <h3 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                        {activeMilestone.title}
                      </h3>

                      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                        {activeMilestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 h-px overflow-hidden bg-white/10">
                    <motion.div
                      key={`${activeMilestone.id}-progress`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          ((activeIndex + 1) / milestones.length) * 100
                        }%`,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-white"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-7 grid gap-4 sm:grid-cols-3"
            >
              {founderMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
                >
                  <div className="text-3xl font-black text-cyan-300">
                    {item.value}
                  </div>

                  <div className="mt-3 text-[10px] uppercase tracking-[0.23em] text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <a
              href="#journey"
              className="group mt-7 flex items-center justify-between rounded-[1.8rem] border border-cyan-300/20 bg-cyan-300/[0.055] p-6 transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.1]"
            >
              <div>
                <div className="text-[9px] uppercase tracking-[0.27em] text-cyan-300">
                  Continue the story
                </div>

                <div className="mt-2 text-lg font-semibold text-white">
                  Explore the Archon journey
                </div>
              </div>

              <ArrowUpRight className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}


"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  MessageSquareMore,
  Rocket,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const campusSpaces = [
  {
    id: "learning",
    number: "01",
    title: "Learning Studios",
    shortTitle: "Learning",
    description:
      "Technology classrooms designed around business scenarios, practical exercises and collaborative learning.",
    position: "left-[29%] top-[42%]",
    icon: GraduationCap,
  },
  {
    id: "mentorship",
    number: "02",
    title: "Mentorship Lounge",
    shortTitle: "Mentorship",
    description:
      "Dedicated spaces where learners can interact with consultants, trainers and industry professionals.",
    position: "left-[66%] top-[43%]",
    icon: MessageSquareMore,
  },
  {
    id: "innovation",
    number: "03",
    title: "AI & Innovation Lab",
    shortTitle: "Innovation",
    description:
      "A product-building environment for AI, automation, software engineering and emerging technologies.",
    position: "left-[38%] top-[22%]",
    icon: BrainCircuit,
  },
  {
    id: "entrepreneurship",
    number: "04",
    title: "Startup & Product Floor",
    shortTitle: "Entrepreneurship",
    description:
      "A collaborative space where ideas can be validated, prototypes can be built and new ventures can begin.",
    position: "left-[74%] top-[20%]",
    icon: Rocket,
  },
  {
    id: "consulting",
    number: "05",
    title: "Consulting Studio",
    shortTitle: "Consulting",
    description:
      "A delivery-focused workspace for consultants, project teams and global client collaboration.",
    position: "left-[69%] top-[64%]",
    icon: BriefcaseBusiness,
  },
  {
    id: "ideas",
    number: "06",
    title: "Creator & Media Space",
    shortTitle: "Ideas",
    description:
      "A creative production area for webinars, digital learning, podcasts, demonstrations and community content.",
    position: "left-[47%] top-[67%]",
    icon: Lightbulb,
  },
];

export default function CampusReveal() {
  const [activeSpace, setActiveSpace] = useState(campusSpaces[2]);

  const ActiveIcon = activeSpace.icon;

  return (
    <CinematicSection id="campus" glow="center">
      <SectionBackground word="2026" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="FUTURE CAMPUS"
          title={"Built for builders.\nDesigned for dreamers."}
          description="Explore the future Archon campus — a 15,000 sq ft environment created for learning, mentorship, consulting, product building and entrepreneurship."
        />

        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:sticky lg:top-32"
          >
            <div className="text-7xl font-black text-cyan-300 md:text-8xl">
              15,000
            </div>

            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              sq ft Innovation Campus
            </h3>

            <p className="mt-6 max-w-lg leading-7 text-slate-300">
              Select a campus hotspot to explore how each part of the building
              contributes to the Archon ecosystem.
            </p>

            <motion.div
              key={activeSpace.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.055] p-7 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                  <ActiveIcon className="h-7 w-7 text-cyan-300" />
                </div>

                <span className="text-sm font-semibold tracking-[0.3em] text-cyan-300">
                  {activeSpace.number}
                </span>
              </div>

              <h4 className="mt-7 text-2xl font-semibold text-white">
                {activeSpace.title}
              </h4>

              <p className="mt-4 leading-7 text-slate-300">
                {activeSpace.description}
              </p>
            </motion.div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {campusSpaces.map((space) => {
                const Icon = space.icon;
                const active = space.id === activeSpace.id;

                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setActiveSpace(space)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-cyan-300/40 bg-cyan-300/10 text-white"
                        : "border-white/10 bg-white/[0.025] text-slate-400 hover:border-cyan-300/25 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="text-sm font-semibold">
                      {space.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[5rem] bg-cyan-300/10 blur-[80px]" />

            <div className="relative overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-white/[0.03] p-3 shadow-[0_0_140px_rgba(34,211,238,0.14)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] bg-[#07111f]">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src="/images/campus1.jpeg"
                    alt="Archon future campus render"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-transparent to-[#050816]/10" />
                <div className="pointer-events-none absolute inset-0 bg-cyan-300/[0.025] mix-blend-screen" />

                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:46px_46px]"
                  initial={{ opacity: 0.7 }}
                  whileInView={{ opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 0.45 }}
                />

                <div className="absolute left-6 top-6 rounded-full border border-cyan-300/20 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-xl">
                  Interactive Campus
                </div>

                {campusSpaces.map((space, index) => {
                  const active = activeSpace.id === space.id;

                  return (
                    <motion.button
                      key={space.id}
                      type="button"
                      aria-label={`Explore ${space.title}`}
                      onClick={() => setActiveSpace(space)}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + index * 0.12,
                      }}
                      className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 ${space.position}`}
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition ${
                          active
                            ? "animate-ping border-cyan-300/50 bg-cyan-300/20"
                            : "border-cyan-300/20 bg-cyan-300/5"
                        }`}
                      />

                      <span
                        className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition duration-300 ${
                          active
                            ? "scale-125 border-white bg-cyan-300 shadow-[0_0_35px_rgba(34,211,238,1)]"
                            : "border-cyan-100 bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.8)] group-hover:scale-125"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#050816]" />
                      </span>

                      <span
                        className={`absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl transition ${
                          active
                            ? "border-cyan-300/35 bg-cyan-300/15 text-cyan-100"
                            : "border-white/10 bg-black/55 text-slate-300 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {space.shortTitle}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="absolute bottom-5 left-5 right-5 rounded-[1.8rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                        Kerala · Opening 2026
                      </div>

                      <div className="mt-2 text-xl font-semibold text-white md:text-2xl">
                        One campus. Thousands of futures.
                      </div>
                    </div>

                    <div className="hidden text-right text-xs uppercase tracking-[0.25em] text-slate-400 sm:block">
                      Select a hotspot
                      <br />
                      to explore
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CinematicSection>
  );
}
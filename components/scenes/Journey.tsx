"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Globe2,
  GraduationCap,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";

import { journeyMilestones } from "@/data/home";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";

const milestoneIcons = [
  Rocket,
  GraduationCap,
  Globe2,
  MapPin,
  Building2,
  Sparkles,
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 70%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);
  const glowY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white md:py-44"
    >
      <HolographicField />
      <SectionBackground word="JOURNEY" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300"
            >
              The Journey
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-5xl text-balance text-5xl font-bold leading-[1.04] md:text-7xl"
            >
              What began as one room
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                became a global ecosystem.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.045] p-6 backdrop-blur-xl"
          >
            <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-300">
              Archon evolution
            </div>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Every milestone expanded the same founding belief: practical
              learning, honest mentorship and technology should create real
              opportunity.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]" />

              <span className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                Journey in progress
              </span>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-24">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-white/10 md:block lg:left-1/2" />

          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-6 top-0 hidden w-px origin-top bg-gradient-to-b from-cyan-200 via-cyan-400 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.8)] md:block lg:left-1/2"
          />

          <motion.div
            style={{ top: glowY }}
            className="pointer-events-none absolute left-6 z-20 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_35px_rgba(103,232,249,1)] md:block lg:left-1/2"
          />

          <div className="space-y-12 md:space-y-20">
            {journeyMilestones.map((item, index) => {
              const Icon =
                milestoneIcons[index] ?? milestoneIcons[milestoneIcons.length - 1];

              const reverse = index % 2 !== 0;

              return (
                <motion.article
                  key={`${item.year}-${item.title}`}
                  initial={{
                    opacity: 0,
                    y: 60,
                    x: reverse ? 35 : -35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid gap-6 md:pl-20 lg:grid-cols-2 lg:gap-24 lg:pl-0"
                >
                  <div
                    className={`${
                      reverse
                        ? "lg:col-start-2 lg:text-left"
                        : "lg:text-right"
                    }`}
                  >
                    <div
                      className={`group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-300/35 hover:bg-white/[0.06] hover:shadow-[0_0_70px_rgba(34,211,238,0.12)] md:p-9 ${
                        reverse ? "" : "lg:ml-auto"
                      }`}
                    >
                      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/[0.07] blur-3xl transition duration-500 group-hover:bg-cyan-300/[0.12]" />

                      <div
                        className={`relative flex items-start gap-5 ${
                          reverse
                            ? ""
                            : "lg:flex-row-reverse lg:text-right"
                        }`}
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.3rem] border border-cyan-300/25 bg-cyan-300/10">
                          <Icon className="h-7 w-7 text-cyan-300" />
                        </div>

                        <div className="flex-1">
                          <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-300">
                            Milestone {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="mt-3 text-3xl font-black text-cyan-200">
                            {item.year}
                          </div>

                          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                            {item.title}
                          </h3>

                          <p className="mt-5 leading-7 text-slate-300">
                            {item.text}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`relative mt-8 flex items-center gap-3 border-t border-white/10 pt-5 ${
                          reverse ? "" : "lg:justify-end"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />

                        <span className="text-[9px] uppercase tracking-[0.26em] text-slate-500">
                          Archon journey
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: 0.25,
                      type: "spring",
                      stiffness: 140,
                    }}
                    className="absolute left-6 top-10 z-20 hidden -translate-x-1/2 md:block lg:left-1/2"
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f] shadow-[0_0_38px_rgba(34,211,238,0.25)]">
                      <motion.span
                        animate={{
                          scale: [1, 1.45, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className="absolute inset-0 rounded-full border border-cyan-300/40"
                      />

                      <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/[0.05] p-8 backdrop-blur-xl md:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-cyan-300">
                The journey continues
              </div>

              <h3 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
                The next milestone is still being built.
              </h3>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                New products, new global opportunities and the future Archon
                campus are becoming the next chapter of the story.
              </p>
            </div>

            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
              <Sparkles className="h-10 w-10 text-cyan-300" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
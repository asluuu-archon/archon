"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionBackground from "@/components/ui/SectionBackground";

const scenes = [
  "I was not a topper.",
  "I studied mainly to pass exams.",
  "Marks did not teach me how the real industry works.",
  "That struggle became the reason Archon exists.",
  "Students need more than certificates.",
  "They need confidence, mentorship and real-world exposure.",
  "Sometimes, average marks produce extraordinary journeys.",
];

export default function StoryScroller() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
  id="founder"
  ref={ref}
  className="relative bg-[#050816]"
  style={{ height: `${scenes.length * 22}vh` }}
>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <SectionBackground word="FOUNDER" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_45%)]" />

        {scenes.map((text, index) => {
          const start = index / scenes.length;
          const center = (index + 0.5) / scenes.length;
          const end = (index + 1) / scenes.length;

          const opacity = useTransform(
            scrollYProgress,
            [start, center, end],
            [0, 1, 0]
          );

          const y = useTransform(
            scrollYProgress,
            [start, center, end],
            [60, 0, -60]
          );

          const scale = useTransform(
            scrollYProgress,
            [start, center, end],
            [0.9, 1, 0.9]
          );

          return (
            <motion.div
              key={text}
              style={{ opacity, y, scale }}
              className="absolute mx-auto max-w-6xl text-center"
            >
              <p className="mb-8 text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300">
                Founder Story
              </p>

              <h2 className="text-balance text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
                {text}
              </h2>

              {index === scenes.length - 1 && (
                <div className="mt-12 text-sm uppercase tracking-[0.35em] text-slate-500">
                  Mohamed Aslam · Founder, Archon
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
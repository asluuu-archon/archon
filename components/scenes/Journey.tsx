"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journeyMilestones } from "@/data/home";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          The Journey
        </p>

        <h2 className="max-w-5xl text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          What began as one room became a global ecosystem.
        </h2>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:block" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 hidden w-px origin-top bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 md:block"
          />

          <div className="space-y-10">
            {journeyMilestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group relative grid gap-6 md:grid-cols-[180px_1fr]"
              >
                <div className="relative flex items-start gap-4">
                  <motion.div
                    whileInView={{
                      scale: [1, 1.25, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="mt-2 hidden h-8 w-8 rounded-full border border-cyan-300 bg-[#050816] shadow-[0_0_45px_rgba(34,211,238,0.9)] md:block"
                  />

                  <div>
                    <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-2 text-2xl font-bold text-white">
                      {item.year}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.015] group-hover:border-cyan-300/40 group-hover:bg-white/[0.06] group-hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]">
                  <h3 className="text-3xl font-bold">{item.title}</h3>

                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
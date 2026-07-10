"use client";

import { motion } from "framer-motion";
import CinematicSection from "@/components/ui/CinematicSection";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const points = [
  {
    label: "Kerala",
    country: "India",
    x: "18%",
    y: "62%",
    text: "Where Archon began — one room, one founder, one belief.",
  },
  {
    label: "Brussels",
    country: "Belgium",
    x: "45%",
    y: "34%",
    text: "The first international consulting step in Europe.",
  },
  {
    label: "United Kingdom",
    country: "UK",
    x: "58%",
    y: "28%",
    text: "Growing presence around students and technology opportunities.",
  },
  {
    label: "Sydney",
    country: "Australia",
    x: "78%",
    y: "72%",
    text: "A future innovation base supporting global growth.",
  },
];

export default function GlobalPresence() {
  return (
    <CinematicSection id="global" glow="center">
      <SectionBackground word="GLOBAL" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="GLOBAL JOURNEY"
          title={"From Kerala\nto the world."}
          description="Archon expanded wherever learners, businesses and technology opportunities needed a stronger bridge between ambition and outcome."
        />

        <div className="relative mt-20 overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-10">
          <div className="relative h-[640px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#030712]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_48%)]" />

            <motion.div
              className="absolute left-[18%] top-[62%] h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_45px_rgba(34,211,238,1)]"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M18 62 C28 40, 36 33, 45 34"
                fill="none"
                stroke="rgba(34,211,238,0.45)"
                strokeWidth="0.35"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />

              <motion.path
                d="M45 34 C50 28, 54 27, 58 28"
                fill="none"
                stroke="rgba(34,211,238,0.45)"
                strokeWidth="0.35"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
              />

              <motion.path
                d="M45 34 C60 42, 68 58, 78 72"
                fill="none"
                stroke="rgba(34,211,238,0.45)"
                strokeWidth="0.35"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 1.7, ease: "easeInOut" }}
              />

              <motion.circle
                r="0.8"
                fill="#67e8f9"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M18 62 C28 40, 36 33, 45 34')",
                }}
              />

              <motion.circle
                r="0.8"
                fill="#67e8f9"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M45 34 C50 28, 54 27, 58 28')",
                }}
              />

              <motion.circle
                r="0.8"
                fill="#67e8f9"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 1.8, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M45 34 C60 42, 68 58, 78 72')",
                }}
              />
            </svg>

            {points.map((point, index) => (
              <motion.div
                key={point.label}
                className="absolute"
                style={{ left: point.x, top: point.y }}
                initial={{ opacity: 0, scale: 0.75, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.45 }}
              >
                <div className="relative">
                  <div className="absolute -left-3 -top-3 h-7 w-7 rounded-full bg-cyan-300/20 blur-md" />
                  <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.95)]" />

                  <div className="mt-4 w-64 rounded-2xl border border-white/10 bg-[#07111f]/90 p-5 backdrop-blur-md">
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      {point.country}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {point.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {point.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
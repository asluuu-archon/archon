"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Globe2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

type SceneBridgeProps = {
  from: string;
  to: string;
  label: string;
  variant?: "learning" | "industry" | "products" | "global" | "campus" | "vision";
};

const variants = {
  learning: {
    icon: GraduationCap,
    glow: "rgba(45,212,191,0.22)",
  },
  industry: {
    icon: BriefcaseBusiness,
    glow: "rgba(56,189,248,0.22)",
  },
  products: {
    icon: Cpu,
    glow: "rgba(103,232,249,0.25)",
  },
  global: {
    icon: Globe2,
    glow: "rgba(96,165,250,0.22)",
  },
  campus: {
    icon: Building2,
    glow: "rgba(34,211,238,0.22)",
  },
  vision: {
    icon: Sparkles,
    glow: "rgba(255,255,255,0.14)",
  },
};

export default function SceneBridge({
  from,
  to,
  label,
  variant = "learning",
}: SceneBridgeProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className="pointer-events-none relative z-20 h-40 overflow-hidden bg-[#050816] md:h-52">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        animate={{
          x: ["-30%", "130%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 top-1/2 h-px w-[28%] bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_22px_rgba(103,232,249,0.8)]"
      />

      <motion.div
        animate={{
          scale: [1, 1.16, 1],
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: config.glow,
        }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-5">
        <div className="hidden text-right sm:block">
          <div className="text-[8px] uppercase tracking-[0.32em] text-slate-600">
            Previous chapter
          </div>

          <div className="mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
            {from}
          </div>
        </div>

        <motion.div
          animate={{
            y: [0, 7, 0],
            boxShadow: [
              "0 0 18px rgba(34,211,238,0.15)",
              "0 0 42px rgba(34,211,238,0.45)",
              "0 0 18px rgba(34,211,238,0.15)",
            ],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/25 bg-[#07111f]/90 backdrop-blur-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-1.5 rounded-full border border-dashed border-cyan-300/20"
          />

          <Icon className="relative z-10 h-5 w-5 text-cyan-300" />

          <ArrowDown className="absolute -bottom-8 h-4 w-4 text-cyan-300" />
        </motion.div>

        <div>
          <div className="text-[8px] uppercase tracking-[0.32em] text-cyan-300">
            Next chapter
          </div>

          <div className="mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
            {to}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.35em] text-slate-600"
      >
        {label}
      </motion.div>
    </div>
  );
}
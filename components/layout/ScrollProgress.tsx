"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";

import { useScene } from "@/components/providers/SceneProvider";

const sceneLabels = {
  hero: {
    chapter: "01",
    label: "Dream",
  },
  problem: {
    chapter: "02",
    label: "Why Archon",
  },
  learning: {
    chapter: "03",
    label: "Learning",
  },
  consulting: {
    chapter: "04",
    label: "Industry",
  },
  products: {
    chapter: "05",
    label: "Products",
  },
  stories: {
    chapter: "06",
    label: "Impact",
  },
  global: {
    chapter: "07",
    label: "Global",
  },
  campus: {
    chapter: "08",
    label: "Campus",
  },
  vision: {
    chapter: "09",
    label: "Vision",
  },
};

export default function ScrollProgress() {
  const { scene } = useScene();
  const { scrollYProgress } = useScroll();

  const [percentage, setPercentage] = useState(0);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.35,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercentage(Math.round(latest * 100));
  });

  const currentScene = sceneLabels[scene];

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-white/[0.035]">
        <motion.div
          style={{
            scaleX: smoothProgress,
          }}
          className="relative h-full origin-left bg-gradient-to-r from-cyan-500 via-cyan-300 to-white"
        >
          <motion.div
            animate={{
              opacity: [0.45, 1, 0.45],
              boxShadow: [
                "0 0 10px rgba(34,211,238,0.45)",
                "0 0 28px rgba(103,232,249,1)",
                "0 0 10px rgba(34,211,238,0.45)",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-100"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none fixed right-7 top-7 z-[90] hidden xl:block"
      >
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-[#07111f]/65 px-4 py-2.5 shadow-[0_0_40px_rgba(34,211,238,0.06)] backdrop-blur-2xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-[10px] font-semibold tracking-[0.1em] text-cyan-300">
            {currentScene.chapter}
          </div>

          <div className="min-w-[112px]">
            <motion.div
              key={scene}
              initial={{
                opacity: 0,
                y: 7,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white"
            >
              {currentScene.label}
            </motion.div>

            <div className="mt-1 text-[8px] uppercase tracking-[0.24em] text-slate-500">
              Archon Experience
            </div>
          </div>

          <div className="h-7 w-px bg-white/10" />

          <div className="w-10 text-right font-mono text-[10px] text-cyan-300">
            {percentage}%
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none fixed right-0 top-1/2 z-[70] hidden h-[34vh] -translate-y-1/2 xl:block">
        <div className="relative h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent">
          <motion.div
            animate={{
              top: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute right-0 h-16 w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.8)]"
          />
        </div>
      </div>
    </>
  );
}
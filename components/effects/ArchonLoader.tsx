"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
  "Initialising ecosystem",
  "Connecting learning",
  "Synchronising consulting",
  "Loading innovation",
  "Archon online",
];

export default function ArchonLoader() {
  const [visible, setVisible] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const alreadyViewed = window.sessionStorage.getItem(
      "archon-loader-viewed"
    );

    if (alreadyViewed) {
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const duration = 3200;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setProgress(nextProgress);

      const nextStage = Math.min(
        stages.length - 1,
        Math.floor((nextProgress / 100) * stages.length)
      );

      setStageIndex(nextStage);
    }, 40);

    const closeTimer = window.setTimeout(() => {
      setProgress(100);
      setStageIndex(stages.length - 1);

      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        window.sessionStorage.setItem("archon-loader-viewed", "true");
      }, 550);
    }, duration);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(closeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(14px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[500] flex items-center justify-center overflow-hidden bg-[#020611]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_45%)]" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-cyan-300/10"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[380px] w-[380px] rounded-full border border-cyan-300/[0.08]"
          />

          <div className="relative z-10 w-full max-w-xl px-8 text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/[0.07] shadow-[0_0_80px_rgba(34,211,238,0.18)]"
            >
              <motion.div
                animate={{
                  scale: [0.82, 1.18, 0.82],
                  opacity: [0.55, 1, 0.55],
                }}
                transition={{
                  duration: 1.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-8 w-8 rounded-full bg-cyan-300 shadow-[0_0_35px_rgba(34,211,238,1)]"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.2,
              }}
              className="mt-10"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.48em] text-cyan-300">
                Archon
              </div>

              <div className="mt-3 text-[9px] uppercase tracking-[0.34em] text-slate-600">
                Since 2013
              </div>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="mt-9 text-4xl font-semibold text-white md:text-6xl"
            >
              Dream. Build. Impact.
            </motion.h1>

            <div className="mt-12">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em]">
                <span className="text-slate-500">
                  {stages[stageIndex]}
                </span>

                <span className="font-mono text-cyan-300">
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>

              <div className="mt-4 h-px overflow-hidden bg-white/10">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.12,
                    ease: "linear",
                  }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-white shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                />
              </div>

              <div className="mt-5 flex justify-center gap-2">
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === stageIndex
                        ? "w-8 bg-cyan-300"
                        : index < stageIndex
                          ? "w-3 bg-cyan-300/40"
                          : "w-3 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 text-[8px] uppercase tracking-[0.35em] text-slate-700">
            Archon technology ecosystem
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
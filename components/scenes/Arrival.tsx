"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Network,
  Radio,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import HolographicField from "@/components/effects/HolographicField";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const rotatingWords = [
  "learners",
  "consultants",
  "builders",
  "businesses",
  "dreamers",
];

const ecosystemSignals = [
  {
    icon: GraduationCap,
    label: "Learning",
    value: "7,000+ learners",
    position: "left-[6%] top-[21%]",
  },
  {
    icon: BriefcaseBusiness,
    label: "Consulting",
    value: "Global delivery",
    position: "right-[5%] top-[24%]",
  },
  {
    icon: Bot,
    label: "AI Products",
    value: "Building now",
    position: "left-[9%] bottom-[17%]",
  },
  {
    icon: Globe2,
    label: "Global",
    value: "4 locations",
    position: "right-[7%] bottom-[18%]",
  },
];

const metrics = [
  {
    value: 2013,
    start: 2000,
    suffix: "",
    label: "The journey began",
  },
  {
    value: 7000,
    start: 0,
    suffix: "+",
    label: "Learners influenced",
  },
  {
    value: 4,
    start: 0,
    suffix: "",
    label: "Global locations",
  },
];

export default function Arrival() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#050816] px-6 pb-20 pt-32 text-white"
    >
      <HolographicField />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[47%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.065] blur-[150px]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-300/[0.09]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 110,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-[48%] h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/[0.045]"
        />

        <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />

        <div className="absolute bottom-[22%] left-1/2 top-[20%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center justify-center">
          {ecosystemSignals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <motion.div
                key={signal.label}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.8,
                    delay: 1.1 + index * 0.15,
                  },
                  scale: {
                    duration: 0.8,
                    delay: 1.1 + index * 0.15,
                  },
                  y: {
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`absolute hidden rounded-full border border-white/10 bg-[#07111f]/70 px-5 py-3 shadow-[0_0_45px_rgba(34,211,238,0.06)] backdrop-blur-2xl lg:block ${signal.position}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>

                  <div>
                    <div className="text-[9px] uppercase tracking-[0.28em] text-cyan-300">
                      {signal.label}
                    </div>

                    <div className="mt-1 text-sm font-semibold text-white">
                      {signal.value}
                    </div>
                  </div>

                  <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]" />
                </div>
              </motion.div>
            );
          })}

          <div className="relative mx-auto max-w-6xl text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="mx-auto inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-2.5 backdrop-blur-xl"
            >
              <Radio className="h-4 w-4 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-200">
                Archon Ecosystem Online
              </span>

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mt-10"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.08] blur-[110px]" />

              <h1 className="relative text-balance text-6xl font-bold leading-[0.94] tracking-[-0.04em] text-white md:text-8xl lg:text-[8.8rem]">
                Dream.
                <br />
                Build.
                <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                  Impact.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.55,
              }}
              className="mx-auto mt-10 max-w-3xl"
            >
              <p className="text-balance text-lg leading-8 text-slate-300 md:text-xl">
                A global ecosystem helping{" "}
                <span className="inline-flex min-w-[150px] justify-center align-bottom font-semibold text-cyan-300 md:min-w-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{
                        opacity: 0,
                        y: 18,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -18,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                move from ambition to meaningful outcomes through learning,
                consulting, technology and innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.75,
              }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="#learning"
                className="group flex min-w-[190px] items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 py-4 text-sm font-semibold text-[#031018] shadow-[0_0_45px_rgba(34,211,238,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-200"
              >
                Explore Archon

                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#consulting"
                className="group flex min-w-[190px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Work With Us

                <Sparkles className="h-4 w-4 text-cyan-300 transition group-hover:rotate-12" />
              </a>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1,
              }}
              className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3"
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 1.05 + index * 0.12,
                  }}
                  className="group relative overflow-hidden bg-[#07111f]/85 px-5 py-7 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ x: "-130%" }}
                    animate={{ x: "160%" }}
                    transition={{
                      duration: 1.4,
                      delay: 1.3 + index * 0.16,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 w-20 rotate-12 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-xl"
                  />

                  <AnimatedCounter
                    value={metric.value}
                    start={metric.start}
                    suffix={metric.suffix}
                    duration={2.1 + index * 0.25}
                    className="relative text-3xl font-black text-cyan-300 md:text-4xl"
                  />

                  <div className="relative mt-3 text-[9px] uppercase tracking-[0.22em] text-slate-500">
                    {metric.label}
                  </div>

                  <motion.div
                    animate={{
                      opacity: [0.15, 0.65, 0.15],
                      scaleX: [0.25, 1, 0.25],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#problem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.35,
          }}
          className="group absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-slate-500 transition group-hover:text-cyan-300">
            Begin the journey
          </span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-11 w-7 items-start justify-center rounded-full border border-white/15 p-2 transition group-hover:border-cyan-300/40"
          >
            <ArrowDown className="h-3 w-3 text-cyan-300" />
          </motion.div>
        </motion.a>
      </div>

      <motion.div
        animate={{
          opacity: [0.08, 0.22, 0.08],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
      />

      <div className="pointer-events-none absolute bottom-8 right-8 hidden items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl xl:flex">
        <Network className="h-4 w-4 text-cyan-300" />

        <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
          Connected since 2013
        </span>
      </div>
    </section>
  );
}
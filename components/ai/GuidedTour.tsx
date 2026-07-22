"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Compass,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const tourStops = [
  {
    id: "hero",
    chapter: "01",
    label: "Dream",
    title: "Welcome to Archon.",
    description:
      "Archon is a connected ecosystem for learning, consulting, products, innovation and meaningful outcomes.",
  },
  {
    id: "problem",
    chapter: "02",
    label: "Why Archon",
    title: "It began with a different belief.",
    description:
      "Marks and certificates alone do not create careers. Understanding, practical exposure and mentorship do.",
  },
  {
    id: "founder",
    chapter: "03",
    label: "Founder",
    title: "The struggle became the reason to build.",
    description:
      "Mohamed Aslam’s own journey as an average student shaped the founding philosophy behind Archon.",
  },
  {
    id: "journey",
    chapter: "04",
    label: "Journey",
    title: "One room became a global ecosystem.",
    description:
      "The journey expanded from one founder and one student into learning, consulting, products and international operations.",
  },
  {
    id: "global",
    chapter: "05",
    label: "Global",
    title: "From Kerala to the world.",
    description:
      "Archon now connects opportunities across India, Belgium, the United Kingdom and Sydney.",
  },
  {
    id: "learning",
    chapter: "06",
    label: "Learning",
    title: "Learning is built around outcomes.",
    description:
      "Programs combine direction, mentorship, practical scenarios, project exposure and career preparation.",
  },
  {
    id: "consulting",
    chapter: "07",
    label: "Consulting",
    title: "Experience becomes enterprise delivery.",
    description:
      "Archon supports organisations through SAP, software engineering, integration, cloud, talent and AI.",
  },
  {
    id: "products",
    chapter: "08",
    label: "Products",
    title: "The ecosystem is becoming technology.",
    description:
      "SAP Guru Assistant, AI Command Center, ArchRoom and Future Labs form Archon’s connected product vision.",
  },
  {
    id: "stories",
    chapter: "09",
    label: "Impact",
    title: "Outcomes are measured through journeys.",
    description:
      "Archon’s impact includes skills built, confidence gained, careers redirected and opportunities created.",
  },
  {
    id: "campus",
    chapter: "10",
    label: "Campus",
    title: "The next generation needs a place to build.",
    description:
      "The future 15,000 sq ft campus brings learning, consulting, innovation and entrepreneurship together.",
  },
  {
    id: "contact",
    chapter: "11",
    label: "Next Chapter",
    title: "Your Archon journey can begin here.",
    description:
      "Explore learning, consulting, products or collaboration—and allow Archon AI to guide your next step.",
  },
];

export default function GuidedTour() {
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const timerRef = useRef<number | null>(null);

  const activeStop = tourStops[activeIndex];
  const isLast = activeIndex === tourStops.length - 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scrollToStop = useCallback((index: number) => {
    const stop = tourStops[index];
    const element = document.getElementById(stop.id);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const moveTo = useCallback(
    (index: number) => {
      const safeIndex = Math.max(
        0,
        Math.min(index, tourStops.length - 1)
      );

      setActiveIndex(safeIndex);
      scrollToStop(safeIndex);
    },
    [scrollToStop]
  );

  const startTour = () => {
    setStarted(true);
    setCompleted(false);
    setPlaying(false);
    setActiveIndex(0);
    scrollToStop(0);
  };

  const closeTour = () => {
    clearTimer();
    setStarted(false);
    setPlaying(false);
    setCompleted(false);
  };

  const goNext = () => {
    clearTimer();

    if (isLast) {
      setPlaying(false);
      setCompleted(true);
      return;
    }

    moveTo(activeIndex + 1);
  };

  const goPrevious = () => {
    clearTimer();
    setCompleted(false);
    moveTo(activeIndex - 1);
  };

  useEffect(() => {
    clearTimer();

    if (!started || !playing || completed) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      if (activeIndex === tourStops.length - 1) {
        setPlaying(false);
        setCompleted(true);
        return;
      }

      moveTo(activeIndex + 1);
    }, 8500);

    return clearTimer;
  }, [
    activeIndex,
    clearTimer,
    completed,
    moveTo,
    playing,
    started,
  ]);

  useEffect(() => {
    const handleStartTour = () => {
      startTour();
    };

    window.addEventListener("archon:start-tour", handleStartTour);

    return () => {
      window.removeEventListener("archon:start-tour", handleStartTour);
      clearTimer();
    };
  }, [clearTimer]);

  return (
    <>
      <AnimatePresence>
        {!started && (
          <motion.button
            type="button"
            onClick={startTour}
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -5, 0],
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              opacity: {
                duration: 0.5,
              },
              x: {
                duration: 0.5,
              },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="fixed bottom-24 left-6 z-[115] hidden items-center gap-3 rounded-full border border-cyan-300/25 bg-[#07111f]/90 px-4 py-3 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-2xl transition hover:border-cyan-300/55 hover:bg-[#0a1725] md:flex"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-1 rounded-full border border-dashed border-cyan-300/30"
              />

              <Compass className="relative h-5 w-5 text-cyan-300" />
            </div>

            <div className="pr-2 text-left">
              <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Guided Experience
              </div>

              <div className="mt-1 text-xs text-slate-300">
                Tour Archon
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {started && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="pointer-events-none fixed inset-0 z-[105] bg-[radial-gradient(circle_at_center,transparent_25%,rgba(2,6,17,0.16)_100%)]"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 35,
                scale: 0.97,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed bottom-5 left-1/2 z-[170] w-[min(900px,calc(100vw-30px))] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border border-cyan-300/25 bg-[#050b17]/95 shadow-[0_0_130px_rgba(34,211,238,0.2)] backdrop-blur-2xl"
            >
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(34,211,238,0.14),transparent_45%)]" />

                <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: playing ? 4 : 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-1 rounded-full border border-dashed border-cyan-300/35"
                      />

                      <Bot className="relative h-5 w-5 text-cyan-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          Archon AI Guide
                        </span>

                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      </div>

                      <div className="mt-1 text-[9px] uppercase tracking-[0.26em] text-cyan-300">
                        Guided ecosystem experience
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Exit guided tour"
                    onClick={closeTour}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      completed
                        ? "completed"
                        : activeStop.id
                    }
                    initial={{
                      opacity: 0,
                      y: 18,
                      filter: "blur(7px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                      filter: "blur(6px)",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="relative px-5 py-5 md:px-7 md:py-6"
                  >
                    {completed ? (
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                            <Check className="h-5 w-5 text-emerald-400" />
                          </div>

                          <div>
                            <div className="text-[9px] uppercase tracking-[0.3em] text-emerald-400">
                              Experience complete
                            </div>

                            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                              You have completed the Archon journey.
                            </h3>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                              Archon AI can now help you explore a learning
                              path, consulting requirement, product or
                              collaboration opportunity.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            closeTour();

                            window.setTimeout(() => {
                              window.dispatchEvent(
                                new Event("archon:open-ai")
                              );
                            }, 350);
                          }}
                          className="flex shrink-0 items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200"
                        >
                          Continue with Archon AI
                          <Sparkles className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] border border-cyan-300/25 bg-cyan-300/10 font-mono text-[10px] text-cyan-300">
                            {activeStop.chapter}
                          </div>

                          <div>
                            <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-300">
                              {activeStop.label}
                            </div>

                            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                              {activeStop.title}
                            </h3>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                              {activeStop.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Previous tour chapter"
                            disabled={activeIndex === 0}
                            onClick={goPrevious}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            aria-label={
                              playing
                                ? "Pause guided tour"
                                : "Play guided tour"
                            }
                            onClick={() => {
                              setPlaying((current) => !current);
                            }}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 transition hover:bg-cyan-300/15"
                          >
                            {playing ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="ml-0.5 h-4 w-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            aria-label="Next tour chapter"
                            onClick={goNext}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-[#031018] transition hover:bg-cyan-200"
                          >
                            {isLast ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="relative border-t border-white/10 px-5 py-4 md:px-7">
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex flex-1 gap-1.5">
                      {tourStops.map((stop, index) => (
                        <button
                          key={stop.id}
                          type="button"
                          aria-label={`Open ${stop.label}`}
                          onClick={() => {
                            setCompleted(false);
                            moveTo(index);
                          }}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                            index === activeIndex && !completed
                              ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                              : index < activeIndex || completed
                                ? "bg-cyan-300/40"
                                : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="shrink-0 font-mono text-[9px] text-cyan-300">
                      {completed
                        ? "100%"
                        : `${Math.round(
                            ((activeIndex + 1) /
                              tourStops.length) *
                              100
                          )}%`}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
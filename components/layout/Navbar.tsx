"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { useScene } from "@/components/providers/SceneProvider";

const sceneNames = {
  hero: "Dream",
  problem: "Why Archon",
  learning: "Learning",
  consulting: "Consulting",
  products: "Products",
  stories: "Impact",
  global: "Global",
  campus: "Campus",
  vision: "Future",
};

const navigation = [
  {
    label: "Learning",
    href: "#learning",
    scene: "learning",
  },
  {
    label: "Consulting",
    href: "#consulting",
    scene: "consulting",
  },
  {
    label: "Products",
    href: "#products",
    scene: "products",
  },
  {
    label: "Stories",
    href: "#stories",
    scene: "stories",
  },
  {
    label: "Company",
    href: "#problem",
    scene: "problem",
  },
];

export default function Navbar() {
  const { scene } = useScene();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentScene =
    sceneNames[scene as keyof typeof sceneNames] ?? "Archon";

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-5 z-[90] px-4 md:top-7 md:px-6"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#07111f]/72 px-3 py-2 shadow-[0_0_60px_rgba(34,211,238,0.07)] backdrop-blur-2xl md:px-4">
          <a
            href="#hero"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 18px rgba(34,211,238,0.25)",
                  "0 0 34px rgba(34,211,238,0.65)",
                  "0 0 18px rgba(34,211,238,0.25)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-9 w-9 rounded-full bg-cyan-400"
            />

            <div>
              <div className="text-xs font-bold tracking-[0.08em] text-white">
                ARCHON
              </div>

              <div className="text-[7px] uppercase tracking-[0.32em] text-slate-500">
                Since 2013
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const active = scene === item.scene;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative py-2 text-[11px] font-medium text-slate-300 transition hover:text-white"
                >
                  {item.label}

                  <motion.span
                    animate={{
                      width: active ? "100%" : "0%",
                      opacity: active ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="absolute -bottom-0.5 left-0 h-px bg-cyan-300"
                  />

                  {active && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <div className="hidden min-w-[105px] text-right xl:block">
              <div className="text-[7px] uppercase tracking-[0.28em] text-slate-600">
                Current chapter
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene}
                  initial={{
                    opacity: 0,
                    y: 7,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -7,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300"
                >
                  {currentScene}
                </motion.div>
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-[10px] font-semibold text-[#031018] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              Talk to an Advisor

              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white sm:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-[#020611]/75 backdrop-blur-xl sm:hidden"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed left-4 right-4 top-24 z-[85] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#07111f]/95 p-5 shadow-[0_0_100px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:hidden"
            >
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
                    Current chapter
                  </div>

                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {currentScene}
                  </div>
                </div>

                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]" />
              </div>

              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      x: -16,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${
                      scene === item.scene
                        ? "border-cyan-300/35 bg-cyan-300/[0.09] text-white"
                        : "border-white/10 bg-white/[0.025] text-slate-300"
                    }`}
                  >
                    <span className="text-sm font-semibold">{item.label}</span>

                    <span className="text-[9px] uppercase tracking-[0.22em] text-cyan-300">
                      0{index + 1}
                    </span>
                  </motion.a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-5 flex w-full items-center justify-between rounded-2xl bg-cyan-300 px-5 py-4 font-semibold text-[#031018]"
              >
                Talk to an Advisor
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
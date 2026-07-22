"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Bot,
  BrainCircuit,
  Cpu,
  GraduationCap,
  Network,
  Radio,
  Sparkles,
  Video,
  Workflow,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import CircuitGrid from "@/components/effects/CircuitGrid";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import HolographicField from "@/components/effects/HolographicField";

const ecosystemNodes = [
  {
    id: "sap-guru",
    name: "SAP Guru Assistant",
    shortName: "SAP Guru",
    category: "Career AI",
    status: "Online",
    liveText: "23 conversations active",
    icon: Bot,
    position: "left-[10%] top-[17%]",
    accent: "from-emerald-300/25 to-cyan-300/5",
    lineColor: "rgba(110,231,183,0.9)",
    description:
      "AI-powered career guidance, certificate analysis, social replies and learner communication.",
    capabilities: [
      "Career guidance",
      "Instagram and WhatsApp support",
      "Certificate analysis",
      "Lead qualification",
    ],
    metrics: [
      { label: "Availability", value: "24/7" },
      { label: "Channels", value: "Multi" },
      { label: "State", value: "Active" },
    ],
  },
  {
    id: "command-center",
    name: "AI Command Center",
    shortName: "Command Center",
    category: "Business Intelligence",
    status: "Building",
    liveText: "4 automations running",
    icon: Cpu,
    position: "right-[9%] top-[16%]",
    accent: "from-blue-300/25 to-cyan-300/5",
    lineColor: "rgba(125,211,252,0.9)",
    description:
      "A unified operating layer for conversations, leads, automation, analytics and business workflows.",
    capabilities: [
      "Unified inbox",
      "Lead intelligence",
      "Workflow automation",
      "Business analytics",
    ],
    metrics: [
      { label: "Modules", value: "8+" },
      { label: "Automation", value: "Live" },
      { label: "Version", value: "v0.4" },
    ],
  },
  {
    id: "archroom",
    name: "ArchRoom",
    shortName: "ArchRoom",
    category: "Collaboration",
    status: "Prototype",
    liveText: "Meeting engine testing",
    icon: Video,
    position: "left-[4%] top-[52%]",
    accent: "from-sky-300/25 to-cyan-300/5",
    lineColor: "rgba(56,189,248,0.9)",
    description:
      "A future meeting and collaboration platform designed first for the Archon ecosystem.",
    capabilities: [
      "Video meetings",
      "Screen sharing",
      "Session recording",
      "Classroom controls",
    ],
    metrics: [
      { label: "Platform", value: "Web" },
      { label: "Mode", value: "Live" },
      { label: "Stage", value: "MVP" },
    ],
  },
  {
    id: "learning-engine",
    name: "Learning Engine",
    shortName: "Learning",
    category: "Outcome Learning",
    status: "Expanding",
    liveText: "7,000+ learners connected",
    icon: GraduationCap,
    position: "right-[3%] top-[52%]",
    accent: "from-teal-300/25 to-cyan-300/5",
    lineColor: "rgba(94,234,212,0.9)",
    description:
      "A digital layer for project-based learning, mentorship, progress tracking and career outcomes.",
    capabilities: [
      "Project-based paths",
      "Mentor interaction",
      "Progress tracking",
      "Career outcomes",
    ],
    metrics: [
      { label: "Learners", value: "7,000+" },
      { label: "Model", value: "Outcome" },
      { label: "Reach", value: "Global" },
    ],
  },
  {
    id: "consulting-engine",
    name: "Consulting Engine",
    shortName: "Consulting",
    category: "Enterprise Delivery",
    status: "Operating",
    liveText: "Global delivery active",
    icon: Workflow,
    position: "left-[18%] bottom-[8%]",
    accent: "from-amber-300/20 to-cyan-300/5",
    lineColor: "rgba(253,224,71,0.85)",
    description:
      "The enterprise delivery layer connecting SAP consulting, staffing, engineering and transformation.",
    capabilities: [
      "SAP consulting",
      "Technology delivery",
      "Resource augmentation",
      "Transformation support",
    ],
    metrics: [
      { label: "Markets", value: "4" },
      { label: "Delivery", value: "Global" },
      { label: "Focus", value: "Enterprise" },
    ],
  },
  {
    id: "future-labs",
    name: "Future Labs",
    shortName: "Future Labs",
    category: "Research & Development",
    status: "Exploring",
    liveText: "AI experiments active",
    icon: BrainCircuit,
    position: "right-[17%] bottom-[8%]",
    accent: "from-violet-300/25 to-cyan-300/5",
    lineColor: "rgba(196,181,253,0.9)",
    description:
      "The experimentation layer where AI, automation and future platform ideas are researched and prototyped.",
    capabilities: [
      "AI experiments",
      "Agent systems",
      "Voice technology",
      "Product prototypes",
    ],
    metrics: [
      { label: "Mode", value: "R&D" },
      { label: "Ideas", value: "∞" },
      { label: "Focus", value: "Future" },
    ],
  },
];

const connections = [
  {
    id: "sap-guru",
    path: "M650 420 C470 255 330 180 175 150",
  },
  {
    id: "command-center",
    path: "M650 420 C830 250 970 175 1125 145",
  },
  {
    id: "archroom",
    path: "M650 420 C420 420 250 495 110 555",
  },
  {
    id: "learning-engine",
    path: "M650 420 C880 420 1050 495 1190 555",
  },
  {
    id: "consulting-engine",
    path: "M650 420 C490 610 355 705 250 770",
  },
  {
    id: "future-labs",
    path: "M650 420 C810 610 945 705 1050 770",
  },
];

export default function Products() {
  const [activeId, setActiveId] = useState(ecosystemNodes[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const highlightedId = hoveredId ?? activeId;

  const activeNode = useMemo(
    () =>
      ecosystemNodes.find((node) => node.id === activeId) ?? ecosystemNodes[0],
    [activeId]
  );

  const ActiveIcon = activeNode.icon;

  return (
    <CinematicSection id="products" glow="right">
      <CircuitGrid />
      <HolographicField />
      <SectionBackground word="ECOSYSTEM" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6">
        <SectionHeader
          eyebrow="ARCHON ECOSYSTEM"
          title={"Not separate products.\nOne connected future."}
          description="Learning, consulting, AI, collaboration and automation are being designed as connected layers of the Archon ecosystem."
        />

        <div className="relative mt-16 hidden lg:block">
          <motion.div
            animate={{
              rotate: [0, 0.6, 0, -0.6, 0],
              y: [0, -5, 0, 5, 0],
              scale: hoveredId ? 1.012 : 1,
            }}
            transition={{
              rotate: {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.5,
              },
            }}
            className="relative h-[860px] overflow-hidden rounded-[3.5rem] border border-white/10 bg-[#020611]/90 shadow-[0_0_180px_rgba(34,211,238,0.08)] backdrop-blur-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 0.8, 0, -0.8, 0] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-20 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] bg-[size:74px_74px]"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),transparent_42%)]" />

            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 60 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute h-1 w-1 rounded-full bg-cyan-200"
                  style={{
                    left: `${(index * 37) % 100}%`,
                    top: `${(index * 61) % 100}%`,
                  }}
                  animate={{
                    opacity: [0.05, 0.8, 0.05],
                    scale: [0.6, 1.6, 0.6],
                    y: [0, index % 2 === 0 ? -12 : 12, 0],
                  }}
                  transition={{
                    duration: 3 + (index % 5),
                    repeat: Infinity,
                    delay: index * 0.07,
                  }}
                />
              ))}
            </div>

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1300 840"
              preserveAspectRatio="none"
            >
              {connections.map((connection, index) => {
                const node = ecosystemNodes.find(
                  (item) => item.id === connection.id
                );

                const active = connection.id === highlightedId;

                return (
                  <g key={connection.id}>
                    <motion.path
                      d={connection.path}
                      fill="none"
                      stroke={
                        active
                          ? node?.lineColor
                          : "rgba(34,211,238,0.13)"
                      }
                      strokeWidth={active ? 2.4 : 1.1}
                      strokeDasharray="7 12"
                      animate={{
                        opacity: active ? 1 : hoveredId ? 0.15 : 0.55,
                      }}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        pathLength: {
                          duration: 1.4,
                          delay: index * 0.12,
                        },
                        opacity: {
                          duration: 0.3,
                        },
                      }}
                    />

                    {[0, 1, 2].map((packet) => (
                      <motion.circle
                        key={packet}
                        r={active ? 5 : 3}
                        fill={node?.lineColor ?? "#67e8f9"}
                        animate={{
                          offsetDistance: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: active ? 1.8 : 4,
                          repeat: Infinity,
                          delay: packet * 0.7 + index * 0.25,
                          ease: "linear",
                        }}
                        style={{
                          offsetPath: `path("${connection.path}")`,
                        }}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            <motion.div
              animate={{
                scale: [1, 1.035, 1],
                boxShadow: [
                  "0 0 90px rgba(34,211,238,0.14)",
                  "0 0 170px rgba(34,211,238,0.34)",
                  "0 0 90px rgba(34,211,238,0.14)",
                ],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 z-20 flex h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/25 bg-[#07111f]/95 backdrop-blur-2xl"
            >
              <div className="absolute inset-5 rounded-full border border-cyan-300/10" />
              <div className="absolute inset-12 rounded-full border border-cyan-300/15" />
              <div className="absolute inset-20 rounded-full border border-cyan-300/10" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-7 rounded-full border border-dashed border-cyan-300/30"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 36,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-16 rounded-full border border-dashed border-cyan-300/20"
              />

              {[0, 1, 2, 3].map((index) => (
                <motion.span
                  key={index}
                  className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8 + index * 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformOrigin: `${80 + index * 18}px 0px`,
                  }}
                />
              ))}

              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-cyan-300/30 bg-cyan-300/10">
                  <Network className="h-10 w-10 text-cyan-300" />
                </div>

                <div className="mt-7 text-xs uppercase tracking-[0.45em] text-cyan-300">
                  Connected Core
                </div>

                <div className="mt-3 text-5xl font-black tracking-tight text-white">
                  ARCHON
                </div>

                <div className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                  Technology Ecosystem
                </div>
              </div>
            </motion.div>

            {ecosystemNodes.map((node, index) => {
              const Icon = node.icon;
              const selected = node.id === activeId;
              const highlighted = node.id === highlightedId;
              const faded = hoveredId !== null && !highlighted;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveId(node.id)}
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, index % 2 === 0 ? -8 : 8, 0],
                  }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                      delay: 0.25 + index * 0.1,
                    },
                    scale: {
                      duration: 0.6,
                      delay: 0.25 + index * 0.1,
                    },
                    y: {
                      duration: 5 + index * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-gradient-to-br px-6 py-4 text-left backdrop-blur-2xl transition-all duration-500 ${
                    node.position
                  } ${node.accent} ${
                    highlighted
                      ? "border-cyan-200/60 shadow-[0_0_60px_rgba(34,211,238,0.24)]"
                      : "border-white/10"
                  } ${faded ? "opacity-20 blur-[1px]" : "opacity-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                        highlighted
                          ? "border-cyan-200/50 bg-white/[0.08]"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>

                    <div className="min-w-[170px]">
                      <div className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                        {node.category}
                      </div>

                      <div className="mt-1 text-base font-semibold text-white">
                        {node.shortName}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            selected
                              ? "animate-pulse bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,1)]"
                              : "bg-cyan-200/50"
                          }`}
                        />
                        {node.status}
                      </div>

                      <div className="mt-2 text-[10px] text-slate-500">
                        {node.liveText}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {ecosystemNodes.map((node) => {
            const Icon = node.icon;
            const active = node.id === activeId;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`rounded-[1.7rem] border p-5 text-left transition ${
                  active
                    ? "border-cyan-300/40 bg-cyan-300/[0.08]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <Icon className="h-7 w-7 text-cyan-300" />

                <div className="mt-5 text-lg font-semibold text-white">
                  {node.shortName}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {node.status}
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  {node.liveText}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2.3rem] border border-cyan-300/20 bg-cyan-300/[0.05] p-7 backdrop-blur-xl md:p-9"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10">
                    <ActiveIcon className="h-7 w-7 text-cyan-300" />
                  </div>

                  <div className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-300">
                    {activeNode.category}
                  </div>

                  <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                    {activeNode.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <Radio className="h-4 w-4" />
                  {activeNode.status}
                </div>
              </div>

              <p className="mt-7 max-w-2xl leading-8 text-slate-300">
                {activeNode.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {activeNode.capabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-4"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="text-sm text-slate-200">{capability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {activeNode.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
              >
                <div className="text-3xl font-black text-cyan-300">
                  {metric.value}
                </div>

                <div className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
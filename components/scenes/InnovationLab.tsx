"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  MessageSquareMore,
  Radio,
  Video,
  Wifi,
  Zap,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import CircuitGrid from "@/components/effects/CircuitGrid";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const products = [
  {
    id: "sap-guru",
    name: "SAP Guru Assistant",
    status: "ONLINE",
    version: "v0.8",
    icon: Bot,
    description:
      "AI-powered career guidance, social replies, lead handling and student communication.",
    modules: [
      "WhatsApp conversations",
      "Instagram replies",
      "Career guidance",
      "Certificate analysis",
    ],
    activity: [
      "Incoming learner question detected",
      "Conversation context restored",
      "Career path recommendation generated",
      "Reply prepared for approval",
    ],
  },
  {
    id: "command-center",
    name: "AI Command Center",
    status: "BUILDING",
    version: "v0.4",
    icon: Cpu,
    description:
      "A unified operating layer for conversations, leads, automation and business intelligence.",
    modules: [
      "Unified inbox",
      "Lead intelligence",
      "Automation engine",
      "Business analytics",
    ],
    activity: [
      "New lead received from Instagram",
      "Lead profile enriched",
      "Priority score calculated",
      "Advisor follow-up queued",
    ],
  },
  {
    id: "archroom",
    name: "ArchRoom",
    status: "PROTOTYPE",
    version: "v0.2",
    icon: Video,
    description:
      "A meeting and collaboration platform designed first for Archon’s own ecosystem.",
    modules: [
      "Video meetings",
      "Screen sharing",
      "Classroom controls",
      "Session recordings",
    ],
    activity: [
      "Meeting room created",
      "Participants connected",
      "Screen sharing enabled",
      "Session recording secured",
    ],
  },
  {
    id: "future-labs",
    name: "Future Labs",
    status: "R&D",
    version: "Exploring",
    icon: Activity,
    description:
      "The research environment where future Archon platforms are imagined and tested.",
    modules: [
      "AI experiments",
      "Product prototypes",
      "Automation concepts",
      "Emerging technology",
    ],
    activity: [
      "New product concept submitted",
      "Technical feasibility reviewed",
      "Prototype workspace created",
      "Experiment moved into testing",
    ],
  },
];

const metrics = [
  { value: "7,000+", label: "Learners reached" },
  { value: "4", label: "Global locations" },
  { value: "24/7", label: "AI availability" },
  { value: "3", label: "Products building" },
];

export default function InnovationLab() {
  const [activeId, setActiveId] = useState(products[0].id);
  const [activityIndex, setActivityIndex] = useState(0);

  const activeProduct =
    products.find((product) => product.id === activeId) ?? products[0];

  const ActiveIcon = activeProduct.icon;

  useEffect(() => {
    setActivityIndex(0);

    const timer = window.setInterval(() => {
      setActivityIndex(
        (current) => (current + 1) % activeProduct.activity.length
      );
    }, 2200);

    return () => window.clearInterval(timer);
  }, [activeProduct]);

  return (
    <CinematicSection id="innovation" glow="center">
      <CircuitGrid />
      <SectionBackground word="LAB" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="INNOVATION LAB"
          title={"We don't just adapt\nto the future.\nWe build it."}
          description="Archon is building AI systems, collaboration platforms and business tools that solve real problems across learning, consulting and communication."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-4">
            {products.map((product) => {
              const Icon = product.icon;
              const active = product.id === activeId;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  className={`group w-full rounded-[1.8rem] border p-5 text-left transition duration-300 ${
                    active
                      ? "border-cyan-300/40 bg-cyan-300/[0.08] shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                      : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          active
                            ? "border-cyan-300/30 bg-cyan-300/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      <div>
                        <div className="font-semibold text-white">
                          {product.name}
                        </div>

                        <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                          {product.version}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${
                        active
                          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
                          : "border-white/10 text-slate-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-[#07111f]/80 shadow-[0_0_100px_rgba(34,211,238,0.1)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/10 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Radio className="h-5 w-5 text-cyan-300" />

                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  Product Operations
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                System active
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="p-7 md:p-9"
              >
                <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10">
                      <ActiveIcon className="h-8 w-8 text-cyan-300" />
                    </div>

                    <h3 className="mt-7 text-3xl font-semibold text-white md:text-4xl">
                      {activeProduct.name}
                    </h3>

                    <p className="mt-5 max-w-xl leading-7 text-slate-300">
                      {activeProduct.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      Current state
                    </div>

                    <div className="mt-3 flex items-center gap-2 font-semibold text-cyan-300">
                      <Wifi className="h-4 w-4" />
                      {activeProduct.status}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {activeProduct.modules.map((module) => (
                    <div
                      key={module}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                      <span className="text-sm font-medium text-slate-200">
                        {module}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/35">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <MessageSquareMore className="h-4 w-4 text-cyan-300" />

                      <span className="text-xs uppercase tracking-[0.26em] text-slate-400">
                        Live activity
                      </span>
                    </div>

                    <Zap className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div className="relative min-h-[130px] p-5 font-mono text-sm">
                    <div className="text-slate-600">
                      archon://{activeProduct.id}/activity
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activityIndex}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        className="mt-5 flex items-center gap-3 text-cyan-200"
                      >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                        {activeProduct.activity[activityIndex]}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-4 text-xs text-slate-600">
                      Processing completed successfully.
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
            >
              <div className="text-3xl font-black text-cyan-300">
                {metric.value}
              </div>

              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
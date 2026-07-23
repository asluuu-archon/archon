"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  Braces,
  BriefcaseBusiness,
  CheckCircle2,
  CloudCog,
  Code2,
  DatabaseZap,
  Globe2,
  Layers3,
  Radio,
  RefreshCcw,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import CinematicSection from "@/components/ui/CinematicSection";
import CircuitGrid from "@/components/effects/CircuitGrid";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import SAPIndependenceDisclosure from "@/components/ui/SAPIndependenceDisclosure";
import { ConsultingService } from "@/lib/sanity.types";

const icons = [BriefcaseBusiness, DatabaseZap, Code2, Users, Bot, CloudCog];

const capabilities_backup = [
  {
    id: "sap",
    title: "SAP Consulting",
    shortTitle: "SAP",
    eyebrow: "Enterprise Transformation",
    icon: BriefcaseBusiness,
    status: "Delivery active",
    description:
      "Architecture, implementation support, optimisation and business transformation across SAP environments.",
    services: [
      "Solution architecture",
      "Implementation support",
      "Application optimisation",
      "Business process transformation",
    ],
    metrics: [
      { value: "18+", label: "Years of SAP experience" },
      { value: "Global", label: "Delivery capability" },
      { value: "End-to-end", label: "Engagement model" },
    ],
    activity: [
      "Business requirement mapped to solution architecture",
      "Implementation workstream synchronised",
      "Functional and technical teams aligned",
      "Deployment readiness checkpoint completed",
    ],
  },
  {
    id: "integration",
    title: "Migration & Integration",
    shortTitle: "Integration",
    eyebrow: "Connected Enterprise",
    icon: DatabaseZap,
    status: "Pipelines online",
    description:
      "Migration planning, platform integration and connected enterprise workflows across modern technology landscapes.",
    services: [
      "Cloud and data migration",
      "Enterprise integration",
      "API and middleware design",
      "Platform modernisation",
    ],
    metrics: [
      { value: "Multi-cloud", label: "Platform approach" },
      { value: "API-first", label: "Integration model" },
      { value: "Secure", label: "Delivery standard" },
    ],
    activity: [
      "Source and target systems discovered",
      "Migration dependency map generated",
      "Integration flow validated",
      "Cutover sequence prepared",
    ],
  },
  {
    id: "engineering",
    title: "Enterprise Development",
    shortTitle: "Engineering",
    eyebrow: "Software Delivery",
    icon: Code2,
    status: "Build systems running",
    description:
      "Custom applications, internal platforms and enterprise software engineered around measurable business outcomes.",
    services: [
      "Full-stack development",
      "Enterprise applications",
      "Internal product platforms",
      "Modernisation and maintenance",
    ],
    metrics: [
      { value: "Product-led", label: "Engineering approach" },
      { value: "Agile", label: "Delivery model" },
      { value: "Scalable", label: "Architecture focus" },
    ],
    activity: [
      "Product requirement converted into build backlog",
      "Architecture review completed",
      "Development pipeline progressing",
      "Release candidate moved to validation",
    ],
  },
  {
    id: "staffing",
    title: "Resource Augmentation",
    shortTitle: "Talent",
    eyebrow: "Global Capability",
    icon: Users,
    status: "Talent network active",
    description:
      "Experienced consultants and technology professionals aligned to project delivery, transformation and operational needs.",
    services: [
      "Specialist consultants",
      "Project-based staffing",
      "Flexible delivery teams",
      "Cross-border talent support",
    ],
    metrics: [
      { value: "India", label: "Talent base" },
      { value: "Europe", label: "Client access" },
      { value: "Flexible", label: "Engagement model" },
    ],
    activity: [
      "Project requirement received",
      "Capability profile matched",
      "Consultant suitability reviewed",
      "Deployment discussion initiated",
    ],
  },
  {
    id: "automation",
    title: "AI & Automation",
    shortTitle: "AI",
    eyebrow: "Intelligent Operations",
    icon: Bot,
    status: "Automations running",
    description:
      "AI-enabled workflows, intelligent assistants and business automation designed around real operational challenges.",
    services: [
      "AI assistants",
      "Workflow automation",
      "Conversation intelligence",
      "Operational analytics",
    ],
    metrics: [
      { value: "24/7", label: "Automation availability" },
      { value: "Human-led", label: "Governance model" },
      { value: "Outcome", label: "Primary focus" },
    ],
    activity: [
      "Incoming workflow event detected",
      "Business context analysed",
      "Automated action prepared",
      "Human approval checkpoint reached",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platform Services",
    shortTitle: "Cloud",
    eyebrow: "Modern Infrastructure",
    icon: CloudCog,
    status: "Infrastructure healthy",
    description:
      "Cloud engineering, platform operations, DevOps and resilient infrastructure for modern enterprise workloads.",
    services: [
      "Cloud architecture",
      "DevOps enablement",
      "Platform operations",
      "Security and resilience",
    ],
    metrics: [
      { value: "Always-on", label: "Infrastructure goal" },
      { value: "Automated", label: "Delivery pipeline" },
      { value: "Resilient", label: "Platform standard" },
    ],
    activity: [
      "Infrastructure health verified",
      "Deployment pipeline triggered",
      "Security controls validated",
      "Platform monitoring confirmed",
    ],
  },
];

const operatingRegions = [
  { label: "India", x: "18%", y: "60%" },
  { label: "Belgium", x: "47%", y: "31%" },
  { label: "United Kingdom", x: "61%", y: "25%" },
  { label: "Sydney", x: "80%", y: "68%" },
];

export default function Consulting({ services }: { services: ConsultingService[] }) {
  const capabilities = services?.length > 0 ? services : capabilities_backup as any;
  const [activeId, setActiveId] = useState(capabilities[0]?._id || capabilities[0]?.id);
  const [activityIndex, setActivityIndex] = useState(0);

  const activeCapability = useMemo(
    () =>
      capabilities.find((capability: any) => (capability._id || capability.id) === activeId) ??
      capabilities[0],
    [activeId, capabilities]
  );

  const activeIndex = capabilities.findIndex((c: any) => (c._id || c.id) === activeId);
  const ActiveIcon = icons[activeIndex] ?? BriefcaseBusiness;

  useEffect(() => {
    setActivityIndex(0);

    const interval = window.setInterval(() => {
      setActivityIndex(
        (current) => (current + 1) % activeCapability.activity.length
      );
    }, 2100);

    return () => window.clearInterval(interval);
  }, [activeCapability]);

  return (
    <CinematicSection id="consulting" glow="left">
      <CircuitGrid />
      <HolographicField />
      <SectionBackground word="INDUSTRY" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6">
        <SectionHeader
          eyebrow="ENTERPRISE CONSULTING"
          title={"From learning outcomes\nto enterprise outcomes."}
          description="Archon supports organisations through SAP consulting, software engineering, integration, staffing, cloud and intelligent automation."
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-[0.76fr_1.24fr]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {capabilities.map((capability: any, index: number) => {
              const Icon = icons[index] ?? BriefcaseBusiness;
              const id = capability._id || capability.id;
              const active = id === activeId;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveId(id)}
                  className={`group rounded-[1.7rem] border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-cyan-300/45 bg-cyan-300/[0.09] shadow-[0_0_45px_rgba(34,211,238,0.1)]"
                      : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          active
                            ? "border-cyan-300/35 bg-cyan-300/10"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>

                      <div>
                        <div className="font-semibold text-white">
                          {capability.shortTitle}
                        </div>

                        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                          {capability.eyebrow}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active
                          ? "animate-pulse bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[2.8rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_120px_rgba(34,211,238,0.09)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 border-b border-white/10 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-cyan-300" />

                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  Global Delivery Command
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Operations active
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="p-7 md:p-9"
              >
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                        <ActiveIcon className="h-8 w-8 text-cyan-300" />
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                        <Radio className="h-4 w-4" />
                        {activeCapability.status}
                      </div>
                    </div>

                    <div className="mt-7 text-xs uppercase tracking-[0.32em] text-cyan-300">
                      {activeCapability.eyebrow}
                    </div>

                    <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                      {activeCapability.title}
                    </h3>

                    <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                      {activeCapability.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {activeCapability.services.map((service: string) => (
                        <div
                          key={service}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                          <span className="text-sm text-slate-200">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#020611]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.055)_1px,transparent_1px)] bg-[size:58px_58px]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_50%)]" />

                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M18 60 C31 40, 39 31, 47 31"
                        fill="none"
                        stroke="rgba(34,211,238,0.55)"
                        strokeWidth="0.45"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3 }}
                      />

                      <motion.path
                        d="M47 31 C52 25, 57 24, 61 25"
                        fill="none"
                        stroke="rgba(34,211,238,0.55)"
                        strokeWidth="0.45"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />

                      <motion.path
                        d="M47 31 C63 43, 72 57, 80 68"
                        fill="none"
                        stroke="rgba(34,211,238,0.55)"
                        strokeWidth="0.45"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 1 }}
                      />

                      {[
                        "M18 60 C31 40, 39 31, 47 31",
                        "M47 31 C52 25, 57 24, 61 25",
                        "M47 31 C63 43, 72 57, 80 68",
                      ].map((path, index) => (
                        <motion.circle
                          key={path}
                          r="0.8"
                          fill="#67e8f9"
                          animate={{
                            offsetDistance: ["0%", "100%"],
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 2.2 + index * 0.45,
                            repeat: Infinity,
                            delay: index * 0.6,
                            ease: "linear",
                          }}
                          style={{
                            offsetPath: `path("${path}")`,
                          }}
                        />
                      ))}
                    </svg>

                    {operatingRegions.map((region, index) => (
                      <motion.div
                        key={region.label}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + index * 0.2,
                        }}
                        style={{
                          left: region.x,
                          top: region.y,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,1)]" />

                        <div className="mt-3 whitespace-nowrap rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-xl">
                          {region.label}
                        </div>
                      </motion.div>
                    ))}

                    <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
                            Delivery network
                          </div>

                          <div className="mt-2 text-sm font-semibold text-white">
                            India · Belgium · UK · Australia
                          </div>
                        </div>

                        <ShieldCheck className="h-5 w-5 text-cyan-300" />
                      </div>
                    </div>
                  </div>
                </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      {activeCapability.metrics.map((metric: { label: string, value: string }) => (
                        <div
                          key={metric.label}
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-5"
                    >
                      <div className="text-2xl font-black text-cyan-300">
                        {metric.value}
                      </div>

                      <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/35">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-cyan-300" />

                      <span className="text-[10px] uppercase tracking-[0.27em] text-slate-400">
                        Live delivery activity
                      </span>
                    </div>

                    <RefreshCcw className="h-4 w-4 animate-spin text-cyan-300 [animation-duration:4s]" />
                  </div>

                  <div className="relative min-h-[115px] px-5 py-6 font-mono text-sm">
                    <div className="text-xs text-slate-600">
                      archon://consulting/{activeCapability.id}/stream
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeCapability.id}-${activityIndex}`}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        className="mt-5 flex items-center gap-3 text-cyan-100"
                      >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                        <span className="text-sm font-mono tracking-wide">
                          {activeCapability.activity[activityIndex]}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Layers3,
              value: "End-to-end",
              label: "Transformation support",
            },
            {
              icon: Workflow,
              value: "Flexible",
              label: "Delivery models",
            },
            {
              icon: Braces,
              value: "Modern",
              label: "Engineering capability",
            },
            {
              icon: ShieldCheck,
              value: "Trusted",
              label: "Enterprise execution",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
              >
                <Icon className="h-6 w-6 text-cyan-300" />

                <div className="mt-5 text-2xl font-black text-white">
                  {item.value}
                </div>

                <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
                </div>

        <div className="mt-6">
          <SAPIndependenceDisclosure variant="compact" />
        </div>
      </div>
    </CinematicSection>

  );
}
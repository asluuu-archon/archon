"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Cpu,
  GraduationCap,
  Network,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CinematicSection from "@/components/ui/CinematicSection";
import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import type {
  Organisation,
  SiteSettings,
} from "@/sanity/types";

type EcosystemTab = "enterprise" | "academic" | "technology";

type EcosystemItem = {
  id: string;
  name: string;
  category: string;
  detail: string;
  region?: string;
  website?: string;
  logoUrl?: string;
};

type EcosystemGroup = {
  eyebrow: string;
  title: string;
  description: string;
  legalNote: string;
  items: EcosystemItem[];
};

type TrustedEcosystemClientProps = {
  organisations: Organisation[];
  settings: SiteSettings | null;
};

const fallbackEnterprise: EcosystemItem[] = [
  {
    id: "fallback-swift",
    name: "SWIFT",
    category: "Financial Infrastructure",
    detail: "Enterprise technology environment",
    region: "Belgium",
  },
  {
    id: "fallback-ing",
    name: "ING Belgium",
    category: "Banking",
    detail: "Technology and consulting exposure",
    region: "Belgium",
  },
  {
    id: "fallback-bnp",
    name: "BNP Paribas",
    category: "Financial Services",
    detail: "Enterprise project experience",
    region: "Europe",
  },
  {
    id: "fallback-sncb",
    name: "SNCB",
    category: "Transportation",
    detail: "Enterprise systems environment",
    region: "Belgium",
  },
  {
    id: "fallback-volvo",
    name: "Volvo",
    category: "Automotive",
    detail: "Global technology exposure",
    region: "Europe",
  },
  {
    id: "fallback-entsoe",
    name: "ENTSO-E",
    category: "Energy",
    detail: "European enterprise environment",
    region: "Europe",
  },
];

const fallbackAcademic: EcosystemItem[] = [
  {
    id: "fallback-rajagiri",
    name: "Rajagiri",
    category: "Academic Collaboration",
    detail: "Industry exposure and learning initiatives",
    region: "Kerala",
  },
  {
    id: "fallback-kmea",
    name: "KMEA",
    category: "Academic Collaboration",
    detail: "Technology and career initiatives",
    region: "Kerala",
  },
  {
    id: "fallback-mes",
    name: "MES",
    category: "Academic Collaboration",
    detail: "Student development initiatives",
    region: "Kerala",
  },
  {
    id: "fallback-aisat",
    name: "AISAT",
    category: "Academic Collaboration",
    detail: "Industry-oriented engagement",
    region: "Kerala",
  },
  {
    id: "fallback-naipunnya",
    name: "Naipunnya",
    category: "Academic Collaboration",
    detail: "Learning and mentorship activities",
    region: "Kerala",
  },
  {
    id: "fallback-maharajas",
    name: "Maharaja's College",
    category: "Academic Collaboration",
    detail: "Career and technology engagement",
    region: "Kerala",
  },
];

const fallbackTechnology: EcosystemItem[] = [
  {
    id: "fallback-sap",
    name: "SAP",
    category: "Enterprise Technology",
    detail: "ERP, analytics, cloud and business platforms",
  },
  {
    id: "fallback-azure",
    name: "Microsoft Azure",
    category: "Cloud",
    detail: "Cloud infrastructure and services",
  },
  {
    id: "fallback-aws",
    name: "AWS",
    category: "Cloud",
    detail: "Infrastructure and application services",
  },
  {
    id: "fallback-openai",
    name: "OpenAI",
    category: "Artificial Intelligence",
    detail: "Generative AI and intelligent applications",
  },
  {
    id: "fallback-next",
    name: "Next.js",
    category: "Web Engineering",
    detail: "Modern digital experiences",
  },
  {
    id: "fallback-react",
    name: "React",
    category: "Frontend Engineering",
    detail: "Interactive web applications",
  },
  {
    id: "fallback-node",
    name: "Node.js",
    category: "Backend Engineering",
    detail: "APIs and application services",
  },
  {
    id: "fallback-python",
    name: "Python",
    category: "AI and Data",
    detail: "Automation, analytics and machine learning",
  },
  {
    id: "fallback-docker",
    name: "Docker",
    category: "DevOps",
    detail: "Containerised application delivery",
  },
];

const tabs: Array<{
  id: EcosystemTab;
  label: string;
  description: string;
}> = [
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Clients and project experience",
  },
  {
    id: "academic",
    label: "Academic",
    description: "Colleges and learning collaborations",
  },
  {
    id: "technology",
    label: "Technology",
    description: "Platforms and tools we build with",
  },
];

function getInitials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function mapOrganisation(
  organisation: Organisation
): EcosystemItem {
  return {
    id: organisation._id,
    name: organisation.name,
    category:
      organisation.industry ??
      organisation.relationshipType
        .replaceAll("-", " ")
        .replace(/\b\w/g, (character) =>
          character.toUpperCase()
        ),
    detail:
      organisation.description ??
      "Part of the connected Archon ecosystem.",
    region: organisation.region,
    website: organisation.website,
    logoUrl: organisation.logoUrl,
  };
}

function getGroups(
  organisations: Organisation[]
): Record<EcosystemTab, EcosystemGroup> {
  const enterpriseItems = organisations
    .filter((organisation) =>
      [
        "selected-client",
        "project-experience",
        "technology-delivery",
      ].includes(organisation.relationshipType)
    )
    .map(mapOrganisation);

  const academicItems = organisations
    .filter(
      (organisation) =>
        organisation.relationshipType === "academic"
    )
    .map(mapOrganisation);

  const technologyItems = organisations
    .filter(
      (organisation) =>
        organisation.relationshipType === "technology-used"
    )
    .map(mapOrganisation);

  return {
    enterprise: {
      eyebrow: "Enterprise Experience",
      title: "Experience shaped across global industries.",
      description:
        "Archon consultants and delivery teams have contributed across financial services, transportation, manufacturing, logistics and enterprise technology environments.",
      legalNote:
        "Project-experience references may include organisations supported by Archon consultants and do not imply a direct commercial relationship in every case.",
      items:
        enterpriseItems.length > 0
          ? enterpriseItems
          : fallbackEnterprise,
    },

    academic: {
      eyebrow: "Academic Collaborations",
      title:
        "Building stronger bridges between education and industry.",
      description:
        "Archon works with colleges and learning organisations through mentorship, workshops, internships, industry exposure and career-readiness initiatives.",
      legalNote:
        "Collaboration scope may vary by institution and may include workshops, mentorship, internships, projects or industry-engagement initiatives.",
      items:
        academicItems.length > 0
          ? academicItems
          : fallbackAcademic,
    },

    technology: {
      eyebrow: "Technology Ecosystem",
      title: "Technologies used to learn, build and deliver.",
      description:
        "Archon works across enterprise platforms, modern software engineering, cloud, data, AI, automation and collaborative product development.",
      legalNote:
        "Technology names indicate platforms and tools used within learning, consulting or product-development activities and do not necessarily indicate formal partnership status.",
      items:
        technologyItems.length > 0
          ? technologyItems
          : fallbackTechnology,
    },
  };
}

function EcosystemItemCard({
  item,
  index,
}: {
  item: EcosystemItem;
  index: number;
}) {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.045,
      }}
      whileHover={{ y: -5 }}
      className="group relative h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.028] p-5 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-[0_0_45px_rgba(34,211,238,0.08)]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/[0.05] blur-3xl transition group-hover:bg-cyan-300/[0.1]" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-xs font-black tracking-[0.12em] text-cyan-300">
          {item.logoUrl ? (
            // Standard img is intentional because Sanity supplies
            // remote image URLs that can change dynamically.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.logoUrl}
              alt={`${item.name} logo`}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            getInitials(item.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-semibold text-white">
            {item.name}
          </div>

          <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-cyan-300">
            {item.category}
          </div>
        </div>

        {item.website && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
        )}
      </div>

      <p className="relative mt-5 text-sm leading-6 text-slate-400">
        {item.detail}
      </p>

      {item.region && (
        <div className="relative mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

          <span className="text-[9px] uppercase tracking-[0.22em] text-slate-500">
            {item.region}
          </span>
        </div>
      )}
    </motion.article>
  );

  if (!item.website) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <a
      href={item.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      aria-label={`Visit ${item.name}`}
    >
      {card}
    </a>
  );
}

export default function TrustedEcosystemClient({
  organisations,
  settings,
}: TrustedEcosystemClientProps) {
  const [activeTab, setActiveTab] =
    useState<EcosystemTab>("enterprise");

  const ecosystemGroups = useMemo(
    () => getGroups(organisations),
    [organisations]
  );

  const activeGroup = ecosystemGroups[activeTab];

  const academicCount = organisations.filter(
    (organisation) =>
      organisation.relationshipType === "academic"
  ).length;

  const enterpriseCount = organisations.filter(
    (organisation) =>
      organisation.relationshipType === "selected-client" ||
      organisation.relationshipType === "project-experience" ||
      organisation.relationshipType === "technology-delivery"
  ).length;

  const metrics = [
    {
      value: settings?.learnersCount ?? 7000,
      suffix: "+",
      label: "Learners influenced",
    },
    {
      value: academicCount || 20,
      suffix: "+",
      label: "Academic relationships",
    },
    {
      value: settings?.globalLocationsCount ?? 4,
      suffix: "",
      label: "Global regions",
    },
    {
      value: enterpriseCount || 12,
      suffix: "+",
      label: "Enterprise connections",
    },
  ];

  return (
    <CinematicSection id="ecosystem" glow="center">
      <HolographicField />
      <SectionBackground word="TRUST" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.055] px-5 py-2.5 backdrop-blur-xl"
          >
            <Network className="h-4 w-4 text-cyan-300" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Trusted Ecosystem
            </span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 text-balance text-5xl font-bold leading-[1.03] text-white md:text-7xl"
          >
            Built together.
            <br />

            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              Growing through trust.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300"
          >
            Every learner, consultant, institution, organisation
            and technology relationship has helped shape the
            Archon ecosystem.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-px overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="relative overflow-hidden bg-[#07111f]/90 px-7 py-8 backdrop-blur-xl"
            >
              <motion.div
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scaleX: [0.25, 1, 0.25],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.45,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
              />

              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                duration={1.8 + index * 0.2}
                className="text-4xl font-black text-cyan-300"
              />

              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -3 }}
                className={`rounded-[1.8rem] border p-5 text-left transition-all duration-300 ${
                  active
                    ? "border-cyan-300/45 bg-cyan-300/[0.09] shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                    : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        active
                          ? "text-cyan-300"
                          : "text-white"
                      }`}
                    >
                      {tab.label}
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      {tab.description}
                    </div>
                  </div>

                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      active
                        ? "animate-pulse bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)]"
                        : "bg-white/20"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_140px_rgba(34,211,238,0.09)] backdrop-blur-2xl">
          <div className="flex flex-col gap-5 border-b border-white/10 px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-header`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-300">
                  {activeGroup.eyebrow}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  {activeGroup.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />

              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                Relationship transparency
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(7px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -18,
                filter: "blur(5px)",
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-7 md:p-9"
            >
              <p className="max-w-4xl text-base leading-8 text-slate-300">
                {activeGroup.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {activeGroup.items.map((item, index) => (
                  <EcosystemItemCard
                    key={item.id}
                    item={item}
                    index={index}
                  />
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-xs leading-6 text-slate-500">
                  {activeGroup.legalNote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mt-8 flex flex-col gap-6 rounded-[2.3rem] border border-cyan-300/15 bg-cyan-300/[0.045] p-7 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10">
              {activeTab === "enterprise" ? (
                <Building2 className="h-6 w-6 text-cyan-300" />
              ) : activeTab === "academic" ? (
                <GraduationCap className="h-6 w-6 text-cyan-300" />
              ) : (
                <Cpu className="h-6 w-6 text-cyan-300" />
              )}
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-cyan-300">
                Built through collaboration
              </div>

              <p className="mt-3 max-w-3xl text-lg leading-8 text-white">
                Every connection represents a relationship built
                through trust, learning and meaningful outcomes.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="group flex shrink-0 items-center justify-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.13]"
          >
            Build with Archon

            <ArrowUpRight className="h-4 w-4 text-cyan-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </CinematicSection>
  );
}
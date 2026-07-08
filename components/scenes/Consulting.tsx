import {
  BriefcaseBusiness,
  Code2,
  Cpu,
  DatabaseZap,
  Layers3,
  UsersRound,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import SectionBackground from "@/components/ui/SectionBackground";

const services = [
  {
    title: "SAP Consulting",
    description:
      "Enterprise SAP advisory, solution architecture and digital transformation.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Implementation Support",
    description:
      "Planning, realization, testing, deployment and hypercare support.",
    icon: Layers3,
  },
  {
    title: "Migration & Integration",
    description:
      "Seamless migration and integration between SAP and enterprise platforms.",
    icon: DatabaseZap,
  },
  {
    title: "Resource Augmentation",
    description:
      "Experienced consultants to strengthen project delivery teams.",
    icon: UsersRound,
  },
  {
    title: "AI & Automation",
    description:
      "AI-powered business automation and intelligent enterprise workflows.",
    icon: Cpu,
  },
  {
    title: "Enterprise Development",
    description:
      "Custom enterprise applications tailored around business processes.",
    icon: Code2,
  },
];

export default function Consulting() {
  return (
    <section id="consulting" className="relative overflow-hidden bg-[#050816] py-40">
      <SectionBackground word="CONSULTING" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="CONSULTING"
          title="From learning outcomes to enterprise outcomes."
          description="Archon supports organizations through SAP consulting, software engineering, AI, integrations and technology transformation."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <GlowCard key={service.title} delay={index * 0.08}>
                <Icon className="mb-8 h-10 w-10 text-cyan-300 transition duration-300 group-hover:scale-110" />

                <h3 className="text-2xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-5 leading-7 text-slate-300">
                  {service.description}
                </p>

                <div className="mt-auto pt-10 text-sm font-semibold tracking-wide text-cyan-300">
                  Explore capability →
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
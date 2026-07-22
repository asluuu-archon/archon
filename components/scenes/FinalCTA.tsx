"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Radio,
  Rocket,
  Sparkles,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import HolographicField from "@/components/effects/HolographicField";
import SectionBackground from "@/components/ui/SectionBackground";
import { archonContact, getWhatsAppEnquiryLink } from "@/lib/contact";

const pathways = [
  {
    id: "learning",
    label: "Start Learning",
    eyebrow: "For learners",
    title: "Build the skills your future needs.",
    description:
      "Explore mentorship-led learning pathways, practical projects and career direction across SAP, software, data, AI, cloud and cybersecurity.",
    icon: GraduationCap,
    options: [
      "Career-path guidance",
      "SAP mentorship programs",
      "Software and technology programs",
      "Internship and project exposure",
    ],
  },
  {
    id: "consulting",
    label: "Work With Archon",
    eyebrow: "For organisations",
    title: "Turn technology into business outcomes.",
    description:
      "Connect with Archon for SAP consulting, enterprise development, migration, integration, staffing, cloud and automation requirements.",
    icon: BriefcaseBusiness,
    options: [
      "SAP consulting",
      "Enterprise software development",
      "Migration and integration",
      "Resource augmentation",
    ],
  },
  {
    id: "products",
    label: "Explore Products",
    eyebrow: "For collaborators",
    title: "Help build the next Archon product.",
    description:
      "Discover SAP Guru Assistant, AI Command Center, ArchRoom and the product ideas emerging from Archon Future Labs.",
    icon: Bot,
    options: [
      "SAP Guru Assistant",
      "AI Command Center",
      "ArchRoom",
      "Product collaboration",
    ],
  },
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const [activeId, setActiveId] = useState(pathways[0].id);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");

  const activePathway = useMemo(
    () => pathways.find((pathway) => pathway.id === activeId) ?? pathways[0],
    [activeId]
  );

  const ActiveIcon = activePathway.icon;
  const whatsAppEnquiryHref = getWhatsAppEnquiryLink(
    `Hello Archon, I would like to speak with an advisor about ${activePathway.label.toLowerCase()}.`
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState === "submitting") {
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setSubmissionState("submitting");
    setSubmissionError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          phone: String(form.get("phone") ?? "").trim(),
          interest: String(form.get("interest") ?? "").trim(),
          message: String(form.get("message") ?? "").trim(),
          pathway: activePathway.id,
          pathwayLabel: activePathway.label,
          website: String(form.get("website") ?? ""),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error ?? "We could not send your enquiry at the moment."
        );
      }

      formElement.reset();
      setSubmissionState("success");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry at the moment."
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white md:py-44"
    >
      <HolographicField />
      <SectionBackground word="ARCHON" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.055] blur-[190px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-2.5 backdrop-blur-xl"
          >
            <Radio className="h-4 w-4 text-cyan-300" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-200">
              Begin Your Journey
            </span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 text-balance text-5xl font-bold leading-[1.03] md:text-7xl lg:text-8xl"
          >
            The next success story
            <br />

            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              could be yours.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300"
          >
            Learn a skill. Solve a business problem. Build a product. Start a
            global journey. Archon exists to help turn ambition into outcome.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;
            const active = pathway.id === activeId;

            return (
              <motion.button
                key={pathway.id}
                type="button"
                onClick={() => {
                  setActiveId(pathway.id);
                  setSubmissionState("idle");
                  setSubmissionError("");
                }}
                whileHover={{ y: -6 }}
                className={`group rounded-[2rem] border p-6 text-left transition-all duration-300 ${
                  active
                    ? "border-cyan-300/45 bg-cyan-300/[0.09] shadow-[0_0_60px_rgba(34,211,238,0.12)]"
                    : "border-white/10 bg-white/[0.025] hover:border-cyan-300/25 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-[1.3rem] border ${
                      active
                        ? "border-cyan-300/35 bg-cyan-300/10"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="h-7 w-7 text-cyan-300" />
                  </div>

                  <span
                    className={`mt-2 h-2.5 w-2.5 rounded-full ${
                      active
                        ? "animate-pulse bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]"
                        : "bg-white/20"
                    }`}
                  />
                </div>

                <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-cyan-300">
                  {pathway.eyebrow}
                </div>

                <div className="mt-3 text-xl font-semibold text-white">
                  {pathway.label}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {pathway.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-7 overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-[#050b17]/85 shadow-[0_0_150px_rgba(34,211,238,0.1)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 border-b border-white/10 px-7 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                Archon Connection Hub
              </span>
            </div>

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Advisor conversation ready
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePathway.id}
              initial={{
                opacity: 0,
                y: 28,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-10 p-7 md:p-10 xl:grid-cols-[0.82fr_1.18fr]"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10">
                  <ActiveIcon className="h-8 w-8 text-cyan-300" />
                </div>

                <div className="mt-8 text-xs uppercase tracking-[0.34em] text-cyan-300">
                  {activePathway.eyebrow}
                </div>

                <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                  {activePathway.title}
                </h3>

                <p className="mt-6 max-w-xl leading-8 text-slate-300">
                  {activePathway.description}
                </p>

                <div className="mt-8 space-y-3">
                  {activePathway.options.map((option, index) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08 + index * 0.08,
                      }}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />

                      <span className="text-sm text-slate-200">{option}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href={archonContact.emailHref}
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.05]"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-cyan-300" />

                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                        Email Archon
                      </div>

                      <div className="mt-1 truncate text-sm font-semibold text-white">
                        {archonContact.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={archonContact.phoneHref}
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.05]"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-cyan-300" />

                    <div>
                      <div className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                        Call Archon
                      </div>

                      <div className="mt-1 text-sm font-semibold text-white">
                        {archonContact.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={whatsAppEnquiryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/[0.045] p-5 transition hover:border-emerald-300/45 hover:bg-emerald-400/[0.08]"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0 text-emerald-300" />

                    <div>
                      <div className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                        WhatsApp
                      </div>

                      <div className="mt-1 text-sm font-semibold text-white">
                        {archonContact.whatsapp}
                      </div>
                    </div>
                  </a>

                  <a
                    href={archonContact.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.05]"
                  >
                    <MapPin className="h-5 w-5 shrink-0 text-cyan-300" />

                    <div>
                      <div className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                        Kochi office
                      </div>

                      <div className="mt-1 text-sm font-semibold text-white">
                        Edappally, Ernakulam
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative rounded-[2.3rem] border border-white/10 bg-[#020611]/75 p-6 md:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor="archon-website-field">Leave this empty</label>
                  <input
                    id="archon-website-field"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-cyan-300" />

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                      Send an enquiry
                    </div>

                    <div className="mt-2 text-lg font-semibold text-white">
                      Tell us how Archon can help
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                      Your name
                    </span>

                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      placeholder="Enter your name"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-white/[0.055]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                      Email address
                    </span>

                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={160}
                      placeholder="name@example.com"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-white/[0.055]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                      Phone number
                    </span>

                    <input
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={40}
                      placeholder="Optional"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-white/[0.055]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                      Area of interest
                    </span>

                    <select
                      required
                      name="interest"
                      defaultValue={activePathway.options[0]}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-300/45"
                    >
                      {activePathway.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                    Message
                  </span>

                  <textarea
                    required
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Briefly tell us what you are looking for..."
                    className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-white/[0.055]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={submissionState === "submitting"}
                  className="group mt-5 flex w-full items-center justify-between rounded-2xl bg-cyan-300 px-5 py-4 font-semibold text-[#031018] transition duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_0_40px_rgba(34,211,238,0.22)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  <span>
                    {submissionState === "submitting"
                      ? "Sending securely…"
                      : submissionState === "success"
                        ? "Enquiry sent"
                        : "Send enquiry"}
                  </span>

                  {submissionState === "success" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </button>

                <div aria-live="polite" className="mt-4">
                  {submissionState === "success" && (
                    <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-sm leading-6 text-emerald-100">
                      Thank you. Your enquiry is with the Archon team. If your
                      request is time-sensitive, you can also reach us on WhatsApp.
                    </p>
                  )}

                  {submissionState === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm leading-6 text-rose-100"
                    >
                      {submissionError} Please try again or contact Archon through
                      WhatsApp or phone.
                    </p>
                  )}

                  {submissionState === "idle" && (
                    <p className="flex items-center justify-center gap-2 text-center text-[9px] uppercase tracking-[0.17em] text-slate-500">
                      <Rocket className="h-3.5 w-3.5 text-cyan-300" />
                      Your details are used only to respond to this enquiry
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              Visit Archon
            </div>
            <div className="mt-3 text-lg font-semibold text-white">
              Kochi, Kerala, India
            </div>
          </div>
          <a
            href={archonContact.mapHref}
            target="_blank"
            rel="noreferrer"
            className="text-sm leading-6 text-slate-400 transition hover:text-cyan-100"
          >
            {archonContact.address}
          </a>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 text-center md:grid-cols-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Dream without limits.
          </div>

          <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">
            Build with purpose.
          </div>

          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Archon · Since 2013
          </div>
        </div>
      </div>
    </section>
  );
}

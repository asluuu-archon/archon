import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Globe2,
  GraduationCap,
  Network,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

import type { ConsultingService, Program } from "@/lib/sanity.types";
import { getWhatsAppEnquiryLink } from "@/lib/contact";
import { displayProgramTitle } from "@/lib/program-titles";
import { ylaamProducts } from "@/lib/ylaam-products";

type StaticHomeSectionsProps = {
  programs: Program[];
  consultingServices: ConsultingService[];
};

const fallbackPrograms = [
  {
    title: "ERP Career Programs",
    description:
      "Build an enterprise technology career with practical ERP learning, mentorship and meaningful project exposure.",
    href: "/programs/sap-career-programs",
    label: "Enterprise careers",
  },
  {
    title: "AI Software Development",
    description:
      "Learn to design, build and ship modern digital products with rigorous engineering foundations.",
    href: "/programs/software-development",
    label: "Product engineering",
  },
  {
    title: "Data, AI & Analytics",
    description:
      "Translate data into decisions with applied analytics, AI capability and business context.",
    href: "/programs/data-ai-analytics",
    label: "Intelligent systems",
  },
];

const fallbackServices = [
  {
    title: "SAP & Enterprise Transformation",
    description:
      "Bring clarity to complex enterprise systems through experienced SAP consulting, integration and delivery support.",
  },
  {
    title: "Software & Digital Platforms",
    description:
      "Create resilient applications, connected workflows and digital experiences designed around business outcomes.",
  },
  {
    title: "Cloud, Data & Intelligent Automation",
    description:
      "Modernise operations with cloud capability, analytics and automation that earns its place in the workflow.",
  },
];

const principles = [
  {
    icon: GraduationCap,
    title: "Skills over certificates",
    body: "Our programs focus on what people can actually do on the job—not just what they can list on a resume.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Solve what matters",
    body: "Better outcomes start with the right problem. We identify what is slowing the business down and improve the process, system or decision that will turn that change into a measurable result.",
  },
  {
    icon: Cpu,
    title: "Technology that moves the business forward",
    body: "The right technology should make work simpler, faster and more effective. We bring in ERP, software and AI where they create a meaningful difference.",
  },
  {
    icon: Globe2,
    title: "Progress that lasts",
    body: "The goal is not just to solve today’s problem, but to leave people, teams and businesses stronger for what comes next.",
  },
];

const progressMarkers = [
  ["01", "Find direction", "Clarify the opportunity, the problem and the next meaningful move."],
  ["02", "Build capability", "Learn through applied work, relevant tools and expert perspective."],
  ["03", "Create momentum", "Turn new clarity into a career move, stronger team or better business outcome."],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-cyan-300">
      <span className="h-px w-9 bg-cyan-300/60" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">{children}</span>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-8 text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-600 md:px-8">
      <span className="h-px flex-1 bg-white/10" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function StaticHomeSections({
  programs,
  consultingServices,
}: StaticHomeSectionsProps) {
  const learningPaths =
    programs.length > 0
      ? programs.slice(0, 4).map((program) => ({
          title: displayProgramTitle(program.title),
          description: program.description,
          href: `/programs/${program.slug.current}`,
          label: program.label,
        }))
      : fallbackPrograms;
  const services = consultingServices.length > 0 ? consultingServices.slice(0, 4) : fallbackServices;

  return (
    <>
      <SectionDivider label="The Archon ecosystem" />

      <section id="problem" className="relative px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <Eyebrow>Why Archon</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Progress should feel
              <span className="block text-slate-400">more possible.</span>
            </h2>
          </div>
          <div className="max-w-2xl space-y-5 lg:pb-2">
            <p className="text-lg font-medium leading-8 text-slate-200 md:text-xl">
              The right next step can change everything.
            </p>
            <p className="text-lg leading-8 text-slate-300 md:text-xl">
              Whether it is choosing a career, building new capabilities or improving how a business
              operates, progress comes from knowing what to do next. We make those next steps
              clearer, practical and achievable.
            </p>
            <p className="leading-7 text-slate-400">
              Archon brings training, consulting, and software delivery together so students,
              professionals, and organisations can move from intention to practical results.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-7 transition-colors hover:border-cyan-300/25 hover:bg-white/[0.045]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08]">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="mt-7 text-lg font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <SectionDivider label="From one belief to a connected ecosystem" />

      <section id="stories" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.13),transparent_46%),rgba(7,17,31,0.88)] p-8 md:p-11">
            <Eyebrow>Since 2013</Eyebrow>
            <div className="mt-10 text-6xl font-black tracking-[-0.06em] text-cyan-300 md:text-8xl">2013</div>
            <p className="mt-5 max-w-sm text-lg leading-8 text-slate-300">
              A belief that meaningful work begins when people are trusted with real capability.
            </p>
            <div className="mt-12 flex items-center gap-3 text-sm font-medium text-cyan-200">
              <Network className="h-5 w-5" />
              Learning, consulting and innovation — connected.
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
              People are at the heart
              <span className="block text-slate-400">of every outcome.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              Careers, businesses and technology may look very different, but progress always begins
              with people.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              That thinking shapes everything at Archon — how we prepare people for the work ahead,
              how we solve business problems, how we build technology and how we work with our
              partners.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              We keep things practical, stay curious and measure our work by the difference it makes.
            </p>
            <Link href="/about" className="group mt-9 inline-flex w-fit items-center gap-3 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
              Discover the Archon story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>How progress happens</Eyebrow>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {progressMarkers.map(([number, title, copy]) => (
              <div key={number} className="relative border-l border-cyan-300/25 pl-6">
                <div className="font-mono text-xs tracking-[0.28em] text-cyan-300">{number}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="Learning" />

      <section id="learning" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Build capability</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
              Learn by building.
              <span className="block text-slate-400">Grow through outcomes.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Our learning pathways combine direction, practical work, mentorship and career preparation for people who want their next move to be grounded in genuine skill.
            </p>
          </div>
          <Link href="/programs" className="group inline-flex items-center gap-3 self-start rounded-full border border-cyan-300/25 px-6 py-3.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-300/10 lg:self-auto">
            Explore learning programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-2">
          {learningPaths.map((program, index) => (
            <Link key={program.href} href={program.href} className="group rounded-[1.8rem] border border-white/10 bg-[#07111f]/75 p-8 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#091727]">
              <div className="flex items-center justify-between gap-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300">{program.label || `Learning pathway ${index + 1}`}</span>
                <GraduationCap className="h-5 w-5 text-cyan-300/70" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white">{program.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{program.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Explore pathway <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider label="Enterprise consulting" />

      <section id="consulting" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Enterprise outcomes</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
              From complex systems
              <span className="block text-slate-400">to clearer decisions.</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Archon partners with organisations that want practical progress across enterprise systems, software, data, cloud and intelligent automation.
            </p>
            <Link href="/consulting" className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
              Explore consulting capability <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <article key={`${service.title}-${index}`} className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-7 transition hover:border-cyan-300/25">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300">0{index + 1} / Consulting</div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <Blocks className="h-5 w-5 shrink-0 text-cyan-300/70" />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-400">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="border-y border-white/[0.07] bg-[radial-gradient(circle_at_78%_10%,rgba(34,211,238,0.1),transparent_30%),rgba(255,255,255,0.012)] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Eyebrow>Products & innovation</Eyebrow>
              <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
                Possibility becomes progress
                <span className="block text-slate-400">when it is made useful.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Archon’s product ecosystem lives in YLAAM — focused platforms for operations,
                engagement, learning, meetings, AI guidance and organisation control.
              </p>
            </div>
            <a
              href="https://ylaam.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200 lg:self-auto"
            >
              Explore YLAAM <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ylaamProducts.map((product) => (
              <a
                key={product.id}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#07111f]/75 transition hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <div className="relative h-44 overflow-hidden border-b border-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {product.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white transition group-hover:text-cyan-200">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{product.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-6 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Insights that move work forward</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-5xl">Learn. Question. Build better.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Practical context and original thinking from across Archon’s technology, careers and innovation ecosystem.</p>
          </div>
          <Link href="/insights" className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">Read Archon Insights <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_36%),#07111f] p-8 md:p-14">
          <div className="max-w-3xl">
            <Eyebrow>The next move</Eyebrow>
            <h2 className="mt-7 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">What would meaningful progress look like for you?</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Whether you are building a career, improving an enterprise workflow or exploring a digital product, we would like to understand the opportunity before recommending a path.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={getWhatsAppEnquiryLink("Hi Archon, I would like to talk to an advisor.")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 py-4 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200"
              >
                Talk to an advisor <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/programs" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.06]">Explore learning paths <Rocket className="h-4 w-4 text-cyan-300" /></Link>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-cyan-300" /> People-first discovery</span><span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-cyan-300" /> Outcome-led thinking</span><span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-300" /> Purposeful innovation</span></div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe2,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { archonContact } from "@/lib/contact";
import { partnerLogos, withoutDuplicatePartners } from "@/lib/partners";
import { ORGANISATIONS_QUERY, TEAM_QUERY } from "@/lib/sanity.queries";
import { safeSanityFetch } from "@/lib/sanity.safe";
import type { Organisation, TeamMember } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { urlForSanityImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About Archon Solutions | Enterprise Growth Ecosystem",
  description:
    "Discover Archon Solutions: a Kerala-founded global ecosystem connecting practical learning, enterprise consulting, technology and purposeful career growth.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Archon Solutions",
    description:
      "Discover the global Archon ecosystem for practical learning, enterprise consulting, technology and career growth.",
    url: absoluteUrl("/about"),
  },
};

const ecosystem = [
  {
    title: "Learning",
    description:
      "Outcome-led pathways that help learners turn knowledge into real professional capability.",
  },
  {
    title: "Consulting",
    description:
      "Technology advisory and enterprise delivery designed around lasting operational value.",
  },
  {
    title: "Products",
    description:
      "Digital products and platforms that extend what people and organisations can accomplish.",
  },
  {
    title: "Community",
    description:
      "A connected network for learners, practitioners, partners and thoughtful builders.",
  },
  {
    title: "Innovation",
    description:
      "Responsible exploration of AI and emerging technology with practical use at the centre.",
  },
  {
    title: "Careers",
    description:
      "Opportunities for people who want their work to create meaningful progress.",
  },
];

const locations = [
  {
    country: "India",
    city: "Kerala",
    role: "Learning ecosystem and operational foundation.",
  },
  {
    country: "Belgium",
    city: "Brussels",
    role: "Consulting delivery and European client relationships.",
  },
  {
    country: "Australia",
    city: "Sydney",
    role: "Global learner support and innovation ambitions.",
  },
  {
    country: "United Kingdom",
    city: "United Kingdom",
    role: "Growing technology and student opportunity network.",
  },
];

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteUrl}/about/#webpage`,
  url: absoluteUrl("/about"),
  name: "About Archon Solutions",
  description:
    "Learn about Archon Solutions, a global technology ecosystem for practical learning, enterprise consulting, technology and career growth.",
  about: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default async function AboutPage() {
  const [organisationsRaw, team] = await Promise.all([
    safeSanityFetch<Organisation[]>({
      query: ORGANISATIONS_QUERY,
      tags: ["organisations"],
      defaultValue: [],
    }),
    safeSanityFetch<TeamMember[]>({
      query: TEAM_QUERY,
      tags: ["team"],
      defaultValue: [],
    }),
  ]);
  const organisations = withoutDuplicatePartners(organisationsRaw);

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-cyan-300">
                <div className="h-px w-8 bg-cyan-300/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  The Archon story
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Built for the people
                <br />
                <span className="text-slate-400">who make progress real.</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl">
                Founded in Kerala in 2013, Archon has grown from a focused
                learning initiative into a global technology ecosystem. We
                help individuals and organisations build practical capability
                through mentorship, projects, consulting and outcome-led growth.
              </p>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7">
              <Sparkles className="h-6 w-6 text-cyan-300" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Our belief
              </p>
              <p className="mt-3 text-xl font-medium leading-relaxed text-slate-100">
                Learning should prepare people for the real world, not merely
                for the next exam.
              </p>
            </aside>
          </section>

          <section className="mt-20 grid gap-6 md:grid-cols-2" aria-label="Mission and vision">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Mission</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Make growth practical.</h2>
              <p className="mt-5 leading-relaxed text-slate-400">
                We help people and organisations grow through practical
                knowledge, responsible technology and outcome-focused execution.
                Every experience should move someone closer to meaningful work.
              </p>
            </div>
            <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Vision</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Connect potential to purpose.</h2>
              <p className="mt-5 leading-relaxed text-slate-300">
                We are building one premium ecosystem where learning,
                consulting, products, AI and community work together so that
                people can dream without limits and build with intention.
              </p>
            </div>
          </section>

          <section className="mt-24" aria-labelledby="ecosystem">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-300">One connected ecosystem</p>
              <h2 id="ecosystem" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Different paths. One standard of meaningful progress.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystem.map((item, index) => (
                <article
                  key={item.title}
                  className="group rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.04]"
                >
                  <span className="text-sm font-medium text-cyan-300">0{index + 1}</span>
                  <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24" aria-labelledby="partners">
              <div className="flex items-center gap-3 text-cyan-300">
                <Building2 className="h-5 w-5" />
                <p className="text-sm font-medium">Trusted relationships</p>
              </div>
              <h2 id="partners" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Partners in practical progress.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                Organisations where Archon people have built delivery experience across enterprise
                systems, banking, telecom and technology services.
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {partnerLogos.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-28 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-6 py-5"
                  >
                    <span
                      role="img"
                      aria-label={partner.name}
                      title={partner.name}
                      className="block h-10 w-full max-w-[11rem] bg-slate-300 opacity-80 transition hover:opacity-100"
                      style={{
                        maskImage: `url(${partner.src})`,
                        WebkitMaskImage: `url(${partner.src})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  </li>
                ))}
              </ul>

              {organisations.length > 0 ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {organisations.map((organisation) => (
                    <article
                      key={organisation._id}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6"
                    >
                      {organisation.logo ? (
                        <img
                          src={urlForSanityImage(organisation.logo)
                            .width(320)
                            .height(96)
                            .fit("max")
                            .auto("format")
                            .url()}
                          alt={organisation.name}
                          className="h-10 w-full object-contain object-left opacity-80 grayscale brightness-200 contrast-125"
                        />
                      ) : (
                        <div className="flex h-10 items-center text-sm font-semibold text-slate-200">
                          {organisation.name}
                        </div>
                      )}
                      <h3 className="mt-6 font-medium text-white">{organisation.name}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {organisation.relationshipType}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>

          {team.length > 0 && (
            <section className="mt-24" aria-labelledby="team">
              <div className="flex items-center gap-3 text-cyan-300">
                <UsersRound className="h-5 w-5" />
                <p className="text-sm font-medium">The people behind the work</p>
              </div>
              <h2 id="team" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                A team that stays close to the outcome.
              </h2>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                  <article
                    key={member._id}
                    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02]"
                  >
                    {member.image && (
                      <img
                        src={urlForSanityImage(member.image).width(720).height(560).fit("crop").auto("format").url()}
                        alt={member.name}
                        className="h-56 w-full object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="mt-1 text-sm font-medium text-cyan-300">{member.role}</p>
                      {member.bio && <p className="mt-4 text-sm leading-relaxed text-slate-400">{member.bio}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-24" aria-labelledby="presence">
            <div className="flex items-center gap-3 text-cyan-300">
              <Globe2 className="h-5 w-5" />
              <p className="text-sm font-medium">Global perspective</p>
            </div>
            <h2 id="presence" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Rooted in Kerala. Working across borders.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {locations.map((location) => (
                <article
                  key={location.country}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6"
                >
                  <MapPin className="h-5 w-5 text-cyan-300" />
                  <h3 className="mt-6 text-lg font-semibold">{location.country}</h3>
                  <p className="mt-1 text-sm text-cyan-300">{location.city}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{location.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-20 flex flex-col items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold">Ready to build the next outcome?</h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                Whether you are shaping a career, a capability programme or an
                enterprise initiative, we can help you find the right next move.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

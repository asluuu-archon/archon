import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MonitorSmartphone,
  Send,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { archonContact } from "@/lib/contact";
import { safeSanityFetch } from "@/lib/sanity.safe";
import { CAREER_BY_SLUG_QUERY, CAREERS_QUERY } from "@/lib/sanity.queries";
import type { Career } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";

type CareerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const employmentLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const schemaEmploymentTypes: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
};

const workModeLabels: Record<NonNullable<Career["workMode"]>, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

async function getCareer(slug: string) {
  return safeSanityFetch<Career | null>({
    query: CAREER_BY_SLUG_QUERY,
    params: { slug },
    tags: [`career:${slug}`, "career"],
    defaultValue: null,
  });
}

function formatDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function makeApplicationHref(career: Career) {
  if (career.applyUrl) return career.applyUrl;

  const email = career.applyEmail || archonContact.email;
  const subject = `Application: ${career.title}`;
  const body = `Hello Archon team,\n\nI would like to apply for the ${career.title} role.\n\nName:\nPhone:\nLinkedIn / portfolio:\n\nA short note on why I am a fit:\n`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function createJobDescription(career: Career) {
  const sections = [career.description];

  if (career.responsibilities?.length) {
    sections.push(`Responsibilities: ${career.responsibilities.join("; ")}`);
  }

  if (career.requirements?.length) {
    sections.push(`Requirements: ${career.requirements.join("; ")}`);
  }

  return sections.filter(Boolean).join("\n\n");
}

export async function generateStaticParams() {
  const careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    tags: ["career"],
    defaultValue: [],
  });

  return careers.map((career) => ({
    slug: career.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareer(slug);

  if (!career) {
    return {
      title: "Role Not Found | Archon Solutions",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = career.seoTitle ?? `${career.title} | Careers at Archon`;
  const description = career.seoDescription ?? career.description;
  const url = absoluteUrl(`/careers/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "Archon Solutions",
    },
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = await getCareer(slug);

  if (!career) notFound();

  const applicationHref = makeApplicationHref(career);
  const publishedDate = formatDate(career.publishedDate);
  const closingDate = formatDate(career.closingDate);
  const roleUrl = absoluteUrl(`/careers/${slug}`);

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: career.title,
    description: createJobDescription(career),
    datePosted: career.publishedDate,
    validThrough: career.closingDate,
    employmentType: schemaEmploymentTypes[career.employmentType] ?? career.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Archon Solutions",
      sameAs: siteUrl,
    },
    jobLocationType:
      career.workMode === "remote" || career.workMode === "hybrid" ? "TELECOMMUTE" : undefined,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.location,
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements:
      career.workMode === "remote"
        ? {
            "@type": "Country",
            name: "India",
          }
        : undefined,
    directApply: Boolean(career.applyUrl),
    identifier: {
      "@type": "PropertyValue",
      name: "Archon Solutions",
      value: career._id,
    },
    url: roleUrl,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <article className="mx-auto max-w-4xl px-4 md:px-6">
          <Link
            href="/careers"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Careers
          </Link>

          <header className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {career.department}
            </p>
            <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {career.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {career.description}
            </p>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Employment</p>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {employmentLabels[career.employmentType] ?? career.employmentType}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-slate-200">{career.location}</p>
                </div>
              </div>

              {career.workMode && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <MonitorSmartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Work mode</p>
                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {workModeLabels[career.workMode]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {(publishedDate || closingDate) && (
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                {publishedDate && <span>Posted {publishedDate}</span>}
                {closingDate && <span>Apply by {closingDate}</span>}
              </div>
            )}
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="space-y-10">
              {career.responsibilities?.length ? (
                <section aria-labelledby="responsibilities">
                  <h2 id="responsibilities" className="text-2xl font-semibold tracking-tight">
                    What you will do
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {career.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {career.requirements?.length ? (
                <section aria-labelledby="requirements" className="border-t border-white/10 pt-10">
                  <h2 id="requirements" className="text-2xl font-semibold tracking-tight">
                    What will help you succeed
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {career.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {career.content?.length ? (
                <section className="border-t border-white/10 pt-10">
                  <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:text-slate-300 prose-li:text-slate-300">
                    <PortableText value={career.content} />
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="h-fit rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-6 lg:sticky lg:top-28">
              <Send className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-5 text-xl font-semibold">Ready to apply?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Send your profile, CV and a short note explaining why this role
                is the right next step for you.
              </p>
              <a
                href={applicationHref}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
              >
                Apply for this role
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={archonContact.emailHref}
                className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Mail className="h-4 w-4" />
                {archonContact.email}
              </a>
              {closingDate && (
                <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Applications close {closingDate}.
                </p>
              )}
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

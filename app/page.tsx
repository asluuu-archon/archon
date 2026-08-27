import type { Metadata } from "next";

import DeferredHomeTools from "@/components/effects/DeferredHomeTools";
import PageAtmosphere from "@/components/effects/PageAtmosphere";
import StaticHomeSections from "@/components/home/StaticHomeSections";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Arrival from "@/components/scenes/Arrival";
import { sanityFetch } from "@/lib/sanity.client";
import { CONSULTING_SERVICES_QUERY, PROGRAMS_QUERY } from "@/lib/sanity.queries";
import type { ConsultingService, Program } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archon Solutions | Learning, Consulting & Enterprise Innovation",
  description:
    "Archon Solutions connects practical learning, SAP and enterprise consulting, digital products, AI and global career growth.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Archon Solutions | Learning, Consulting & Enterprise Innovation",
    description:
      "Practical learning, enterprise consulting, digital products and AI for meaningful progress.",
    url: absoluteUrl("/"),
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: absoluteUrl("/"),
  name: "Archon Solutions | Learning, Consulting & Enterprise Innovation",
  description:
    "Archon Solutions connects practical learning, SAP and enterprise consulting, digital products, AI and global career growth.",
  about: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default async function Home() {
  const [programs, consultingServices] = await Promise.all([
    sanityFetch<Program[]>({
      query: PROGRAMS_QUERY,
      tags: ["program"],
    }),
    sanityFetch<ConsultingService[]>({
      query: CONSULTING_SERVICES_QUERY,
      tags: ["consultingService"],
    }),
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <PageAtmosphere />
      <Navbar />
      <DeferredHomeTools />

      <div className="relative z-10">
        <Arrival />
        <StaticHomeSections
          programs={programs || []}
          consultingServices={consultingServices || []}
        />
        <Footer />
      </div>
    </main>
  );
}

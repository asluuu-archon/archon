import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Cpu, Building2, Globe2 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { safeSanityFetch } from "@/lib/sanity.safe";
import { CONSULTING_SERVICES_QUERY } from "@/lib/sanity.queries";
import { ConsultingService } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enterprise Consulting | Archon Solutions",
  description:
    "Archon supports organisations through SAP consulting, software engineering, integration, staffing, cloud and intelligent automation.",
  alternates: {
    canonical: absoluteUrl("/consulting"),
  },
  openGraph: {
    title: "Enterprise Consulting | Archon Solutions",
    description:
      "SAP consulting, software engineering, integration, staffing, cloud and intelligent automation for enterprise outcomes.",
    url: absoluteUrl("/consulting"),
  },
};

const icons = [BriefcaseBusiness, Cpu, Building2, Globe2];

export default async function ConsultingIndexPage() {
  const services = await safeSanityFetch<ConsultingService[]>({
    query: CONSULTING_SERVICES_QUERY,
    tags: ["consultingService"],
    defaultValue: [],
  });

  // AEO/SEO: Service Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Archon Enterprise Consulting",
    "provider": {
      "@type": "Organization",
      "name": "Archon Solutions",
      "sameAs": siteUrl
    },
    "description": "Enterprise transformation, SAP consulting, software engineering, and global delivery capability.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Enterprise Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-cyan-300">
              <div className="h-px w-8 bg-cyan-300/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Industry</span>
            </div>
            
            <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
              From learning outcomes<br />
              <span className="text-slate-400">to enterprise outcomes.</span>
            </h1>
            
            <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl">
              Archon supports organisations through SAP consulting, software engineering, integration, staffing, cloud and intelligent automation across a global delivery network.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = icons[index % icons.length];
                
                return (
                  <div
                    key={service._id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.04]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                          <Icon className="h-6 w-6 text-cyan-300" />
                        </div>
                      </div>
                      
                      <h2 className="mt-8 text-2xl font-semibold text-white">
                        {service.title}
                      </h2>
                      
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        {service.description}
                      </p>

                      <div className="mt-8 space-y-3">
                        {service.services?.map((capability, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                            <span className="text-sm text-slate-300">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.02] p-12 text-center">
              <h3 className="text-xl font-medium text-white">Services are being updated</h3>
              <p className="mt-4 text-slate-400">Please check back shortly to view our enterprise consulting capabilities.</p>
            </div>
          )}

          <div className="mt-20 flex flex-col items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-white">Ready to transform your enterprise?</h3>
              <p className="mt-4 text-slate-400">Connect with our consulting team to discuss architecture, implementation support, or business process transformation.</p>
            </div>
            <Link
              href="/#contact"
              className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-all hover:bg-cyan-300"
            >
              Discuss a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

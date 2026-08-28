import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getWhatsAppEnquiryLink } from "@/lib/contact";
import { ylaamProducts } from "@/lib/ylaam-products";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products | Archon Solutions",
  description:
    "Explore the Archon product ecosystem through YLAAM — connected platforms for operations, engagement, learning, meetings, AI guidance and admin.",
  alternates: {
    canonical: absoluteUrl("/products"),
  },
  openGraph: {
    title: "Products | Archon Solutions",
    description:
      "Explore the Archon product ecosystem through YLAAM — connected platforms for operations, engagement, learning, meetings, AI guidance and admin.",
    url: absoluteUrl("/products"),
  },
};

export default function ProductsPage() {
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Archon YLAAM Product Ecosystem",
    itemListElement: ylaamProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        url: product.href,
        image: `${siteUrl}${product.image}`,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-cyan-300">
                <div className="h-px w-8 bg-cyan-300/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Archon products
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Tools that turn
                <br />
                <span className="text-slate-400">possibility into progress.</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-slate-300 md:text-xl">
                Archon’s product ecosystem lives in{" "}
                <a
                  href="https://ylaam.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline"
                >
                  YLAAM
                </a>
                — a connected family of platforms for business operations,
                conversations, learning, collaboration and intelligent guidance.
              </p>
            </div>

            <aside className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-7">
              <Sparkles className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-5 text-xl font-semibold">Built with purpose.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Every product begins with a practical problem, then earns its
                place through clarity, usability and genuine value.
              </p>
            </aside>
          </section>

          <section aria-labelledby="product-list" className="mt-20">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-sm font-medium text-cyan-300">The YLAAM suite</p>
                <h2 id="product-list" className="mt-2 text-3xl font-semibold tracking-tight">
                  Explore what we are building.
                </h2>
              </div>
              <Boxes className="h-6 w-6 text-slate-500" aria-hidden="true" />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ylaamProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[360px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.04]"
                >
                  <div className="relative h-48 overflow-hidden border-b border-white/10 bg-slate-950">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#020611]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100 backdrop-blur">
                      {product.status}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {product.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-cyan-200">
                      {product.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-medium text-white">
                      Explore product
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-20 flex flex-col items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold">Have a product challenge in mind?</h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                Tell us about the opportunity you see. We can explore the
                product, platform or automation path that makes sense.
              </p>
            </div>
            <a
              href={getWhatsAppEnquiryLink("Hi Archon, I would like to discuss a product opportunity.")}
              target="_blank"
              rel="noreferrer"
              className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Discuss an Opportunity
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { PRODUCTS_QUERY } from "@/lib/sanity.queries";
import { safeSanityFetch } from "@/lib/sanity.safe";
import type { Product } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { urlForSanityImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Products | Archon Solutions",
  description:
    "Explore the Archon product ecosystem, including practical digital products and platforms for modern business outcomes.",
  alternates: {
    canonical: absoluteUrl("/products"),
  },
  openGraph: {
    title: "Products | Archon Solutions",
    description:
      "Explore the Archon product ecosystem, including practical digital products and platforms for modern business outcomes.",
    url: absoluteUrl("/products"),
  },
};

const statusStyles: Record<Product["status"], string> = {
  Live: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  "In development": "border-amber-300/20 bg-amber-300/10 text-amber-100",
  Planned: "border-white/10 bg-white/[0.04] text-slate-300",
};

export default async function ProductsPage() {
  const products = await safeSanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    tags: ["product"],
    defaultValue: [],
  });

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Archon Product Ecosystem",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        url: `${siteUrl}/products/${product.slug.current}`,
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
                Archon products extend practical thinking into digital
                experiences, platforms and workflows designed around real
                people, real teams and measurable outcomes.
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
                <p className="text-sm font-medium text-cyan-300">The ecosystem</p>
                <h2 id="product-list" className="mt-2 text-3xl font-semibold tracking-tight">
                  Explore what we are building.
                </h2>
              </div>
              <Boxes className="h-6 w-6 text-slate-500" aria-hidden="true" />
            </div>

            {products.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug.current}`}
                    className="group flex min-h-[360px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.04]"
                  >
                    {product.featuredImage ? (
                      <div className="relative h-48 overflow-hidden border-b border-white/10 bg-slate-950">
                        <img
                          src={urlForSanityImage(product.featuredImage).width(800).height(480).fit("crop").auto("format").url()}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="relative flex h-32 items-end border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_55%)] p-6">
                        <Boxes className="h-8 w-8 text-cyan-300" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-cyan-200">
                          {product.name}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusStyles[product.status]}`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        {product.description}
                      </p>
                      <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-medium text-white">
                        Explore product
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 text-center md:p-14">
                <Boxes className="mx-auto h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-2xl font-semibold">The next product is taking shape.</h3>
                <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-400">
                  New Archon product experiences will appear here as they move
                  from concept to useful reality.
                </p>
              </div>
            )}
          </section>

          <section className="mt-20 flex flex-col items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold">Have a product challenge in mind?</h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                Tell us about the opportunity you see. We can explore the
                product, platform or automation path that makes sense.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-6 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Discuss an Opportunity
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

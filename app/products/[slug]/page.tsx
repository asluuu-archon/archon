import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowRight, Boxes, CircleCheck, Mail } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { archonContact } from "@/lib/contact";
import { PRODUCT_BY_SLUG_QUERY, PRODUCTS_QUERY } from "@/lib/sanity.queries";
import { safeSanityFetch } from "@/lib/sanity.safe";
import type { Product } from "@/lib/sanity.types";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { urlForSanityImage } from "@/sanity/image";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusStyles: Record<Product["status"], string> = {
  Live: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  "In development": "border-amber-300/20 bg-amber-300/10 text-amber-100",
  Planned: "border-white/10 bg-white/[0.04] text-slate-300",
};

async function getProduct(slug: string) {
  return safeSanityFetch<Product | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`product:${slug}`, "product"],
    defaultValue: null,
  });
}

export async function generateStaticParams() {
  const products = await safeSanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    tags: ["product"],
    defaultValue: [],
  });

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Archon Solutions",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.seoTitle ?? `${product.name} | Archon Products`;
  const description = product.seoDescription ?? product.description;
  const url = absoluteUrl(`/products/${slug}`);
  const imageUrl = product.featuredImage
    ? urlForSanityImage(product.featuredImage).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

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
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const productUrl = absoluteUrl(`/products/${slug}`);
  const imageUrl = product.featuredImage
    ? urlForSanityImage(product.featuredImage).width(1200).height(900).fit("crop").auto("format").url()
    : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    url: productUrl,
    image: imageUrl,
    brand: {
      "@type": "Brand",
      name: "Archon Solutions",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Archon Solutions",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Product status",
        value: product.status,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020611] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24 pt-32 md:pb-32 md:pt-40">
        <article className="mx-auto max-w-4xl px-4 md:px-6">
          <Link
            href="/products"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>

          <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
            {imageUrl ? (
              <div className="relative h-64 border-b border-white/10 md:h-96">
                <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/20 to-transparent" />
              </div>
            ) : null}

            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Archon product
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusStyles[product.status]}`}
                >
                  {product.status}
                </span>
              </div>
              <h1 className="mt-6 text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {product.description}
              </p>
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              {product.content?.length ? (
                <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:text-slate-300 prose-li:text-slate-300">
                  <PortableText value={product.content} />
                </div>
              ) : (
                <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8">
                  <Boxes className="h-7 w-7 text-cyan-300" />
                  <h2 className="mt-5 text-2xl font-semibold">Product details are taking shape.</h2>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    Speak with our team to understand the product vision, current
                    availability and the best way to explore the opportunity.
                  </p>
                </section>
              )}
            </div>

            <aside className="h-fit rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-6 lg:sticky lg:top-28">
              <CircleCheck className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-5 text-xl font-semibold">Interested in {product.name}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Start a conversation with the Archon team to see whether this
                product is right for your next outcome.
              </p>
              <Link
                href="/#contact"
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
              >
                Talk to the Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={archonContact.emailHref}
                className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Mail className="h-4 w-4" />
                {archonContact.email}
              </a>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

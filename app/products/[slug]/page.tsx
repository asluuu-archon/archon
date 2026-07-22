import { safeSanityFetch } from "@/lib/sanity.safe";
import { PRODUCT_BY_SLUG_QUERY, PRODUCTS_QUERY } from "@/lib/sanity.queries";
import { Product } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const products = await safeSanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    defaultValue: [],
  });

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await safeSanityFetch<Product | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    defaultValue: null,
  });

  if (!product) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await safeSanityFetch<Product | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    defaultValue: null,
  });

  if (!product) {
    return (
      <main className="relative min-h-screen bg-[#050816] text-white">
        <Navbar />
        <div className="relative z-10 pt-32 pb-20">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-slate-400 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Back to Products
            </Link>
          </section>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded ${
                product.status === "Live"
                  ? "bg-emerald-900 text-emerald-300"
                  : product.status === "In development"
                  ? "bg-yellow-900 text-yellow-300"
                  : "bg-slate-700 text-slate-300"
              }`}>
                {product.status}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-slate-300">{product.description}</p>
          </div>

          {/* Featured Image */}
          {product.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.featuredImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            {product.content ? (
              <PortableText value={product.content} />
            ) : (
              <p className="text-slate-400">No detailed content available yet.</p>
            )}
          </div>

          {/* CTA */}
          <div className="bg-slate-900 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Interested in {product.name}?</h2>
            <p className="text-slate-300 mb-6">
              Get in touch with our team to learn more about this product.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Back Link */}
          <div className="pt-8 border-t border-slate-700">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

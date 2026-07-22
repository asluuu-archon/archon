import { safeSanityFetch } from "@/lib/sanity.safe";
import { PRODUCTS_QUERY } from "@/lib/sanity.queries";
import { Product } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Products | Archon",
  description: "Explore the Archon product ecosystem.",
};

export default async function ProductsPage() {
  let products: Product[] = [];

  products = await safeSanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    tags: ["products"],
    defaultValue: [],
  });

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Products</h1>
            <p className="text-lg text-slate-300">
              Innovative solutions and platforms powering the Archon ecosystem.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="group"
                >
                  <div className="bg-slate-900 rounded-lg overflow-hidden hover:bg-slate-800 transition-colors h-full flex flex-col">
                    {product.featuredImage && (
                      <div className="w-full h-48 bg-slate-800 overflow-hidden">
                        <img
                          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.featuredImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          product.status === "Live"
                            ? "bg-emerald-900 text-emerald-300"
                            : product.status === "In development"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-slate-700 text-slate-300"
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 flex-1">
                        {product.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs text-cyan-400 font-semibold">
                          Learn more →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">
                No products available yet. Check back soon!
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

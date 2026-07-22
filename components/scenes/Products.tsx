import { Bot, Boxes, Video } from "lucide-react";

import { products } from "@/data/home";
import GlowCard from "@/components/ui/GlowCard";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const icons = [Boxes, Video, Bot];

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-[#050816] py-40">
      <SectionBackground word="PRODUCTS" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="PRODUCTS"
          title={"Archon is not just teaching technology.\nWe are building it."}
          description="Our product direction is part of the same belief: learn by solving real problems, build tools for real users, and keep expanding what Archon can become."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = icons[index] ?? Boxes;

            return (
              <GlowCard key={product.name} delay={index * 0.08}>
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="h-10 w-10 text-cyan-300 transition duration-300 group-hover:scale-110" />

                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
                    {product.status}
                  </div>
                </div>

                <h3 className="text-3xl font-semibold text-white">
                  {product.name}
                </h3>

                <p className="mt-5 leading-7 text-slate-300">
                  {product.text}
                </p>

                <div className="mt-auto pt-10 text-sm font-semibold tracking-wide text-cyan-300">
                  View product →
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
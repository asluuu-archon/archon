"use client";

import { motion } from "framer-motion";
import FloatingParticles from "@/components/effects/FloatingParticles";
import MouseGlow from "@/components/effects/MouseGlow";
import OrbitLines from "@/components/effects/OrbitLines";
import ParticleUniverse from "@/components/effects/ParticleUniverse";
import TextReveal from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/home";

export default function Arrival() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <ParticleUniverse />
      <FloatingParticles />
      <OrbitLines />
      <MouseGlow />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050816] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl pt-24 text-center lg:pt-28">
        <motion.p
          className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {hero.tag}
        </motion.p>

        <h1 className="mx-auto max-w-6xl text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
          <TextReveal delay={0.15}>Dream Without Limits.</TextReveal>
          <br />
          <TextReveal delay={0.35}>Build With Purpose.</TextReveal>
        </h1>

        <motion.p
          className="mx-auto mt-8 max-w-3xl text-balance text-base leading-7 text-slate-300 sm:text-lg md:text-xl md:leading-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          <Button className="rounded-full bg-cyan-300 px-8 py-6 text-base font-semibold text-black hover:bg-cyan-200">
            {hero.primaryButton}
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
          >
            {hero.secondaryButton}
          </Button>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
        >
          {hero.stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-md"
            >
              {stat.value && <span className="text-cyan-300">{stat.value}</span>}{" "}
              {stat.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
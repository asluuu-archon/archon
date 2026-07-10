"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CinematicSection from "@/components/ui/CinematicSection";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const pillars = ["Learning", "Mentorship", "Innovation", "Entrepreneurship"];

export default function CampusReveal() {
  return (
    <CinematicSection id="campus" glow="center">
      <SectionBackground word="2026" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="FUTURE CAMPUS"
          title={"Built for builders.\nDesigned for dreamers."}
          description="More than a training centre. A place where ideas, mentorship, technology and entrepreneurship come together."
        />

        <div className="mt-24 grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-8xl font-black text-cyan-300">15,000</div>

            <div className="mt-2 text-3xl font-semibold text-white">
              sq ft Innovation Campus
            </div>

            <p className="mt-8 max-w-lg leading-8 text-slate-300">
              Every classroom, discussion room and innovation space is being
              designed to encourage practical learning, collaboration,
              mentorship and product building.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-5">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <div className="text-4xl text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="mt-4 text-xl font-semibold text-white">
                    {pillar}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[4rem] bg-cyan-300/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-white/[0.03] p-3 shadow-[0_0_140px_rgba(34,211,238,0.16)] backdrop-blur-md">
              <div className="relative aspect-[16/12] overflow-hidden rounded-[2.4rem]">
                <motion.div
  className="absolute inset-0"
  initial={{ scale: 1.08 }}
  whileInView={{ scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
>
  <Image
    src="/images/campus1.jpeg"
    alt="Archon future campus render"
    fill
    className="object-cover"
  />
</motion.div>

                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.22)_1px,transparent_1px)] bg-[size:42px_42px]"
                  initial={{ opacity: 0.75 }}
                  whileInView={{ opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.4 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/20 via-transparent to-[#050816]/30" />

                <motion.div
                  className="absolute left-6 top-6 rounded-full border border-cyan-300/20 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-md"
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  Future Campus 2026
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                    Kerala
                  </div>

                  <h3 className="mt-2 text-3xl font-semibold text-white">
                    One campus. Thousands of futures.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    A space designed for learning, mentorship, technology
                    building and global opportunity.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CinematicSection>
  );
}
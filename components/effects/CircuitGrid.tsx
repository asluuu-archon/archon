"use client";

import { motion } from "framer-motion";

export default function CircuitGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <motion.div
        className="absolute left-0 top-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        animate={{ x: ["-100%", "220%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute right-0 top-2/3 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        animate={{ x: ["120%", "-260%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute left-1/4 top-0 h-1/2 w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent"
        animate={{ y: ["-100%", "220%"] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 0.8,
        }}
      />
    </div>
  );
}
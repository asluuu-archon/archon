"use client";

import { motion } from "framer-motion";

export default function OrbitLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute left-[8%] top-[28%] hidden h-[420px] w-[420px] rounded-full border border-cyan-300/10 md:block"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        className="absolute right-[6%] bottom-[18%] hidden h-[520px] w-[520px] rounded-full border border-cyan-300/10 lg:block"
      />

      <div className="absolute left-[12%] top-[34%] hidden h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)] md:block" />
      <div className="absolute right-[14%] bottom-[30%] hidden h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)] lg:block" />
    </div>
  );
}
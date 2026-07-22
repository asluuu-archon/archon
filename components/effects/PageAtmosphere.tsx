"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useScene } from "@/components/providers/SceneProvider";

const sceneAtmospheres = {
  hero: {
    label: "DREAM",
    primary: "rgba(34,211,238,0.16)",
    secondary: "rgba(14,165,233,0.08)",
    accent: "rgba(103,232,249,0.22)",
    gridOpacity: 0.12,
    energy: 0.18,
  },
  problem: {
    label: "WHY",
    primary: "rgba(15,23,42,0.26)",
    secondary: "rgba(30,64,175,0.06)",
    accent: "rgba(34,211,238,0.12)",
    gridOpacity: 0.05,
    energy: 0.08,
  },
  learning: {
    label: "LEARNING",
    primary: "rgba(20,184,166,0.14)",
    secondary: "rgba(34,211,238,0.08)",
    accent: "rgba(94,234,212,0.2)",
    gridOpacity: 0.15,
    energy: 0.2,
  },
  consulting: {
    label: "INDUSTRY",
    primary: "rgba(14,165,233,0.14)",
    secondary: "rgba(30,64,175,0.08)",
    accent: "rgba(125,211,252,0.22)",
    gridOpacity: 0.18,
    energy: 0.28,
  },
  products: {
    label: "PRODUCTS",
    primary: "rgba(6,182,212,0.18)",
    secondary: "rgba(79,70,229,0.08)",
    accent: "rgba(103,232,249,0.28)",
    gridOpacity: 0.22,
    energy: 0.36,
  },
  stories: {
    label: "IMPACT",
    primary: "rgba(16,185,129,0.1)",
    secondary: "rgba(34,211,238,0.06)",
    accent: "rgba(110,231,183,0.18)",
    gridOpacity: 0.09,
    energy: 0.14,
  },
  global: {
    label: "GLOBAL",
    primary: "rgba(56,189,248,0.15)",
    secondary: "rgba(59,130,246,0.08)",
    accent: "rgba(125,211,252,0.25)",
    gridOpacity: 0.19,
    energy: 0.3,
  },
  campus: {
    label: "CAMPUS",
    primary: "rgba(34,211,238,0.15)",
    secondary: "rgba(251,191,36,0.035)",
    accent: "rgba(103,232,249,0.24)",
    gridOpacity: 0.14,
    energy: 0.22,
  },
  vision: {
    label: "VISION",
    primary: "rgba(34,211,238,0.13)",
    secondary: "rgba(255,255,255,0.04)",
    accent: "rgba(103,232,249,0.2)",
    gridOpacity: 0.06,
    energy: 0.16,
  },
};

const stars = Array.from({ length: 52 }, (_, index) => ({
  id: index,
  left: (index * 43) % 100,
  top: (index * 67) % 100,
  size: index % 9 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
  duration: 4 + (index % 7),
  delay: (index % 13) * 0.18,
}));

export default function PageAtmosphere() {
  const { scene } = useScene();
  const atmosphere = sceneAtmospheres[scene];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050816]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at 50% 40%, ${atmosphere.primary}, transparent 43%)`,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-[18%] top-[8%] h-[720px] w-[720px] rounded-full blur-[180px]"
        animate={{
          backgroundColor: atmosphere.secondary,
          x: scene === "global" ? 130 : scene === "consulting" ? 70 : 0,
          y: scene === "campus" ? 120 : 0,
          scale: scene === "products" ? 1.25 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute -right-[18%] top-[34%] h-[820px] w-[820px] rounded-full blur-[210px]"
        animate={{
          backgroundColor: atmosphere.primary,
          x: scene === "learning" ? -100 : 0,
          y: scene === "global" ? -90 : 0,
          scale: scene === "consulting" ? 1.18 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute bottom-[-28%] left-[24%] h-[900px] w-[900px] rounded-full blur-[230px]"
        animate={{
          backgroundColor: atmosphere.secondary,
          x: scene === "products" ? 120 : 0,
          scale: scene === "vision" ? 1.25 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute -inset-24"
        animate={{
          opacity: atmosphere.gridOpacity,
          rotate: scene === "products" ? 0.7 : scene === "consulting" ? -0.5 : 0,
          scale: scene === "global" ? 1.03 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.22)_1px,transparent_1px)] bg-[size:88px_88px]" />
      </motion.div>

      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-cyan-100"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.03, 0.5, 0.03],
              scale: [0.7, 1.5, 0.7],
              y: [0, star.id % 2 === 0 ? -12 : 12, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.025]">
        <motion.div
          className="absolute left-1/2 top-[-15%] h-[28%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-200 to-transparent"
          animate={{
            top: ["-25%", "110%"],
            opacity: [0, atmosphere.energy, atmosphere.energy, 0],
          }}
          transition={{
            duration: scene === "products" ? 4.5 : 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        animate={{
          borderColor: atmosphere.accent,
          opacity: scene === "products" ? 0.22 : 0.07,
          scale: scene === "products" ? [1, 1.08, 1] : 1,
          rotate: scene === "products" ? 360 : 0,
        }}
        transition={{
          borderColor: { duration: 1.2 },
          opacity: { duration: 1.2 },
          scale: {
            duration: 8,
            repeat: scene === "products" ? Infinity : 0,
            ease: "easeInOut",
          },
          rotate: {
            duration: 80,
            repeat: scene === "products" ? Infinity : 0,
            ease: "linear",
          },
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        animate={{
          borderColor: atmosphere.accent,
          opacity: scene === "global" || scene === "products" ? 0.1 : 0.025,
          rotate: scene === "global" ? -360 : 0,
        }}
        transition={{
          borderColor: { duration: 1.2 },
          opacity: { duration: 1.2 },
          rotate: {
            duration: 120,
            repeat: scene === "global" ? Infinity : 0,
            ease: "linear",
          },
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 18, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.45em" }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.7 }}
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] font-semibold uppercase text-cyan-200/20 xl:block"
        >
          Archon · {atmosphere.label}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-200/[0.025] to-transparent"
        animate={{
          top: ["-15%", "110%"],
          opacity: [0, atmosphere.energy, 0],
        }}
        transition={{
          duration: scene === "consulting" || scene === "products" ? 7 : 11,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/10 via-transparent to-[#050816]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050816_100%)] opacity-55" />
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

const particles = [
  { left: 12, top: 15, size: 3, duration: 14 },
  { left: 19, top: 42, size: 4, duration: 18 },
  { left: 27, top: 68, size: 2, duration: 12 },
  { left: 34, top: 24, size: 3, duration: 16 },
  { left: 41, top: 78, size: 4, duration: 20 },
  { left: 49, top: 36, size: 2, duration: 13 },
  { left: 55, top: 61, size: 3, duration: 17 },
  { left: 63, top: 22, size: 4, duration: 19 },
  { left: 71, top: 48, size: 2, duration: 15 },
  { left: 79, top: 72, size: 3, duration: 21 },
  { left: 86, top: 31, size: 4, duration: 18 },
  { left: 93, top: 58, size: 2, duration: 14 },
];

export default function FloatingParticles() {
  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0.15 }}
          animate={{
            y: [-18, 18, -18],
            opacity: [0.08, 0.35, 0.08],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute rounded-full bg-cyan-300"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </>
  );
}
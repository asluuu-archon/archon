"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 65 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 10,
  duration: Math.random() * 12 + 12,
}));

export default function DataParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.4px)",
            boxShadow: "0 0 10px rgba(34,211,238,.7)",
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-15, 15, -15],
            opacity: [0.15, 0.8, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
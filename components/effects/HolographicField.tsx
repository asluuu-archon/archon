"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const particles = Array.from({ length: 55 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  top: (index * 61) % 100,
  duration: 5 + (index % 7),
  delay: (index % 12) * 0.22,
  size: index % 8 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
}));

const drones = [
  { id: 1, top: "19%", duration: 16, delay: 0 },
  { id: 2, top: "38%", duration: 21, delay: 4 },
  { id: 3, top: "63%", duration: 18, delay: 7 },
  { id: 4, top: "78%", duration: 24, delay: 2 },
];

export default function HolographicField() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 45,
    damping: 24,
    mass: 0.8,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 45,
    damping: 24,
    mass: 0.8,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      mouseX.set(x * 24);
      mouseY.set(y * 18);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute -inset-20"
      >
        <div className="absolute left-[14%] top-[12%] h-[440px] w-[440px] rounded-full bg-cyan-300/[0.07] blur-[140px]" />

        <div className="absolute right-[10%] top-[26%] h-[520px] w-[520px] rounded-full bg-blue-400/[0.055] blur-[170px]" />

        <div className="absolute bottom-[-15%] left-[32%] h-[620px] w-[620px] rounded-full bg-cyan-400/[0.06] blur-[190px]" />
      </motion.div>

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute -inset-24 opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_48%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </motion.div>

      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-100"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.05, 0.8, 0.05],
              scale: [0.7, 1.7, 0.7],
              y: [0, particle.id % 2 === 0 ? -18 : 18, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {drones.map((drone) => (
          <motion.div
            key={drone.id}
            className="absolute left-[-8%] flex items-center gap-2"
            style={{ top: drone.top }}
            animate={{
              x: ["0vw", "116vw"],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: drone.duration,
              delay: drone.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,1)]" />

            <span className="h-px w-16 bg-gradient-to-r from-cyan-200/70 to-transparent" />
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{
          opacity: [0.12, 0.3, 0.12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />

      <motion.div
        animate={{
          top: ["-10%", "110%"],
          opacity: [0, 0.16, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-cyan-200/10 to-transparent blur-xl"
      />

      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.025] mix-blend-screen" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/35 via-transparent to-[#050816]/70" />
    </div>
  );
}
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 80,
    damping: 18,
    mass: 0.8,
  });

  const y = useSpring(mouseY, {
    stiffness: 80,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block lg:h-[520px] lg:w-[520px]"
    >
      <div className="h-full w-full rounded-full bg-cyan-400/8 blur-[150px] lg:blur-[180px]" />
    </motion.div>
  );
}
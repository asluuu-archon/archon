"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, {
    stiffness: 500,
    damping: 38,
    mass: 0.2,
  });

  const smoothY = useSpring(cursorY, {
    stiffness: 500,
    damping: 38,
    mass: 0.2,
  });

  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);

    if (!finePointer) {
      return;
    }

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setInteractive(
        Boolean(
          target?.closest(
            "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
          )
        )
      );
    };

    const hideCursor = () => setVisible(false);
    const showCursor = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
    };
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: interactive ? 1.35 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.2 } }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
      />
    </div>
  );
}

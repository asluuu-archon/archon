"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, {
    stiffness: 420,
    damping: 35,
    mass: 0.35,
  });

  const smoothY = useSpring(cursorY, {
    stiffness: 420,
    damping: 35,
    mass: 0.35,
  });

  const followerX = useSpring(cursorX, {
    stiffness: 90,
    damping: 22,
    mass: 0.9,
  });

  const followerY = useSpring(cursorY, {
    stiffness: 90,
    damping: 22,
    mass: 0.9,
  });

  const glowX = useTransform(followerX, (value) => value - 220);
  const glowY = useTransform(followerY, (value) => value - 220);

  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
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

      const isInteractive = Boolean(
        target?.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
        )
      );

      setInteractive(isInteractive);
    };

    const hideCursor = () => {
      setVisible(false);
    };

    const showCursor = () => {
      setVisible(true);
    };

    const pressCursor = () => {
      setPressed(true);
    };

    const releaseCursor = () => {
      setPressed(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mousedown", pressCursor);
    window.addEventListener("mouseup", releaseCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mousedown", pressCursor);
      window.removeEventListener("mouseup", releaseCursor);
    };
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        animate={{
          opacity: visible ? (interactive ? 0.16 : 0.07) : 0,
          scale: interactive ? 1.2 : 1,
        }}
        transition={{
          opacity: { duration: 0.25 },
          scale: { duration: 0.3 },
        }}
        className="absolute left-0 top-0 h-[440px] w-[440px] rounded-full bg-cyan-300 blur-[150px]"
      />

      <motion.div
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          width: interactive ? 54 : 34,
          height: interactive ? 54 : 34,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          borderColor: interactive
            ? "rgba(103,232,249,0.8)"
            : "rgba(103,232,249,0.35)",
          backgroundColor: interactive
            ? "rgba(34,211,238,0.08)"
            : "rgba(34,211,238,0.015)",
        }}
        transition={{
          width: { duration: 0.25 },
          height: { duration: 0.25 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.15 },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm"
      >
        <motion.span
          animate={{
            opacity: interactive ? 1 : 0,
            scale: interactive ? 1 : 0.4,
          }}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,1)]"
        />

        <motion.span
          animate={{
            rotate: interactive ? 360 : 0,
            opacity: interactive ? 0.6 : 0,
          }}
          transition={{
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 0.25,
            },
          }}
          className="absolute inset-1 rounded-full border border-dashed border-cyan-200/50"
        />
      </motion.div>

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.55 : interactive ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.15 },
        }}
        className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(103,232,249,1)]"
      />
    </div>
  );
}
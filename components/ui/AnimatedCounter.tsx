"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedCounterProps = {
  value: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  start = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const count = useMotionValue(start);

  const formatted = useTransform(count, (latest) => {
    const number = latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return `${prefix}${number}${suffix}`;
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });

    return controls.stop;
  }, [count, duration, inView, value]);

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  );
}
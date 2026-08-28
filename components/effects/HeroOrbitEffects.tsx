"use client";

import { useEffect, useMemo, useState } from "react";

type Star = {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  length: string;
  angle: string;
};

function createStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: `${6 + Math.random() * 80}%`,
    left: `${3 + Math.random() * 90}%`,
    delay: `${Math.random() * 6.5}s`,
    duration: `${3.2 + Math.random() * 3.8}s`,
    length: `${52 + Math.random() * 80}px`,
    angle: `${-28 - Math.random() * 18}deg`,
  }));
}

export default function HeroOrbitEffects() {
  const [mounted, setMounted] = useState(false);
  const stars = useMemo(() => createStars(13), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[52%] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_58%)]" />
      <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-cyan-300/[0.08] via-sky-400/[0.03] to-transparent" />
      <div className="absolute left-[12%] top-0 h-64 w-64 -translate-y-1/3 rounded-full bg-cyan-300/[0.09] blur-[90px]" />
      <div className="absolute right-[10%] top-8 h-72 w-72 rounded-full bg-indigo-400/[0.08] blur-[110px]" />

      <div className="absolute left-1/2 top-[47%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.07] blur-[150px]" />

      <div className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-300/15 hero-orbit-ring" />
      <div className="absolute left-1/2 top-[48%] h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 hero-orbit-ring-slow" />

      <div className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full hero-orbit-sheen" />
      <div className="absolute left-1/2 top-[48%] h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full hero-orbit-sheen-delayed" />

      <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
      <div className="absolute bottom-[22%] left-1/2 top-[20%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/12 to-transparent" />

      {mounted
        ? stars.map((star) => (
            <span
              key={star.id}
              className="hero-shooting-star"
              style={{
                top: star.top,
                left: star.left,
                width: star.length,
                animationDelay: star.delay,
                animationDuration: star.duration,
                transform: `rotate(${star.angle})`,
              }}
            />
          ))
        : null}
    </div>
  );
}

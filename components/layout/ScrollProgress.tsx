"use client";

import { useScrollData } from "../providers/ScrollProvider";

export default function ScrollProgress() {
  const { progress } = useScrollData();

  return (
    <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-cyan-300 shadow-[0_0_25px_#22d3ee]"
        style={{
          width: `${progress * 100}%`,
          transition: "width .08s linear",
        }}
      />
    </div>
  );
}
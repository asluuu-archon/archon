"use client";

import { useScene } from "@/components/providers/SceneProvider";

const atmosphere = {
  hero: "bg-cyan-500/5",
  problem: "bg-blue-500/5",
  learning: "bg-cyan-400/6",
  consulting: "bg-blue-400/6",
  products: "bg-cyan-300/6",
  stories: "bg-emerald-300/5",
  global: "bg-sky-300/6",
  campus: "bg-cyan-200/7",
  vision: "bg-white/5",
};

export default function PageAtmosphere() {
  const { scene } = useScene();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition duration-1000">
      <div
        className={`absolute left-[-10%] top-[20%] h-[520px] w-[520px] rounded-full blur-[150px] transition-colors duration-1000 ${atmosphere[scene]}`}
      />

      <div
        className={`absolute right-[-10%] top-[55%] h-[620px] w-[620px] rounded-full blur-[170px] transition-colors duration-1000 ${atmosphere[scene]}`}
      />

      <div
        className={`absolute bottom-[-20%] left-[30%] h-[700px] w-[700px] rounded-full blur-[190px] transition-colors duration-1000 ${atmosphere[scene]}`}
      />
    </div>
  );
}
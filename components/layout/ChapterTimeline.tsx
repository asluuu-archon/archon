"use client";

import { useScene } from "@/components/providers/SceneProvider";

const chapters = [
  { scene: "hero", id: "home", label: "Dream" },
  { scene: "problem", id: "why", label: "Why" },
  { scene: "learning", id: "learning", label: "Learning" },
  { scene: "consulting", id: "consulting", label: "Industry" },
  { scene: "products", id: "products", label: "Products" },
  { scene: "stories", id: "stories", label: "Impact" },
  { scene: "global", id: "global", label: "Global" },
  { scene: "campus", id: "campus", label: "Campus" },
  { scene: "vision", id: "contact", label: "Vision" },
];

export default function ChapterTimeline() {
  const { scene } = useScene();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 hidden w-[92%] max-w-5xl -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-xl lg:block">
      <div className="flex items-center justify-between gap-4">
        {chapters.map((chapter) => {
          const active = chapter.scene === scene;

          return (
            <button
              key={chapter.scene}
              onClick={() => scrollToSection(chapter.id)}
              className="group flex flex-1 items-center gap-3"
            >
              <div
                className={`h-2 w-2 rounded-full transition ${
                  active
                    ? "bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.9)]"
                    : "bg-white/25 group-hover:bg-cyan-300/60"
                }`}
              />

              <span
                className={`text-[10px] uppercase tracking-[0.25em] transition ${
                  active
                    ? "text-cyan-300"
                    : "text-slate-500 group-hover:text-cyan-200"
                }`}
              >
                {chapter.label}
              </span>

              {chapter.scene !== "vision" && (
                <div className="h-px flex-1 bg-white/10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
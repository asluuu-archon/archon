"use client";

import { useEffect } from "react";
import { useScene } from "@/components/providers/SceneProvider";

const sceneMap: Record<string, Parameters<ReturnType<typeof useScene>["setScene"]>[0]> = {
  home: "hero",
  why: "problem",
  learning: "learning",
  consulting: "consulting",
  products: "products",
  stories: "stories",
  global: "global",
  campus: "campus",
  contact: "vision",
};

export default function SceneWatcher() {
  const { setScene } = useScene();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (!visible) return;

        const id = visible.target.id;
        const scene = sceneMap[id];

        if (scene) {
          setScene(scene);
        }
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setScene]);

  return null;
}
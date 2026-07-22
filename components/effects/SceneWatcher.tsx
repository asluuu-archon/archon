"use client";

import { useEffect } from "react";

import {
  SceneName,
  useScene,
} from "@/components/providers/SceneProvider";

type SceneSection = {
  id: string;
  scene: SceneName;
};

const sceneSections: SceneSection[] = [
  {
    id: "hero",
    scene: "hero",
  },
  {
    id: "problem",
    scene: "problem",
  },
  {
    id: "founder",
    scene: "problem",
  },
  {
    id: "journey",
    scene: "global",
  },
  {
    id: "global",
    scene: "global",
  },
  {
    id: "learning",
    scene: "learning",
  },
  {
    id: "consulting",
    scene: "consulting",
  },
  {
    id: "products",
    scene: "products",
  },
  {
    id: "innovation",
    scene: "products",
  },
  {
    id: "stories",
    scene: "stories",
  },
  {
    id: "campus",
    scene: "campus",
  },
  {
    id: "contact",
    scene: "vision",
  },
];

export default function SceneWatcher() {
  const { setScene } = useScene();

  useEffect(() => {
    let animationFrame = 0;

    const updateScene = () => {
      const viewportFocus = window.innerHeight * 0.46;

      let nearestScene: SceneName = "hero";
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of sceneSections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        const sectionVisible =
          rect.bottom > 0 && rect.top < window.innerHeight;

        if (!sectionVisible) {
          continue;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportFocus);

        const focusInsideSection =
          rect.top <= viewportFocus &&
          rect.bottom >= viewportFocus;

        if (focusInsideSection) {
          nearestScene = section.scene;
          nearestDistance = -1;
          break;
        }

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestScene = section.scene;
        }
      }

      setScene(nearestScene);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);

      animationFrame = window.requestAnimationFrame(updateScene);
    };

    updateScene();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [setScene]);

  return null;
}
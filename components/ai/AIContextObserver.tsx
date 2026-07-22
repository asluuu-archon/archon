"use client";

import { useEffect, useRef } from "react";

import {
  SceneName,
  useScene,
} from "@/components/providers/SceneProvider";

const proactiveMessages: Record<SceneName, string> = {
  hero:
    "Welcome to Archon. I can guide you through learning, consulting, products, innovation and global opportunities.",

  problem:
    "You’re exploring why Archon exists. Would you like me to explain how our practical learning philosophy differs from conventional training?",

  learning:
    "Looks like you’re exploring our learning pathways. Share your education, experience and interests, and I can help identify a suitable direction.",

  consulting:
    "You’re viewing Archon’s enterprise capabilities. I can help you explore SAP consulting, software engineering, integration, cloud, staffing or AI automation.",

  products:
    "You’ve entered the Archon product ecosystem. I can explain SAP Guru Assistant, AI Command Center, ArchRoom and Future Labs.",

  stories:
    "You’re exploring Archon’s impact. Would you like to see how mentorship, project exposure and career direction shape learner outcomes?",

  global:
    "Archon currently connects India, Belgium, the United Kingdom and Australia. I can explain what each location contributes to the ecosystem.",

  campus:
    "You’re viewing the future Archon campus. I can guide you through the learning, consulting, innovation and entrepreneurship floors.",

  vision:
    "You’ve reached the next chapter. Tell me whether you’re looking for learning, consulting, collaboration or product opportunities.",
};

export default function AIContextObserver() {
  const { scene } = useScene();

  const timerRef = useRef<number | null>(null);
  const previousSceneRef = useRef<SceneName | null>(null);
  const introducedScenesRef = useRef<Set<SceneName>>(new Set());

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    if (previousSceneRef.current === scene) {
      return;
    }

    previousSceneRef.current = scene;

    if (introducedScenesRef.current.has(scene)) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      introducedScenesRef.current.add(scene);

      window.dispatchEvent(
        new CustomEvent("archon:context-message", {
          detail: {
            scene,
            message: proactiveMessages[scene],
          },
        })
      );
    }, 7000);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [scene]);

  return null;
}
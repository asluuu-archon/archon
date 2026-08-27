"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ArchonAI = dynamic(() => import("@/components/ai/ArchonAI"), {
  ssr: false,
});
const AIContextObserver = dynamic(
  () => import("@/components/ai/AIContextObserver"),
  { ssr: false }
);
const GuidedTour = dynamic(() => import("@/components/ai/GuidedTour"), {
  ssr: false,
});
const CommandCenter = dynamic(
  () => import("@/components/command/CommandCenter"),
  { ssr: false }
);
const ChapterTimeline = dynamic(
  () => import("@/components/layout/ChapterTimeline"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/layout/ScrollProgress"),
  { ssr: false }
);
const InteractiveCursor = dynamic(
  () => import("@/components/effects/InteractiveCursor"),
  { ssr: false }
);

/**
 * Defers optional, high-interaction homepage tools until the visitor actively
 * engages with the page. The core story, navigation, content and enquiry path
 * remain server-rendered and immediately usable.
 */
export default function DeferredHomeTools() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const activate = () => setActivated(true);

    window.addEventListener("pointerdown", activate, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", activate, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", activate, { once: true });

    return () => {
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("keydown", activate);
    };
  }, []);

  if (!activated) return null;

  return (
    <>
      <AIContextObserver />
      <ArchonAI />
      <GuidedTour />
      <CommandCenter />
      <ChapterTimeline />
      <ScrollProgress />
      <InteractiveCursor />
    </>
  );
}

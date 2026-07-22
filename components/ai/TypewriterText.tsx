"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

export default function TypewriterText({
  text,
  speed = 12,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText("");

    if (!text) {
      onCompleteRef.current?.();
      return;
    }

    let currentIndex = 0;

    const timer = window.setInterval(() => {
      currentIndex += 1;
      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [speed, text]);

  return (
    <span>
      {displayedText}

      {displayedText.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-cyan-300 align-middle" />
      )}
    </span>
  );
}
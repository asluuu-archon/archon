"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ScrollContextType = {
  scrollY: number;
  progress: number;
};

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  progress: 0,
});

export function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;

      const height =
        document.body.scrollHeight - window.innerHeight;

      setScrollY(y);

      setProgress(height > 0 ? y / height : 0);
    };

    update();

    window.addEventListener("scroll", update);

    return () =>
      window.removeEventListener("scroll", update);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        progress,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollData = () =>
  useContext(ScrollContext);
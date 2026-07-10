"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type SceneName =
  | "hero"
  | "problem"
  | "learning"
  | "consulting"
  | "products"
  | "stories"
  | "global"
  | "campus"
  | "vision";

type SceneContextType = {
  scene: SceneName;
  setScene: (scene: SceneName) => void;
};

const SceneContext = createContext<SceneContextType | null>(null);

export function SceneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scene, setScene] =
    useState<SceneName>("hero");

  const value = useMemo(
    () => ({
      scene,
      setScene,
    }),
    [scene]
  );

  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error(
      "useScene must be used inside SceneProvider"
    );
  }

  return context;
}
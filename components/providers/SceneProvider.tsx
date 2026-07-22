"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type SceneName =
  | "hero"
  | "problem"
  | "learning"
  | "consulting"
  | "products"
  | "stories"
  | "global"
  | "campus"
  | "vision";

type SceneContextValue = {
  scene: SceneName;
  setScene: (scene: SceneName) => void;
};

const defaultSceneContext: SceneContextValue = {
  scene: "hero",
  setScene: () => undefined,
};

const SceneContext = createContext<SceneContextValue>(defaultSceneContext);

type SceneProviderProps = {
  children: ReactNode;
};

export function SceneProvider({ children }: SceneProviderProps) {
  const [scene, setScene] = useState<SceneName>("hero");

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
  return useContext(SceneContext);
}

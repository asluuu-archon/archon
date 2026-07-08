import FadeUp from "@/components/animations/FadeUp";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function GlassCard({
  children,
  className = "",
  delay = 0,
}: GlassCardProps) {
  return (
    <FadeUp delay={delay}>
      <div
        className={`flex h-full min-h-[280px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06] ${className}`}
      >
        {children}
      </div>
    </FadeUp>
  );
}
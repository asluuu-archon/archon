import FadeUp from "@/components/animations/FadeUp";
import { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function GlowCard({
  children,
  className = "",
  delay = 0,
}: GlowCardProps) {
  return (
    <FadeUp delay={delay}>
      <div
        className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06] ${className}`}
      >
        <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </FadeUp>
  );
}
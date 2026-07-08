import { ReactNode } from "react";
import SectionGlow from "@/components/effects/SectionGlow";

export default function CinematicSection({
  children,
  glow = "center",
  id,
}: {
  children: ReactNode;
  glow?: "left" | "center" | "right";
  id?: string;
}) {
  return (
    <section id={id} className="relative overflow-hidden bg-[#050816] py-40">
      <SectionGlow position={glow} />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
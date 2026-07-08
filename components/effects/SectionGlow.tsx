"use client";

export default function SectionGlow({
  position = "center",
}: {
  position?: "left" | "center" | "right";
}) {
  const positions = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div
      className={`pointer-events-none absolute top-1/2 ${positions[position]}
      h-[650px] w-[650px] -translate-y-1/2 rounded-full
      bg-cyan-400/8 blur-[180px]`}
    />
  );
}
export default function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-white/10" />
      <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.9)]" />
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
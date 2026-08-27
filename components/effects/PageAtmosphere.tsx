export default function PageAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050816]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_22%,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute -left-40 top-16 h-[42rem] w-[42rem] rounded-full bg-cyan-500/[0.05] blur-[140px]" />
      <div className="absolute -right-48 top-[28%] h-[48rem] w-[48rem] rounded-full bg-sky-500/[0.045] blur-[160px]" />
      <div className="absolute bottom-[-24rem] left-[20%] h-[44rem] w-[44rem] rounded-full bg-cyan-400/[0.035] blur-[180px]" />
      <div className="absolute -inset-24 opacity-[0.045] [background-image:linear-gradient(rgba(103,232,249,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.7)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.025]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/10 via-transparent to-[#050816]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050816_100%)] opacity-60" />
    </div>
  );
}

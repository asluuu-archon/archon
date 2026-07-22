export default function PageAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute right-[-10%] top-[55%] h-[620px] w-[620px] rounded-full bg-blue-500/5 blur-[170px]" />
      <div className="absolute bottom-[-20%] left-[30%] h-[700px] w-[700px] rounded-full bg-cyan-300/4 blur-[190px]" />
    </div>
  );
}
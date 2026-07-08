type SectionBackgroundProps = {
  word: string;
};

export default function SectionBackground({ word }: SectionBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-16 -translate-x-1/2 text-[12vw] font-black uppercase tracking-tight text-white/[0.025]">
        {word}
      </div>
    </div>
  );
}
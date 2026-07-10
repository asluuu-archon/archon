import { Button } from "@/components/ui/button";
import CinematicSection from "@/components/ui/CinematicSection";
import SectionBackground from "@/components/ui/SectionBackground";

export default function FinalCTA() {
  return (
    <CinematicSection id="contact" glow="center">
      <SectionBackground word="ARCHON" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300">
          Begin Your Journey
        </p>

        <h2 className="max-w-5xl text-balance text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
          The next success story
          <br />
          could be yours.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          Whether you want to learn, build, consult, collaborate or create
          something meaningful — Archon exists to help you move from dream to
          outcome.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="rounded-full bg-cyan-300 px-9 py-6 text-base font-semibold text-black hover:bg-cyan-200">
            Start Learning
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-9 py-6 text-base font-semibold text-white hover:bg-white/10"
          >
            Work With Archon
          </Button>
        </div>

        <div className="mt-20 text-sm uppercase tracking-[0.35em] text-slate-500">
          Dream Without Limits. Build With Purpose.
        </div>
      </div>
    </CinematicSection>
  );
}
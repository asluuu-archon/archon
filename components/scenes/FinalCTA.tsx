import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-center text-white">
      <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-white/[0.04] px-8 py-20 backdrop-blur-xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Build With Archon
        </p>

        <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          What do you want to build next?
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          Whether you are starting your career, scaling a business, exploring
          consulting, or building a product — Archon exists to help you move
          from dream to outcome.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="rounded-full bg-cyan-300 px-8 py-6 text-base font-semibold text-black hover:bg-cyan-200">
            Talk to an Advisor
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
          >
            Explore Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
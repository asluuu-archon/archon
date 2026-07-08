import FloatingParticles from "@/components/effects/FloatingParticles";
import MouseGlow from "@/components/effects/MouseGlow";
import OrbitLines from "@/components/effects/OrbitLines";
import ParticleUniverse from "@/components/effects/ParticleUniverse";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/home";

export default function Arrival() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <ParticleUniverse />
      <FloatingParticles />
      <OrbitLines />
      <MouseGlow />

      <div className="relative z-10 mx-auto max-w-6xl pt-24 text-center lg:pt-28">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300 sm:text-sm">
          {hero.tag}
        </p>

        <h1 className="mx-auto max-w-6xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
          {hero.title}
          <br />
          {hero.subtitle}
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-balance text-base leading-7 text-slate-300 sm:text-lg md:text-xl md:leading-8">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="rounded-full bg-cyan-300 px-8 py-6 text-base font-semibold text-black hover:bg-cyan-200">
            {hero.primaryButton}
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
          >
            {hero.secondaryButton}
          </Button>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3">
          {hero.stats.map((item) => (
            <div
              key={item.label}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-md"
            >
              <span className="text-cyan-300">{item.value}</span>{" "}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
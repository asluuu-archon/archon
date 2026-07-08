import { journeyMilestones } from "@/data/home";

export default function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          The Journey
        </p>

        <h2 className="max-w-5xl text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          What began as one room became a global ecosystem.
        </h2>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300 via-cyan-300/30 to-transparent md:block" />

          <div className="space-y-10">
            {journeyMilestones.map((item, index) => (
              <div
                key={item.year}
                className="group relative grid gap-6 md:grid-cols-[180px_1fr]"
              >
                <div className="relative flex items-start gap-4">
                  <div className="mt-2 hidden h-8 w-8 rounded-full border border-cyan-300/40 bg-[#050816] shadow-[0_0_40px_rgba(34,211,238,0.35)] md:block" />
                  <div>
                    <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">
                      {item.year}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-md transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/30 group-hover:bg-white/[0.06]">
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
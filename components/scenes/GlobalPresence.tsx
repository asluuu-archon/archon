import { locations } from "@/data/home";

export default function GlobalPresence() {
  return (
    <section id="global" className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Global Presence
        </p>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Built in Kerala.
              <br />
              Growing across the world.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              Archon expands where learners, businesses and technology
              opportunities need stronger bridges between ambition and outcome.
            </p>
          </div>

          <div className="relative min-h-[460px] rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.9)]" />

            <div className="relative grid gap-4">
              {locations.map((location) => (
                <div
                  key={location.country}
                  className="rounded-2xl border border-white/10 bg-[#07111f]/80 p-5"
                >
                  <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                    {location.country}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">{location.city}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {location.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
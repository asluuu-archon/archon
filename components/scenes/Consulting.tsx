const services = [
  "SAP consulting",
  "Implementation support",
  "Migration & integration",
  "Resource augmentation",
  "AI & automation",
  "Enterprise application development",
];

export default function Consulting() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
            Consulting
          </p>

          <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            From learning outcomes to enterprise outcomes.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Archon supports businesses with SAP consulting, software
            development, integration, staffing, and technology transformation
            across global markets.
          </p>
        </div>

        <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
          <div className="absolute inset-0 rounded-[2.5rem] bg-cyan-300/5 blur-2xl" />

          <div className="relative grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-white/10 bg-[#07111f]/80 p-5 text-slate-200"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
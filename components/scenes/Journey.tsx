const milestones = [
  {
    year: "2013",
    title: "One room. One founder. One belief.",
    text: "Archon started in Kerala with Mohamed Aslam as the only staff member and a simple belief: learning should prepare people for the real world.",
  },
  {
    year: "First Student",
    title: "Jimmy joined Archon.",
    text: "Archon's first student, Jimmy, went on to build a consulting career in Switzerland.",
  },
  {
    year: "Belgium",
    title: "The first international client.",
    text: "Work with Sylligent in Belgium opened the door for Archon's international consulting journey.",
  },
  {
    year: "Global",
    title: "India, Belgium, Sydney and the UK.",
    text: "Archon expanded where learners and technology opportunities were growing.",
  },
  {
    year: "2026",
    title: "A 15,000 sq ft future campus.",
    text: "Archon's new Kerala campus is being built to support the next generation of builders, consultants and technology leaders.",
  },
];

export default function Journey() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          The Journey
        </p>

        <h2 className="max-w-4xl text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          From one room in Kerala to a global technology ecosystem.
        </h2>

        <div className="mt-20 space-y-8">
          {milestones.map((item) => (
            <div
              key={item.year}
              className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md md:grid-cols-[220px_1fr]"
            >
              <div className="text-cyan-300">{item.year}</div>

              <div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 max-w-3xl text-slate-300">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
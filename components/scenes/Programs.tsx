const programs = [
  {
    title: "SAP Career Programs",
    description:
      "Mentorship, internship exposure, business scenarios and project-based learning for aspiring SAP professionals.",
    label: "Mentorship",
  },
  {
    title: "Software Development",
    description:
      "Python, Java, full stack development and modern engineering programs built around real project outcomes.",
    label: "Training",
  },
  {
    title: "Data, AI & Analytics",
    description:
      "Build practical skills in data analytics, machine learning, AI tools and business intelligence.",
    label: "Training",
  },
  {
    title: "Cloud, DevOps & Cybersecurity",
    description:
      "Industry-focused technology programs designed for modern infrastructure, automation and security roles.",
    label: "Training",
  },
];

export default function Programs() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Programs
        </p>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Learn by building.
            <br />
            Grow through outcomes.
          </h2>

          <p className="max-w-md text-lg leading-8 text-slate-300">
            Archon programs are designed around real-world skills, project
            exposure, mentorship and career transformation.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <div className="mb-8 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
                {program.label}
              </div>

              <h3 className="text-3xl font-bold">{program.title}</h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                {program.description}
              </p>

              <div className="mt-8 text-sm font-semibold text-cyan-300">
                Explore path →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
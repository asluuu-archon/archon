export default function WhyArchon() {
  return (
    <section id="why" className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Why Archon Exists
        </p>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Certificates don’t build careers.
              <br />
              Real understanding does.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              Archon was born from a simple truth: many students are taught to
              pass exams, but not to understand how the real industry works.
            </p>

            <p>
              We believe technology learning should happen through business
              scenarios, real projects, mentorship, internships, and outcomes —
              not just theory.
            </p>

            <p className="text-cyan-200">
              Dream first. Then build the skills to make it possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
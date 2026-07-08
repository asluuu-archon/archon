export default function Campus() {
  return (
    <section id="campus" className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-14">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Future Campus
        </p>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              What began in one room now has space for thousands of dreams.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              In September 2026, Archon is preparing to inaugurate a 15,000 sq
              ft Kerala campus designed for learning, mentoring, building,
              collaboration and innovation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Project labs",
              "Mentorship spaces",
              "Seminar halls",
              "Innovation rooms",
              "Recording studio",
              "Student collaboration zones",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[#07111f]/80 p-5 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
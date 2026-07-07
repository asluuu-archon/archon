export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Archon Solutions
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Learn IT Skills.
            <br />
            Build Real Careers.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Modern IT training, SAP consulting, internships and career-focused
            programs designed for the real industry.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black">
              Explore Courses
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white">
              Talk to Career Advisor
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
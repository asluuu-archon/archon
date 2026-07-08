const stories = [
  {
    number: "7000+",
    title: "Learners skilled",
    text: "Not everyone starts with confidence. Our focus is to make sure every learner leaves with stronger real-world skills.",
  },
  {
    number: "1st",
    title: "Student to Switzerland",
    text: "Jimmy, Archon's first student, is now working as a consultant in Switzerland.",
  },
  {
    number: "4",
    title: "Global locations",
    text: "India, Belgium, Sydney and the UK form the current Archon global footprint.",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Success Stories
        </p>

        <h2 className="max-w-5xl text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          We may not promise jobs to everyone.
          <br />
          But we promise skill, direction and honest effort.
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md"
            >
              <div className="text-5xl font-bold text-cyan-300">
                {story.number}
              </div>

              <h3 className="mt-8 text-2xl font-bold">{story.title}</h3>

              <p className="mt-4 text-base leading-7 text-slate-300">
                {story.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
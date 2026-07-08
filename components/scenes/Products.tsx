const products = [
  {
    name: "AI Command Center",
    status: "In development",
    text: "A smart operating layer for conversations, leads, automation and business intelligence.",
  },
  {
    name: "ArchRoom",
    status: "Planned",
    text: "A future meeting and collaboration platform built first for Archon's internal ecosystem.",
  },
  {
    name: "SAP Guru Assistant",
    status: "In development",
    text: "AI-powered support for SAP career guidance, social replies, leads and student communication.",
  },
];

export default function Products() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Products
        </p>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Archon is not just teaching technology.
            <br />
            We are building it.
          </h2>

          <p className="max-w-xl text-lg leading-8 text-slate-300">
            Our product direction is part of the same belief: learn by solving
            real problems, build tools for real users, and keep expanding what
            Archon can become.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <div className="mb-8 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
                {product.status}
              </div>

              <h3 className="text-3xl font-bold">{product.name}</h3>

              <p className="mt-4 text-base leading-7 text-slate-300">
                {product.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
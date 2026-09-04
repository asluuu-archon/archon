import { AdminNavLink } from "@/components/admin/AdminNavLink";

export default function AdminHomePage() {
  const cards = [
    {
      href: "/admin/gallery",
      title: "Gallery",
      description: "Upload campus, events, and team photos for the public gallery page.",
    },
    {
      href: "/admin/placements",
      title: "Placements",
      description: "Add student placement stories with company, course, and optional salary.",
    },
    {
      href: "/admin/testimonials",
      title: "Reviews",
      description: "Publish client and learner testimonials visible on the website.",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-white">Content dashboard</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Add and manage public-facing content. Changes appear immediately on the gallery,
        placements, and testimonials pages.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <AdminNavLink
            key={card.href}
            href={card.href}
            className="rounded-[2rem] border border-white/10 bg-[#07111f]/70 p-6 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]"
          >
            <h2 className="text-xl font-semibold text-cyan-300">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{card.description}</p>
          </AdminNavLink>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
        Public pages:{" "}
        <a href="/gallery" className="text-cyan-300 hover:underline">
          /gallery
        </a>
        ,{" "}
        <a href="/placements" className="text-cyan-300 hover:underline">
          /placements
        </a>
        ,{" "}
        <a href="/testimonials" className="text-cyan-300 hover:underline">
          /testimonials
        </a>
      </div>
    </div>
  );
}

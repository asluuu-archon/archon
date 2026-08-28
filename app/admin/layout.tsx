import Link from "next/link";

import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { getSession } from "@/lib/auth/session";

const links = [
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/placements", label: "Placements" },
  { href: "/admin/testimonials", label: "Reviews" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {session ? (
        <header className="border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <Link href="/admin" className="text-sm font-bold tracking-[0.2em] text-cyan-300">
                ARCHON ADMIN
              </Link>
              <p className="mt-1 text-xs text-slate-400">{session.email}</p>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <AdminSignOutButton />
            </nav>
          </div>
        </header>
      ) : null}
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

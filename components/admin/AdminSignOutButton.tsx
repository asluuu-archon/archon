import Link from "next/link";

export function AdminSignOutButton() {
  return (
    <Link
      href="/admin/logout"
      className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
    >
      Sign out
    </Link>
  );
}

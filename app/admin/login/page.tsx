"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      let data: { error?: string } = {};
      try {
        data = (await response.json()) as { error?: string };
      } catch {
        data = { error: "Unexpected server response. Check database configuration." };
      }

      if (!response.ok) {
        setError(data.error ?? "Login failed");
        return;
      }

      window.location.href = "/admin";
      return;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError(
          "Login timed out. Database is not reachable — check Supabase DATABASE_URL in .env.local and run prisma db push + db:seed."
        );
      } else {
        setError("Could not reach the login service. Is the database running?");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-[#07111f]/80 p-8 shadow-[0_0_80px_rgba(34,211,238,0.08)]">
      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Admin access</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Sign in</h1>
      <p className="mt-3 text-sm leading-7 text-slate-400">
        Manage gallery photos, placement stories, and client reviews.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring-2"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring-2"
            required
          />
        </label>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

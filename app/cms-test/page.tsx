import type { Metadata } from "next";

import { sanityClient } from "@/sanity/client";
import {
  organisationsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import type {
  Organisation,
  SiteSettings,
} from "@/sanity/types";

export const metadata: Metadata = {
  title: "Archon CMS Connection Test",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60;

export default async function CmsTestPage() {
  let organisations: Organisation[] = [];
  let settings: SiteSettings | null = null;
  let errorMessage: string | null = null;

  try {
    [organisations, settings] = await Promise.all([
      sanityClient.fetch<Organisation[]>(
        organisationsQuery
      ),
      sanityClient.fetch<SiteSettings | null>(
        siteSettingsQuery
      ),
    ]);
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown Sanity connection error.";
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Sanity Connection Test
        </div>

        <h1 className="mt-6 text-4xl font-bold md:text-6xl">
          Archon CMS
        </h1>

        <p className="mt-4 text-slate-400">
          This temporary page verifies that the Next.js
          website can read published content from Sanity.
        </p>

        {errorMessage ? (
          <div className="mt-10 rounded-3xl border border-red-400/25 bg-red-400/10 p-6">
            <div className="font-semibold text-red-300">
              Connection failed
            </div>

            <pre className="mt-4 whitespace-pre-wrap text-sm text-red-200">
              {errorMessage}
            </pre>
          </div>
        ) : (
          <>
            <section className="mt-10 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
              <div className="text-sm font-semibold text-cyan-300">
                Connection successful
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-bold text-white">
                    {organisations.length}
                  </div>

                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Organisations
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-bold text-white">
                    {settings?.learnersCount ?? "—"}
                  </div>

                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Learners
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-bold text-white">
                    {settings?.globalLocationsCount ?? "—"}
                  </div>

                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Global locations
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold">
                Published organisations
              </h2>

              {organisations.length === 0 ? (
                <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-slate-400">
                  The connection works, but there are no
                  published Organisation / Partner documents
                  yet.
                </div>
              ) : (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {organisations.map((organisation) => (
                    <article
                      key={organisation._id}
                      className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
                    >
                      <div className="text-lg font-semibold">
                        {organisation.name}
                      </div>

                      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                        {organisation.relationshipType}
                      </div>

                      {organisation.description && (
                        <p className="mt-4 leading-7 text-slate-400">
                          {organisation.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
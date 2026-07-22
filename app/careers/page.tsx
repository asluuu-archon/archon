import { safeSanityFetch } from "@/lib/sanity.safe";
import { CAREERS_QUERY } from "@/lib/sanity.queries";
import { Career } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Careers | Archon",
  description: "Join the Archon team and build the future of technology and education.",
};

export default async function CareersPage() {
  let careers: Career[] = [];

  careers = await safeSanityFetch<Career[]>({
    query: CAREERS_QUERY,
    tags: ["careers"],
    defaultValue: [],
  });

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Careers</h1>
            <p className="text-lg text-slate-300">
              Join us in building the future of technology, education, and innovation.
            </p>
          </div>

          {careers.length > 0 ? (
            <div className="space-y-6">
              {careers.map((career) => (
                <Link
                  key={career._id}
                  href={`/careers/${career.slug.current}`}
                  className="group"
                >
                  <div className="bg-slate-900 rounded-lg p-6 hover:bg-slate-800 transition-colors border border-slate-800 hover:border-cyan-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-slate-400 mb-3">{career.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="text-xs bg-slate-800 px-3 py-1 rounded">
                            {career.department}
                          </span>
                          <span className="text-xs bg-slate-800 px-3 py-1 rounded">
                            {career.location}
                          </span>
                          <span className="text-xs bg-slate-800 px-3 py-1 rounded">
                            {career.employmentType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-semibold text-sm">
                          View Details →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-6">
                No open positions at the moment.
              </p>
              <p className="text-slate-500">
                Follow us on social media for updates on future opportunities.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

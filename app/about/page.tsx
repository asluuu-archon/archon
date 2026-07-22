import { safeSanityFetch } from "@/lib/sanity.safe";
import { ORGANISATIONS_QUERY, TEAM_QUERY } from "@/lib/sanity.queries";
import { Organisation, TeamMember } from "@/lib/sanity.types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | Archon",
  description: "Learn about Archon's mission, vision, and the team building the future.",
};

export default async function AboutPage() {
  let organisations: Organisation[] = [];
  let team: TeamMember[] = [];

  organisations = await safeSanityFetch<Organisation[]>({
    query: ORGANISATIONS_QUERY,
    tags: ["organisations"],
    defaultValue: [],
  });
  team = await safeSanityFetch<TeamMember[]>({
    query: TEAM_QUERY,
    tags: ["team"],
    defaultValue: [],
  });

  return (
    <main className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">About Archon</h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Born from one room in Kerala in 2013, Archon has grown into a global technology ecosystem helping thousands of learners, professionals, and enterprises build real skills through mentorship, projects, consulting, and outcome-driven growth.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-slate-300">
                Help people and organisations grow through practical knowledge, responsible technology, and outcome-focused execution. We believe learning should prepare people for the real world.
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-slate-300">
                Build a global technology ecosystem connecting learning, consulting, products, AI, and community through one premium digital platform where every participant can dream without limits and build with purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-3xl font-bold mb-12">Our Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Learning", description: "Mentorship, training, and skill development programs" },
              { title: "Consulting", description: "Enterprise solutions and technology advisory" },
              { title: "Products", description: "AI-powered tools and platforms" },
              { title: "Community", description: "Global network of learners and professionals" },
              { title: "Innovation", description: "Research and emerging technology exploration" },
              { title: "Careers", description: "Opportunities to join our mission" },
            ].map((item) => (
              <div key={item.title} className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted Partners */}
        {organisations.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-3xl font-bold mb-12">Trusted Partners & Ecosystem</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {organisations.map((org) => (
                <div key={org._id} className="bg-slate-900 rounded-lg p-6 text-center">
                  {org.logo && (
                    <div className="mb-4 h-12 flex items-center justify-center">
                      <img
                        src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${org.logo.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                        alt={org.name}
                        className="max-h-12 max-w-full"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold mb-2">{org.name}</h3>
                  <p className="text-xs text-slate-400">{org.relationshipType}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Team */}
        {team.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-3xl font-bold mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member._id} className="bg-slate-900 rounded-lg overflow-hidden">
                  {member.image && (
                    <div className="w-full h-48 bg-slate-800 overflow-hidden">
                      <img
                        src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${member.image.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-cyan-400 mb-3">{member.role}</p>
                    <p className="text-sm text-slate-400">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Global Presence */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Global Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { country: "India", city: "Kerala", role: "Learning ecosystem and upcoming 15,000 sq ft campus" },
              { country: "Belgium", city: "Brussels", role: "Consulting, delivery and European client relationships" },
              { country: "Australia", city: "Sydney", role: "Future innovation base and global learner support" },
              { country: "United Kingdom", city: "UK", role: "Growing presence around students and technology opportunities" },
            ].map((location) => (
              <div key={location.country} className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-1">{location.country}</h3>
                <p className="text-sm text-cyan-400 mb-3">{location.city}</p>
                <p className="text-sm text-slate-400">{location.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const beliefs = [
  "Average marks should not define someone's future.",
  "Technology should be learned through business problems.",
  "Certificates matter less than real understanding.",
  "Students should dream first, then build the skill to reach there.",
];

export default function FounderStory() {
  return (
    <section id="founder" className="relative overflow-hidden bg-[#050816] py-40">
      <SectionBackground word="FOUNDER" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="FOUNDER STORY"
          title={"I was not a topper.\nThat became the reason Archon exists."}
          description="Archon was built from the belief that students need more than certificates. They need basics, business understanding, mentorship, confidence and real-world exposure."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <GlowCard className="min-h-[520px]">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                  Mohamed Aslam
                </p>

                <h3 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
                  From one room in Kerala to a global technology ecosystem.
                </h3>
              </div>

              <p className="mt-10 text-lg leading-8 text-slate-300">
                Archon started with one founder, one room and one belief:
                learning should prepare people for real industry, not just
                exams. That belief has now shaped thousands of learners,
                consulting journeys, global offices and new technology products.
              </p>
            </div>
          </GlowCard>

          <div className="grid gap-5">
            {beliefs.map((belief, index) => (
              <GlowCard
                key={belief}
                delay={index * 0.08}
                className="min-h-[120px]"
              >
                <div className="flex items-start gap-5">
                  <div className="text-sm font-semibold tracking-[0.3em] text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="text-xl font-semibold leading-8 text-white">
                    {belief}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
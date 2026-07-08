import CountUp from "@/components/animations/CountUp";
import CinematicSection from "@/components/ui/CinematicSection";
import GlowCard from "@/components/ui/GlowCard";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";

const stories = [
  {
    value: 7000,
    suffix: "+",
    title: "Learners skilled",
    text: "Not everyone starts with confidence. Our focus is to make sure every learner leaves with stronger real-world skills.",
  },
  {
    value: 13,
    suffix: "+",
    title: "Years of building",
    text: "From 2013 to today, Archon has continuously evolved with learners, clients, consultants and technology.",
  },
  {
    value: 4,
    suffix: "",
    title: "Global locations",
    text: "India, Belgium, Sydney and the UK form the current Archon global footprint.",
  },
];

export default function SuccessStories() {
  return (
    <CinematicSection id="stories" glow="left">
      <SectionBackground word="IMPACT" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="SUCCESS STORIES"
          title={
            "We may not promise jobs to everyone.\nBut we promise skill, direction and honest effort."
          }
        />

        <div className="mt-20 grid items-stretch gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <GlowCard key={story.title} delay={index * 0.08}>
              <div className="text-6xl font-bold text-cyan-300">
                <CountUp value={story.value} suffix={story.suffix} />
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-white">
                {story.title}
              </h3>

              <p className="mt-5 leading-7 text-slate-300">{story.text}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
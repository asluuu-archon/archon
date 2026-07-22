import ArchonAI from "@/components/ai/ArchonAI";
import AIContextObserver from "@/components/ai/AIContextObserver";
import GuidedTour from "@/components/ai/GuidedTour";

import ArchonLoader from "@/components/effects/ArchonLoader";
import DataParticles from "@/components/effects/DataParticles";
import DataStreams from "@/components/effects/DataStreams";
import InteractiveCursor from "@/components/effects/InteractiveCursor";
import PageAtmosphere from "@/components/effects/PageAtmosphere";
import SceneBridge from "@/components/effects/SceneBridge";
import SceneWatcher from "@/components/effects/SceneWatcher";

import ChapterTimeline from "@/components/layout/ChapterTimeline";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";

import Arrival from "@/components/scenes/Arrival";
import CampusReveal from "@/components/scenes/CampusReveal";
import Consulting from "@/components/scenes/Consulting";
import FinalCTA from "@/components/scenes/FinalCTA";
import GlobalPresence from "@/components/scenes/GlobalPresence";
import InnovationLab from "@/components/scenes/InnovationLab";
import Journey from "@/components/scenes/Journey";
import Products from "@/components/scenes/Products";
import Programs from "@/components/scenes/Programs";
import StoryScroller from "@/components/scenes/StoryScroller";
import SuccessStories from "@/components/scenes/SuccessStories";
import TrustedEcosystem from "@/components/scenes/TrustedEcosystem";
import WhyArchon from "@/components/scenes/WhyArchon";
import CommandCenter from "@/components/command/CommandCenter";
import InsightsPreview from "@/components/scenes/InsightsPreview";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <ArchonLoader />

      <PageAtmosphere />
      <DataParticles />
      <DataStreams />
      <InteractiveCursor />

      <AIContextObserver />
      <ArchonAI />
      <GuidedTour />
      <CommandCenter />


      <SceneWatcher />
      <Navbar />
      <ChapterTimeline />
      <ScrollProgress />

      <div className="relative z-10">
        <Arrival />

        <SceneBridge
          from="Dream"
          to="Why Archon"
          label="Every journey begins with a reason"
          variant="vision"
        />

        <WhyArchon />

        <SceneBridge
          from="Why Archon"
          to="Founder Story"
          label="The belief came from a personal journey"
          variant="learning"
        />

        <StoryScroller />

        <SceneBridge
          from="Founder Story"
          to="The Journey"
          label="One room became something much larger"
          variant="global"
        />

        <Journey />

        <SceneBridge
          from="The Journey"
          to="Trusted Ecosystem"
          label="Growth becomes meaningful when it is built together"
          variant="global"
        />

        <TrustedEcosystem />

        <SceneBridge
          from="Trusted Ecosystem"
          to="Global Presence"
          label="Relationships created a global delivery network"
          variant="global"
        />

        <GlobalPresence />

        <SceneBridge
          from="Global Presence"
          to="Learning"
          label="Global ambition begins with practical capability"
          variant="learning"
        />

        <Programs />

        <SceneBridge
          from="Learning"
          to="Enterprise Consulting"
          label="Learning outcomes become enterprise outcomes"
          variant="industry"
        />

        <Consulting />

        <SceneBridge
          from="Consulting"
          to="Products"
          label="Experience becomes technology"
          variant="products"
        />

        <Products />

        <SceneBridge
          from="Products"
          to="Innovation Lab"
          label="Connected products create new possibilities"
          variant="products"
        />

        <InnovationLab />

        <SceneBridge
          from="Innovation Lab"
          to="Impact"
          label="Technology matters when it changes journeys"
          variant="vision"
        />

        <SuccessStories />

        <SceneBridge
          from="Impact"
          to="Future Campus"
          label="The next generation needs a place to build"
          variant="campus"
        />

        <CampusReveal />
        <SceneBridge
  from="Future Campus"
  to="Insights"
  label="The ideas behind the journey deserve to be shared"
  variant="vision"
/>

<InsightsPreview />

<SceneBridge
  from="Insights"
  to="The Next Chapter"
  label="Knowledge becomes meaningful when it leads to action"
  variant="vision"
/>

        <SceneBridge
          from="Future Campus"
          to="The Next Chapter"
          label="The future is still being written"
          variant="vision"
        />

        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
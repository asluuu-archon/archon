import PageAtmosphere from "@/components/effects/PageAtmosphere";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Arrival from "@/components/scenes/Arrival";
import Campus from "@/components/scenes/Campus";
import Consulting from "@/components/scenes/Consulting";
import FinalCTA from "@/components/scenes/FinalCTA";
import GlobalPresence from "@/components/scenes/GlobalPresence";
import Journey from "@/components/scenes/Journey";
import Products from "@/components/scenes/Products";
import Programs from "@/components/scenes/Programs";
import SuccessStories from "@/components/scenes/SuccessStories";
import WhyArchon from "@/components/scenes/WhyArchon";

import ScrollProgress from "@/components/layout/ScrollProgress";
import CampusReveal from "@/components/scenes/CampusReveal";
import InnovationLab from "@/components/scenes/InnovationLab";
import SceneWatcher from "@/components/effects/SceneWatcher";
import ChapterTimeline from "@/components/layout/ChapterTimeline";
import StoryScroller from "@/components/scenes/StoryScroller";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <PageAtmosphere />
      <SceneWatcher />
      <Navbar />
      <ChapterTimeline />
      <ScrollProgress />

      <div className="relative z-10">
        <Arrival />
        <WhyArchon />
        <StoryScroller />
        <Journey />
        <GlobalPresence />
        <Programs />
        <Consulting />
        <Products />
        <InnovationLab />
        <SuccessStories />
        <CampusReveal />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
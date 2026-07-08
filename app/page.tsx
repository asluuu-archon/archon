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
import FounderStory from "@/components/scenes/FounderStory";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <PageAtmosphere />
      <Navbar />
      <ScrollProgress />

      <div className="relative z-10">
        <Arrival />
        <WhyArchon />
        <FounderStory />
        <Journey />
        <GlobalPresence />
        <Programs />
        <Consulting />
        <Products />
        <SuccessStories />
        <Campus />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
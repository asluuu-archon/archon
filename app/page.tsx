import PageAtmosphere from "@/components/effects/PageAtmosphere";
import Navbar from "@/components/layout/Navbar";
import Arrival from "@/components/scenes/Arrival";
import Consulting from "@/components/scenes/Consulting";
import FinalCTA from "@/components/scenes/FinalCTA";
import Journey from "@/components/scenes/Journey";
import Products from "@/components/scenes/Products";
import Programs from "@/components/scenes/Programs";
import SuccessStories from "@/components/scenes/SuccessStories";
import WhyArchon from "@/components/scenes/WhyArchon";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <PageAtmosphere />
      <Navbar />

      <div className="relative z-10">
        <Arrival />
        <WhyArchon />
        <Journey />
        <Programs />
        <Consulting />
        <Products />
        <SuccessStories />
        <FinalCTA />
      </div>
    </main>
  );
}
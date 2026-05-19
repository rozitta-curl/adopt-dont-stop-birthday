import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import StoriesSection from "@/components/sections/StoriesSection";
import StatsSection from "@/components/sections/StatsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import AnimalsSection from "@/components/sections/AnimalsSection";
import WhatsNextSection from "@/components/sections/WhatsNextSection";
import HousewarmingSection from "@/components/sections/HousewarmingSection";
import DonationSection from "@/components/sections/DonationSection";
import ThankYouBanner from "@/components/sections/ThankYouBanner";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <div style={{ backgroundColor: "var(--color-yellow)" }}>
          <HeroSection />
          <StoriesSection />
        </div>
        <StatsSection />
        <TimelineSection />
        <AnimalsSection />
        <WhatsNextSection />
        <HousewarmingSection />
        <DonationSection />
        <ThankYouBanner />
      </main>
    </>
  );
}

import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import FloatingDonateButton from "@/components/ui/FloatingDonateButton";
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
      <FloatingDonateButton />
      <main>
        <HeroSection />
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

import { AdvantageSection } from "@/components/advantage-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { OurCasesSection } from "@/components/our-cases-section";
import { ProcessSection } from "@/components/proccess-section";
import { ReviewsSection } from "@/components/reviews-section";
import { TariffsSection } from "@/components/tariffs-section";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AdvantageSection />
      <TariffsSection />
      <ProcessSection />

      <ReviewsSection />
      <OurCasesSection />
      <FaqSection />
    </>
  );
}

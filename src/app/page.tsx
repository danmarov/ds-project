import { AdvantageSection } from "@/components/advantage-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { OurCasesSection } from "@/components/our-cases-section";
import { ProcessSection } from "@/components/proccess-section";
import { ReviewsSection } from "@/components/reviews-section";
import { TariffsSection } from "@/components/tariffs-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DS PARTNERS | Міжнародні перекази",
  description:
    "Великі міжнародні переклади від €100K. Інвестиції в нерухомість та бізнес. Перевірені кейси, прозорі умови.",
};

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

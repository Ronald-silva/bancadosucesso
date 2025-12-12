import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import UrgencySection from "@/components/UrgencySection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <SocialProofSection />
      <UrgencySection />
      <GuaranteeSection />
      <FooterSection />
    </main>
  );
};

export default Index;

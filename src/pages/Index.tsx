import HeroSection from "@/components/HeroSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProductsSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <SocialProofSection />
      <GuaranteeSection />
      <FooterSection />
    </main>
  );
};

export default Index;

import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <TrustBadgesSection />
        <CategoriesSection />
        <FeaturedProductsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;

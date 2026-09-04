import AudienceSection from "./AudienceSection";
import ClientStoriesSection from "./ClientStoriesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ManifestoSection from "./ManifestoSection";
import MarketReachSection from "./MarketReachSection";
import ProductShowcaseSection from "./ProductShowcaseSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ManifestoSection />
      <ProductShowcaseSection />
      <AudienceSection />
      <MarketReachSection />
      <ClientStoriesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

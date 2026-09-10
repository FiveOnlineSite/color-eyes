import AudienceSection from "./AudienceSection";
import ClientStoriesSection from "./ClientStoriesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import HeroIntroLoader from "./HeroIntroLoader";
import HeroSection from "./HeroSection";
import Header from "./Header";
import ManifestoSection from "./ManifestoSection";
import MarketReachSection from "./MarketReachSection";
import ProductShowcaseSection from "./ProductShowcaseSection";
import WhatsAppButton from "./WhatsAppButton";

const loaderImages = [
  ["blue-lens.webp", "Blue contact lens"],
  ["brown-lens.webp", "Brown contact lens"],
  ["green-lens.webp", "Green contact lens"],
  ["grey-lens.webp", "Grey contact lens"],
  ["olive-lens.webp", "Olive contact lens"],
  ["purple-eyes.webp", "Purple contact lens"],
  ["yellow-lens.webp", "Yellow contact lens"],
];

export default function HomePage() {
  return (
    <main>
      <HeroIntroLoader images={loaderImages} />
      <Header />
      <HeroSection />
      <ManifestoSection />
      <ProductShowcaseSection />
      <AudienceSection />
      <MarketReachSection />
      <ClientStoriesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

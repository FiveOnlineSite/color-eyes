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
  ["loader1.jpg", "Loader image 1"],
  ["loader3.jpg", "Loader image 3"],
  ["loader4.jpg", "Loader image 4"],
  ["loader5.jpg", "Loader image 5"],
  ["loader6.jpg", "Loader image 6"],
  ["loader7.jpg", "Loader image 7"],
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

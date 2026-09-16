import AudienceSection from "./AudienceSection";
import ContactSection from "./ContactSection";
import DeferredInteractiveSection from "./DeferredInteractiveSection";
import Footer from "./Footer";
import HeroIntroLoader from "./HeroIntroLoader";
import HeroSection from "./HeroSection";
import Header from "./Header";
import ManifestoSection from "./ManifestoSection";
import WhatsAppButton from "./WhatsAppButton";

const loaderImages = [
  ["/assets/loader-lenses/blue-lens.webp", "Blue contact lens"],
  ["/assets/loader-lenses/brown-lens.webp", "Brown contact lens"],
  ["/assets/loader-lenses/green-lens.webp", "Green contact lens"],
  ["/assets/loader-lenses/grey-lens.webp", "Grey contact lens"],
  ["/assets/loader-lenses/olive-lens.webp", "Olive contact lens"],
  ["/assets/loader-lenses/purple-eyes.webp", "Purple contact lens"],
  ["/assets/loader-lenses/yellow-lens.webp", "Yellow contact lens"],
];

export default function HomePage() {
  return (
    <main>
      <HeroIntroLoader images={loaderImages} />
      <Header />
      <HeroSection />
      <ManifestoSection />
      <DeferredInteractiveSection section="product" />
      <AudienceSection />
      <DeferredInteractiveSection section="market" />
      <DeferredInteractiveSection section="stories" />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

import Image from "next/image";

import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";
import SellerSection from "@/components/product/SellerSection";
import ActionLink from "@/components/home/ActionLink";

export const metadata = {
  title: "Find a Distributor | ColorEyes",
  description: "Find an authorised ColorEyes distributor near you, or get in touch to become a distributor.",
};

export default function FindMyDistributorPage() {
  return (
    <main className="overflow-x-clip bg-[#fcfcfc]">
      <Header homePath="/" activePage="distributor" />

      <section className="relative mt-32 h-[444px] overflow-hidden max-[900px]:mt-[112px] max-[640px]:h-[470px]" aria-labelledby="distributor-hero-title">
        <video className="absolute inset-0 size-full object-cover" src="/assets/bg-sky.mp4" autoPlay loop muted playsInline aria-hidden="true" />
        <div className="pointer-events-none absolute top-[9px] right-[14px] h-[561px] w-[624px] overflow-hidden max-[780px]:right-[-170px] max-[780px]:opacity-55 max-[560px]:right-[-280px]" aria-hidden="true">
          <Image className="absolute top-[-5.85%] left-[-60.11%] h-[118.78%] w-[160.06%] max-w-none" src="/assets/find-my-product/banner-model.png" alt="" width={999} height={667} priority />
        </div>
        <div className="relative z-10 mx-auto w-[min(1280px,89%)] pt-[60px] max-[640px]:pt-11">
          <SectionBadge>ColorEyes Near You</SectionBadge>
          <h1 id="distributor-hero-title" className="mt-5 max-w-[470px] text-5xl leading-[56px] font-semibold text-white [font-family:var(--font-gabarito)] max-[640px]:max-w-[320px] max-[640px]:text-[38px] max-[640px]:leading-[44px]">Find a Distributor<br />Near You</h1>
          <p className="mt-4 max-w-[403px] text-base leading-6 text-white [font-family:var(--font-manrope)] max-[640px]:max-w-[300px] max-[640px]:text-sm">Connect with an authorised ColorEyes distributor for trusted products, reliable availability, and local support.</p>
          <ActionLink className="mt-9" href="#distributors" variant="light">Find a Distributor</ActionLink>
        </div>
      </section>

      <SellerSection />

      <ContactSection
        id="become-a-distributor"
        badge="Grow With ColorEyes"
        title="Become a Distributor"
        mobileTitle={["Become a", "Distributor"]}
        description="Join our growing network and help bring ColorEyes contact lenses to more customers in your market."
        primaryAction={{ href: "/become-a-distributor", label: "Become a Distributor" }}
        secondaryAction={{ href: "tel:+919876543210", label: "Talk to Our Team" }}
        overlap={false}
      />
      <Footer homePath="/" />
    </main>
  );
}

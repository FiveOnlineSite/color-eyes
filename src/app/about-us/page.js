import Image from "next/image";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import SectionBadge from "@/components/home/SectionBadge";
import QualityAccordion from "@/components/about/QualityAccordion";
import TrustSection from "@/components/about/TrustSection";

export const metadata = {
  title: "About Us | ColorEyes",
  description: "Learn about the ColorEyes story, our purpose, quality commitment, and the people behind our eye care products.",
};

const stats = [
  ["10K+", "Happy Customers"],
  ["15+", "Trusted Partners"],
  ["50+", "Products"],
  ["25K+", "Orders Completed"],
  ["10+", "Brands"],
  ["15+", "Years of Experience"],
];

const team = [
  ["K. Malhotra", "/assets/about/team-1.png"],
  ["Sidharth Sharma", "/assets/about/team-2.png"],
  ["Mukesh Chabra", "/assets/about/team-3.png"],
  ["Rohit Thapa", "/assets/about/team-4.png"],
];

export default function AboutUsPage() {
  return (
    <main className="overflow-x-clip bg-[#fcfcfc]">
      <Header homePath="/" activePage="about" />

      <section className="relative h-[724px] overflow-hidden bg-white max-[900px]:h-[660px] max-[640px]:h-[680px]" aria-labelledby="about-hero-title">
        <video aria-hidden="true" autoPlay loop muted playsInline preload="metadata" className="pointer-events-none absolute inset-0 h-full w-full object-cover">
          <source src="/assets/bg-sky.mp4" type="video/mp4" />
        </video>
        <Image className="pointer-events-none absolute top-[-411px] left-1/2 h-[1648px] w-[1648px] max-w-none -translate-x-1/2" src="/assets/about/hero-background.svg" alt="" width={1648} height={1648} priority aria-hidden="true" />
        <div className="absolute top-[258px] left-[calc(50%-571px)] h-[345px] w-[300px] -rotate-[4.94deg] overflow-hidden rounded-xl max-[1100px]:left-[4%] max-[900px]:top-[300px] max-[900px]:h-[270px] max-[900px]:w-[210px] max-[640px]:top-[366px] max-[640px]:left-[7%] max-[640px]:h-[190px] max-[640px]:w-[145px]">
          <Image src="/assets/about/hero-left.png" alt="Woman wearing ColorEyes lenses" fill sizes="(max-width: 640px) 145px, (max-width: 900px) 210px, 300px" className="object-cover" priority />
        </div>
        <div className="absolute top-[263px] right-[calc(50%-585px)] h-[345px] w-[300px] rotate-[12.95deg] overflow-hidden rounded-xl max-[1100px]:right-[4%] max-[900px]:top-[300px] max-[900px]:h-[270px] max-[900px]:w-[210px] max-[640px]:top-[366px] max-[640px]:right-[7%] max-[640px]:h-[190px] max-[640px]:w-[145px]">
          <Image src="/assets/about/hero-right.png" alt="Two women expressing their style" fill sizes="(max-width: 640px) 145px, (max-width: 900px) 210px, 300px" className="object-cover" priority />
        </div>
        <Image src="/assets/about/play-icon.svg" alt="" width={36} height={36} className="pointer-events-none absolute top-[395px] left-[calc(50%+408px)] size-9 max-[900px]:hidden" aria-hidden="true" />
        <div className="absolute top-[317px] left-1/2 z-10 w-[min(520px,90%)] -translate-x-1/2 text-center text-white max-[640px]:top-[210px]">
          <h1 id="about-hero-title" className="text-[48px] leading-[72px] font-bold [font-family:var(--font-gabarito)] max-[900px]:text-[40px] max-[900px]:leading-[56px] max-[640px]:text-[34px] max-[640px]:leading-10">WHERE VISION<br />MEETS EXPRESSION</h1>
          <p className="mx-auto mt-2 max-w-[389px] text-base leading-7 max-[640px]:mt-4 max-[640px]:text-sm max-[640px]:leading-6">Driven by better vision, thoughtful innovation and a commitment to making eye care more accessible.</p>
        </div>
      </section>

      <section className="min-h-[685px] bg-[#fcfcfc] py-[88px] max-[900px]:py-20 max-[640px]:py-16" aria-labelledby="about-story-title">
        <div className="mx-auto w-[min(1280px,89%)]">
          <div className="grid grid-cols-[minmax(0,1fr)_519px] gap-12 max-[1100px]:grid-cols-[minmax(0,1fr)_42%] max-[900px]:grid-cols-1">
            <div>
              <SectionBadge>The Color Eyes Story</SectionBadge>
              <h2 id="about-story-title" className="mt-[31px] max-w-[431px] text-4xl leading-[48px] font-semibold text-black [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">A Journey Shaped by Better Eye Care</h2>
              <div className="mt-6 max-w-[628px] space-y-4 text-base leading-7 text-[#444]">
                <p>At ColorEyes, we envision a world where everyone has access to high-quality, affordable contact lenses that enhance their vision and complement their lifestyle.</p>
                <p>Founded in 2009, ColorEyes aims to transform the contact lens industry with innovative, affordable options. We provide a diverse range of lenses, including daily, weekly, monthly, colored, toric, prosthetic, and clear lenses, tailored to our customers&apos; needs.</p>
              </div>
            </div>
            <div className="relative mt-[18px] h-[321px] overflow-hidden rounded-lg max-[900px]:mt-0 max-[900px]:h-auto max-[900px]:aspect-[519/321]">
              <Image src="/assets/about/story.png" alt="An eye care professional consulting with a customer" fill sizes="(max-width: 900px) 89vw, 519px" className="object-cover" />
            </div>
          </div>
          <div className="mt-[78px] flex gap-10 max-[1100px]:grid max-[1100px]:grid-cols-3 max-[1100px]:gap-8 max-[640px]:mt-12 max-[640px]:grid-cols-2 max-[640px]:gap-y-8">
            {stats.map(([number, label], index) => (
              <div className={`w-[163px] shrink-0 text-[#1d1d1d] max-[1100px]:w-auto ${index < stats.length - 1 ? "border-r border-[#ccc] max-[1100px]:border-0" : ""}`} key={label}>
                <p className="text-[28px] leading-9 font-semibold [font-family:var(--font-gabarito)]">{number}</p>
                <p className="mt-3 text-base leading-6 max-[640px]:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[555px] bg-[#14798f] py-[60px] text-white max-[640px]:py-16" aria-labelledby="about-purpose-title">
        <div className="mx-auto w-[min(1280px,89%)]">
          <SectionBadge>OUR PURPOSE</SectionBadge>
          <h2 id="about-purpose-title" className="mt-[31px] max-w-[430px] text-4xl leading-[48px] font-semibold [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">The Vision We See. The Mission We Follow.</h2>
          <div className="mt-11 grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
            <article className="min-h-[224px] rounded-2xl bg-white px-[42px] py-[35px] text-black shadow-[0_1px_16px_rgba(0,0,0,0.1)] max-[640px]:px-6">
              <h3 className="text-[28px] leading-9 font-bold [font-family:var(--font-gabarito)]">Our Mission</h3>
              <p className="mt-5 text-base leading-7 text-[#1d1d1d]">To make high-quality, innovative and safe contact lenses accessible to everyone, while creating lasting value for our customers, partners and communities.</p>
            </article>
            <article className="min-h-[224px] rounded-2xl bg-white px-[42px] py-[35px] text-black shadow-[0_1px_16px_rgba(0,0,0,0.1)] max-[640px]:px-6">
              <h3 className="text-[28px] leading-9 font-bold [font-family:var(--font-gabarito)]">Our Vision</h3>
              <p className="mt-5 text-base leading-7 text-[#1d1d1d]">To be a globally trusted eyewear brand, known for innovation, quality and customer-centric solutions that enhance lives and inspire confidence.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="min-h-[766px] bg-[#fcfcfc] py-[60px] max-[640px]:py-16" aria-labelledby="about-quality-title">
        <div className="mx-auto w-[min(1280px,89%)]">
          <div className="text-center"><SectionBadge>QUALITY &amp; SAFETY</SectionBadge></div>
          <h2 id="about-quality-title" className="mt-[31px] text-center text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">Our Commitment to Safety &amp; Trust</h2>
          <div className="mt-12 grid grid-cols-[595px_minmax(0,1fr)] gap-[55px] max-[1350px]:grid-cols-[1fr_1.06fr] max-[900px]:grid-cols-1 max-[900px]:gap-8">
            <QualityAccordion />
            <div className="relative h-[476px] overflow-hidden rounded-xl max-[900px]:h-auto max-[900px]:aspect-[630/476]">
              <Image src="/assets/about/quality.png" alt="Close-up of a blue eye" fill sizes="(max-width: 900px) 89vw, 630px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="h-[905px] bg-[#fcfcfc] pt-[60px] max-[900px]:h-auto max-[900px]:pb-16 max-[640px]:pt-16" aria-labelledby="about-team-title">
        <div className="mx-auto w-[min(1280px,89%)] text-center">
          <SectionBadge>OUR TEAM</SectionBadge>
          <h2 id="about-team-title" className="mt-[31px] text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">The People Behind Color Eyes</h2>
          <div className="mt-12 grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            {team.map(([name, photo]) => (
              <article className="relative h-[381px] overflow-hidden rounded-lg" key={name}>
                <Image src={photo} alt={name} fill sizes="(max-width: 640px) 89vw, (max-width: 900px) 45vw, 305px" className="object-cover object-top" />
                <div className="absolute right-4 bottom-[15px] left-4 rounded-lg bg-white px-3 py-[9px] text-center">
                  <h3 className="text-xl leading-[30px] font-semibold text-black [font-family:var(--font-gabarito)]">{name}</h3>
                  <p className="text-sm leading-6 font-semibold text-[#444]">Profile</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer homePath="/" />
    </main>
  );
}

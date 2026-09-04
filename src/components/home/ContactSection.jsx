import ActionLink from "./ActionLink";
import SectionBadge from "./SectionBadge";

export default function ContactSection() {
  return (
    <section
      className="relative z-[5] mx-auto -mt-60 flex h-[400px] w-[min(1282px,calc(100%-160px))] flex-col items-center overflow-hidden rounded-[20px] bg-[#0863bd] pt-[60px] text-white shadow-[0_1px_8px_rgba(7,75,90,0.15)] max-[1180px]:w-[calc(100%-80px)] max-[900px]:w-[calc(100%-48px)] max-[640px]:-mt-[120px] max-[640px]:min-h-[470px] max-[640px]:w-[calc(100%-32px)] max-[640px]:px-5 max-[640px]:py-14 max-[640px]:text-center"
      id="contact"
      aria-labelledby="contact-title"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 size-full object-cover object-center"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/connect-coloreyes-bg.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[#063f75]/55"
      />

      <div className="relative z-[2] flex flex-col items-center max-[640px]:w-full">
        <SectionBadge tone="white">Get In Touch</SectionBadge>
        <h2
          className="mt-5 text-5xl leading-14 font-bold [font-family:var(--font-gabarito)] max-[640px]:text-[38px] max-[640px]:leading-[46px]"
          id="contact-title"
        >
          Connect With Coloreyes
        </h2>
        <p className="mt-4 w-[435px] text-center text-sm leading-6 [font-family:var(--font-manrope)] max-[640px]:w-full">
          Have a question about our products, partnerships or eye-care solutions?
          Our team is here to help you find the right next step.
        </p>
        <div className="mt-12 flex gap-[18px] max-[640px]:mt-9 max-[640px]:flex-col">
          <ActionLink href="mailto:admin@vibhutiinsurance.com" variant="light">Contact Us</ActionLink>
          <ActionLink href="tel:+919876543210" variant="outline">Talk to Our Team</ActionLink>
        </div>
      </div>
    </section>
  );
}

import ActionLink from "./ActionLink";
import DeferredVideo from "./DeferredVideo";
import SectionBadge from "./SectionBadge";
import WaveHeadingText from "./WaveHeadingText";

export default function ContactSection({
  id = "contact",
  badge = "Get In Touch",
  title = "Connect With Coloreyes",
  mobileTitle = ["Connect With", "Coloreyes"],
  description = "Have a question about our products, partnerships or eye-care solutions? Our team is here to help you find the right next step.",
  primaryAction = { href: "mailto:admin@coloreyes.com", label: "Contact Us" },
  secondaryAction = { href: "tel:+919876543210", label: "Talk to Our Team" },
  overlap = true,
}) {
  return (
    <section
      className={`relative z-[5] mx-auto ${overlap ? "-mt-50 max-[640px]:mt-4" : "mt-0"} mb-16 flex h-[400px] w-[min(1282px,calc(100%-160px))] flex-col items-center overflow-hidden rounded-[20px] bg-[#0863bd] pt-[60px] pb-8 text-white shadow-[0_1px_8px_rgba(7,75,90,0.15)] max-[1180px]:w-[calc(100%-80px)] max-[900px]:w-[calc(100%-48px)] max-[640px]:mb-8 max-[640px]:min-h-[470px] max-[640px]:w-[calc(100%-32px)] max-[640px]:px-5 max-[640px]:py-14 max-[640px]:text-center`}
      id={id}
      aria-labelledby="contact-title"
    >
      <DeferredVideo
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 size-full object-cover object-center"
        loop
        muted
        playsInline
        src="/assets/bg-sky.mp4"
        type="video/mp4"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[#145a8d]/35"
      />

      <div className="relative z-[2] flex flex-col items-center max-[640px]:w-full">
        <SectionBadge tone="white">{badge}</SectionBadge>
        <h2
          className="mt-5 text-5xl leading-14 font-bold [font-family:var(--font-gabarito)] max-[640px]:text-[38px] max-[640px]:leading-[46px]"
          id="contact-title"
        >
          <span className="max-[640px]:hidden">
            <WaveHeadingText lines={title} />
          </span>
          <span className="hidden max-[640px]:inline">
            <WaveHeadingText lines={mobileTitle} />
          </span>
        </h2>
        <p className="mt-4 w-[435px] text-center text-sm leading-6 [font-family:var(--font-manrope)] max-[640px]:w-full">
          {description}
        </p>
        <div className="mt-12 flex gap-[18px] max-[640px]:mt-9 max-[640px]:flex-col">
          <ActionLink className="max-[640px]:self-center" href={primaryAction.href} variant="light">{primaryAction.label}</ActionLink>
          <ActionLink className="max-[640px]:self-center" href={secondaryAction.href} variant="outline">{secondaryAction.label}</ActionLink>
        </div>
      </div>
    </section>
  );
}

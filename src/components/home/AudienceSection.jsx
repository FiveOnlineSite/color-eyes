import Image from "next/image";

import SectionBadge from "./SectionBadge";
import WaveHeadingText from "./WaveHeadingText";

const audiences = [
  { title: "Consumer", copy: "Comfortable lens solutions made for daily wear, clear vision and effortless self-expression.", icon: "audience-consumer-animated.gif" },
  { title: "Beauty Professional", copy: "Versatile lens options that help artists elevate makeup, styling and visual expression.", icon: "audience-beauty-animated.gif" },
  { title: "Optical Retailers", copy: "A dependable range designed to help retailers serve varied customer needs with confidence.", icon: "audience-retailer-animated.gif" },
  { title: "Distributors & Resellers", copy: "Comfortable lens solutions made for daily wear, clear vision and effortless self-expression.", icon: "audience-distributor-animated.gif" },
];

export default function AudienceSection() {
  return (
    <section
      className="h-[647px] bg-white px-20 py-[60px] max-[1180px]:px-12 max-[900px]:h-auto max-[900px]:px-8 max-[900px]:pt-14 max-[900px]:pb-[72px] max-[640px]:px-5 max-[640px]:pt-[50px] max-[640px]:pb-16"
      id="eye-care"
      aria-labelledby="audience-title"
    >
      <SectionBadge tone="gray">Built For Everyone</SectionBadge>
      <h2
        className="mt-6 mb-[42px] text-4xl leading-12 font-bold text-[#232323] [font-family:var(--font-gabarito)] max-[640px]:text-[clamp(20px,7vw,30px)] max-[640px]:leading-[1.3]"
        id="audience-title"
      >
        <WaveHeadingText
          lines={["Made for Every Perspective.", "Designed for Every Need."]}
        />
      </h2>
      <div className="grid h-[315px] grid-cols-4 border-y border-dashed border-[#777] max-[900px]:h-auto max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
        {audiences.map(({ title, copy, icon }) => (
          <article
            className="flex flex-col justify-between border-r border-dashed border-[#777] p-6 last:border-r-0 max-[900px]:min-h-[260px] max-[900px]:border-b max-[900px]:even:border-r-0 max-[900px]:nth-[n+3]:border-b-0 max-[640px]:min-h-[220px] max-[640px]:border-r-0 max-[640px]:border-b! max-[640px]:last:border-b-0!"
            key={title}
          >
            <Image className="size-10" src={`/assets/${icon}`} alt="" width={40} height={40} aria-hidden="true" />
            <div>
              <h3 className="mb-3 text-xl leading-[30px] font-semibold text-[#232323] [font-family:var(--font-gabarito)]">{title}</h3>
              <p className="m-0 text-sm leading-6 text-[#444] [font-family:var(--font-manrope)]">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

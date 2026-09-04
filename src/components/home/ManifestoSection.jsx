import ActionLink from "./ActionLink";
import ParticleHeading from "./ParticleHeading";
import SectionBadge from "./SectionBadge";

export default function ManifestoSection() {
  return (
    <section
      className="flex h-[703px] flex-col items-center overflow-hidden bg-[#fafafa] pt-20 text-center max-[900px]:h-auto max-[900px]:min-h-[650px] max-[900px]:px-6 max-[900px]:py-[72px]"
      id="about"
      aria-labelledby="manifesto-title"
    >
      <SectionBadge>Trusted Vision Care. Made Personal.</SectionBadge>
      <ParticleHeading />
      <p className="mb-12 grid min-h-[84px] w-[min(940px,calc(100%-48px))] place-items-center rounded-lg border border-dashed border-[#444] px-[54px] py-4 text-base leading-6 text-[#111] [font-family:var(--font-manrope)] max-[900px]:mb-[38px] max-[900px]:px-6 max-[900px]:py-[18px] max-[640px]:w-full max-[640px]:text-sm">
        ColorEyes brings together thoughtful eye care, innovative lens technology
        and modern self-expression to create comfortable, confidence-led vision
        experiences designed for everyday life.
      </p>
      <ActionLink href="#brands">Know More</ActionLink>
    </section>
  );
}

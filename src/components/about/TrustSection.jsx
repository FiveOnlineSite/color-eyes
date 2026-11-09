"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionBadge from "@/components/home/SectionBadge";

const reasons = [
  ["Comfort-Focused Design", "Designed for comfortable everyday wear, helping lenses feel easy, balanced and dependable throughout your routine."],
  ["Natural-Looking Choices", "Explore shades and styles created to complement natural eye colour while supporting confident personal expression."],
  ["Vision Options That Fit", "Choose from clear, powered and specialised lenses designed to support different vision and lifestyle needs."],
  ["Quality You Can Trust", "Careful manufacturing and quality checks help maintain consistent performance, safety and dependable product standards throughout."],
  ["Support That Stays Close", "Access helpful guidance through our products, retail partners and distributor network whenever support is needed."],
  ["Growing Professional Network", "Strong relationships with optical retailers, professionals and distributors help extend reliable access across growing markets."],
];

export default function TrustSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const listRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(min-width: 901px)", () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const list = listRef.current;
      const travel = () => Math.max(0, list.scrollHeight - viewport.clientHeight);
      const hold = () => Math.min(280, Math.round(window.innerHeight * 0.35));
      const syncList = (trigger) => {
        const distance = Math.min(travel(), Math.max(0, trigger.scroll() - trigger.start));
        gsap.set(list, { y: -distance });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(1, travel() + hold())}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: syncList,
        onRefresh: syncList,
      });

      return () => {
        trigger.kill();
        gsap.set(list, { clearProps: "transform" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="bg-[#fffffd] pb-8 max-[900px]:pb-0">
      <section
        ref={sectionRef}
        className="relative h-[max(100svh,700px)] overflow-hidden bg-[#fffffd] max-[900px]:h-auto max-[900px]:overflow-visible max-[900px]:py-16"
        aria-labelledby="about-trust-title"
      >
        <div className="mx-auto grid h-full w-[min(1280px,89%)] grid-cols-[478px_minmax(0,1fr)] gap-[172px] max-[1350px]:grid-cols-[38%_minmax(0,1fr)] max-[1350px]:gap-[12%] max-[900px]:h-auto max-[900px]:grid-cols-1 max-[900px]:gap-0">
          <div className="h-fit pt-[60px] max-[900px]:pt-0">
            <SectionBadge>Why Trust Us</SectionBadge>
            <h2 id="about-trust-title" className="mt-3 max-w-[336px] text-[32px] leading-10 font-bold text-black [font-family:var(--font-gabarito)] max-[640px]:text-[30px]">More Than Just Contact Lenses</h2>
            <p className="mt-4 text-sm leading-6 text-[#444]">ColorEyes combines thoughtful design, quality, and support to deliver lens solutions that feel great, look natural, and fit seamlessly into daily life.</p>
            <div className="relative mt-6 h-[305px] overflow-hidden rounded-[7px] max-[900px]:h-auto max-[900px]:aspect-[510/305]">
              <Image src="/assets/about/trust.png" alt="Woman wearing contact lenses" fill sizes="(max-width: 900px) 89vw, 478px" className="object-cover object-[center_38%]" />
            </div>
          </div>
          <div ref={viewportRef} className="h-full overflow-hidden max-[900px]:h-auto max-[900px]:overflow-visible">
            <div ref={listRef} className="space-y-6 pt-[218px] pb-[60px] max-[900px]:pt-12 max-[900px]:pb-0">
              {reasons.map(([title, description]) => (
                <article className="min-h-[149px] border-l-2 border-black py-6 pl-[22px] max-[640px]:min-h-0" key={title}>
                  <h3 className="text-2xl leading-9 font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-xl">{title}</h3>
                  <p className="mt-[11px] text-base leading-7 text-[#444]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

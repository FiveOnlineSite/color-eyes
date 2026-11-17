"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionBadge from "@/components/home/SectionBadge";

const milestones = [
  {
    year: "2009",
    title: "A clearer beginning",
    copy: "ColorEyes began with a simple ambition: make dependable contact lenses more accessible without compromising on comfort, safety or style.",
    image: "/assets/about/story.png",
    alt: "Eye care professional consulting with a customer",
  },
  {
    year: "2013",
    title: "More ways to see yourself",
    copy: "Our range grew to serve different routines, prescriptions and expressions—bringing clearer vision and more choice to everyday wear.",
    image: "/assets/about/hero-left.png",
    alt: "Woman wearing ColorEyes lenses",
  },
  {
    year: "2018",
    title: "Care that reaches further",
    copy: "With stronger retail and professional partnerships, we made it easier for more people to find trusted lens solutions close to home.",
    image: "/assets/market-reach.png",
    alt: "ColorEyes market reach",
  },
  {
    year: "Today",
    title: "Looking ahead with care",
    copy: "We continue to create thoughtful lens experiences that bring together innovation, confidence and everyday eye care.",
    image: "/assets/about/quality.png",
    alt: "Close-up of a blue eye",
  },
];

export default function AboutTimeline() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 901px)", () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return undefined;

      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, travel() + window.innerHeight * 0.45)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[max(100svh,700px)] overflow-hidden bg-[#eaf7fb] py-[76px] max-[900px]:h-auto max-[900px]:overflow-visible max-[900px]:py-16" aria-labelledby="about-timeline-title">
      <div className="mx-auto flex h-full w-[min(1280px,89%)] flex-col">
        <div>
          <SectionBadge>Our Journey</SectionBadge>
          <h2 id="about-timeline-title" className="mt-5 text-4xl leading-[48px] font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-[30px] max-[640px]:leading-10">A Vision That Keeps Moving Forward</h2>
        </div>

        <div ref={viewportRef} className="mt-12 min-h-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto max-[900px]:overflow-x-auto">
          <div ref={trackRef} className="flex h-full w-max gap-6 pb-2 max-[900px]:h-auto">
            {milestones.map(({ year, title, copy, image, alt }) => (
              <article className="grid h-[320px] w-[min(76vw,850px)] grid-cols-[minmax(0,1fr)_260px] overflow-hidden rounded-2xl border border-[#79adba] bg-white p-7 shadow-[0_8px_28px_rgba(8,96,116,.1)] max-[900px]:h-[320px] max-[900px]:w-[min(86vw,620px)] max-[640px]:h-auto max-[640px]:min-h-[440px] max-[640px]:w-[84vw] max-[640px]:grid-cols-1 max-[640px]:p-5" key={year}>
                <div className="flex min-w-0 flex-col pr-7 max-[640px]:pr-0">
                  <p className="text-sm font-bold tracking-[0.14em] text-[#08778f] uppercase">{year}</p>
                  <h3 className="mt-4 text-[30px] leading-9 font-semibold text-[#1d1d1d] [font-family:var(--font-gabarito)] max-[640px]:text-2xl max-[640px]:leading-8">{title}</h3>
                  <p className="mt-5 text-base leading-7 text-[#4c5b60]">{copy}</p>
                </div>
                <div className="relative aspect-square self-center overflow-hidden rounded-xl bg-[#d5edf4] max-[640px]:mt-6 max-[640px]:w-full">
                  <Image src={image} alt={alt} fill sizes="(max-width: 640px) 74vw, 260px" className="object-cover" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

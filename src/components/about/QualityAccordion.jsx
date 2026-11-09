"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const commitments = [
  {
    title: "Quality Manufacturing",
    description: "Built around consistent standards and careful quality checks to support reliable lens performance. Every stage is designed to maintain precision, safety and product consistency.",
    icon: "/assets/about/quality-icon.svg",
  },
  {
    title: "Safe Materials",
    description: "Materials are selected with comfort and reliable everyday wear in mind.",
    icon: "/assets/about/safe-icon.svg",
  },
  {
    title: "Global Standards",
    description: "Our processes are guided by a commitment to consistent quality across every product range.",
    icon: "/assets/about/standards-icon.svg",
  },
  {
    title: "Responsible Use",
    description: "We encourage thoughtful lens care and responsible habits at every step of the customer journey.",
    icon: "/assets/about/responsible-icon.svg",
  },
];

export default function QualityAccordion() {
  const accordionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressCycle, setProgressCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateAnimation = () => {
      setCanAnimate(!document.hidden && !motionPreference.matches);
    };

    observer.observe(accordionRef.current);
    updateAnimation();
    document.addEventListener("visibilitychange", updateAnimation);
    motionPreference.addEventListener("change", updateAnimation);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAnimation);
      motionPreference.removeEventListener("change", updateAnimation);
    };
  }, []);

  const isPlaying = isVisible && canAnimate;

  function selectCard(index) {
    setActiveIndex(index);
    setProgressCycle((cycle) => cycle + 1);
  }

  return (
    <div className="flex flex-col gap-5" ref={accordionRef}>
      {commitments.map((item, index) => {
        const active = index === activeIndex;

        return (
          <section
            className={`relative overflow-hidden rounded-lg border border-[#14798f] transition-colors ${active ? "min-h-[179px] bg-[#14798f] text-white shadow-[inset_0_2px_16px_rgba(0,0,0,0.19)]" : "min-h-20 bg-transparent text-[#14798f]"}`}
            key={item.title}
          >
            <button
              aria-expanded={active}
              className="flex min-h-[78px] w-full cursor-pointer items-center gap-4 px-5 text-left [font-family:var(--font-gabarito)]"
              onClick={() => selectCard(index)}
              type="button"
            >
              <Image src={item.icon} alt="" width={40} height={40} className={`size-10 shrink-0 ${active && index !== 0 ? "brightness-0 invert" : ""}`} aria-hidden="true" />
              <span className="text-[28px] leading-9 font-semibold max-[640px]:text-xl max-[640px]:leading-7">{item.title}</span>
            </button>
            {active && <p className="pr-8 pb-5 pl-[76px] text-base leading-7 [font-family:var(--font-manrope)] max-[640px]:pr-5 max-[640px]:pl-5">{item.description}</p>}
            {active && (
              <div className="absolute top-0 right-0 left-0 h-[3px] bg-white/25" aria-hidden="true">
                <span
                  className={`block h-full w-full origin-left bg-white ${isPlaying ? "animate-[quality-progress_4s_linear_forwards]" : "scale-x-0"}`}
                  key={`${index}-${progressCycle}-${isPlaying}`}
                  onAnimationEnd={() => {
                    setActiveIndex((current) => current === index ? (current + 1) % commitments.length : current);
                  }}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

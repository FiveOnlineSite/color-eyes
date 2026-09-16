"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ProductShowcaseSection = dynamic(
  () => import("./ProductShowcaseSection"),
  { ssr: false },
);
const MarketReachSection = dynamic(
  () => import("./MarketReachSection"),
  { ssr: false },
);
const ClientStoriesSection = dynamic(
  () => import("./ClientStoriesSection"),
  { ssr: false },
);

const sections = {
  product: ProductShowcaseSection,
  market: MarketReachSection,
  stories: ClientStoriesSection,
};

const HERO_INTRO_COMPLETE_EVENT = "hero-intro-complete";

const reservedSpace = {
  // The desktop product section is pinned for four viewport heights; reserving
  // that space prevents a layout shift while its animation bundle is fetched.
  product: "min-h-[500svh] max-[767px]:min-h-[2160px]",
  market: "h-[780px] max-[900px]:h-[620px] max-[640px]:h-[660px]",
  stories: "h-[920px] max-[900px]:h-[820px] max-[640px]:min-h-[680px]",
};

export default function DeferredInteractiveSection({ section }) {
  const hostRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const Section = sections[section];

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !Section) return undefined;

    // This section creates a multi-viewport GSAP pin spacer. Loading it only
    // at the viewport boundary can briefly replace that spacer with a blank
    // placeholder while ScrollTrigger initializes, so prepare it as soon as
    // scrolling is unlocked instead.
    if (section === "product") {
      const loadProduct = () => setShouldLoad(true);

      if (!document.querySelector(".hero-intro-loader")) {
        loadProduct();
        return undefined;
      }

      window.addEventListener(HERO_INTRO_COMPLETE_EVENT, loadProduct, {
        once: true,
      });
      return () =>
        window.removeEventListener(HERO_INTRO_COMPLETE_EVENT, loadProduct);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [Section, section]);

  if (!Section) return null;

  return (
    <div ref={hostRef} aria-busy={!shouldLoad}>
      {shouldLoad ? (
        <Section />
      ) : (
        <div aria-hidden="true" className={reservedSpace[section]} />
      )}
    </div>
  );
}

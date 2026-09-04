"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionBadge from "./SectionBadge";

const brands = [
  {
    id: "celebration",
    title: "CELEBRATION",
    count: "01/03",
    description:
      "Colour made to stand out. Comfort made to stay with you.",
    background: "/assets/celebration-showcase-bg.png",
    mark: "celebration",
    headingFont: "[font-family:var(--font-gabarito)]",
    backgroundClass: "object-cover",
    overlayClass: "",
  },
  {
    id: "polylite",
    title: "POLYLITE",
    count: "02/03",
    description:
      "Everyday clarity, effortless comfort — made to move with you.",
    background: "/assets/brand-polylite-bg.png",
    mark: "polylite",
    headingFont: "[font-family:var(--font-oswald)]",
    backgroundClass: "object-cover",
    overlayClass: "bg-[#092e4e]/50",
  },
  {
    id: "clearthin",
    title: "CLEARTHIN",
    count: "03/03",
    description:
      "Subtle colour, natural comfort — made to feel effortlessly you.",
    background: "/assets/brand-clearthin-bg.png",
    mark: "clearthin",
    headingFont: "[font-family:var(--font-oswald)]",
    backgroundClass: "object-cover mix-blend-color-burn",
    overlayClass: "bg-[#45bfff]/25",
  },
];

const reversedBrands = [...brands].reverse();
const INTRO_HOLD_SCROLLS = 0.5;
const POLYLITE_HOLD_SCROLLS = 0.5;
const CLEARTHIN_HOLD_SCROLLS = 1;
const BRAND_TRANSITIONS = 2;
const FIRST_SPLIT_AT = INTRO_HOLD_SCROLLS;
const POLYLITE_CENTERED_AT = FIRST_SPLIT_AT + 1;
const SECOND_SPLIT_AT = POLYLITE_CENTERED_AT + POLYLITE_HOLD_SCROLLS;
const CLEARTHIN_CENTERED_AT = SECOND_SPLIT_AT + 1;
const SHOWCASE_SCROLLS =
  INTRO_HOLD_SCROLLS +
  BRAND_TRANSITIONS +
  POLYLITE_HOLD_SCROLLS +
  CLEARTHIN_HOLD_SCROLLS;
const CLEARTHIN_LOCK_PROGRESS = CLEARTHIN_CENTERED_AT / SHOWCASE_SCROLLS;
const SCROLL_PROGRESS_EPSILON = 0.001;

function BrandMark({ brand, className = "" }) {
  if (brand.mark === "celebration") {
    return (
      <Image
        alt="Celebration"
        className={`h-[62px] w-[155px] object-contain ${className}`}
        height={62}
        src="/assets/brand-celebration-logo.png"
        width={155}
      />
    );
  }

  if (brand.mark === "polylite") {
    return (
      <div
        aria-label="Polylite 38 Daily Wear"
        className={`flex h-[62px] w-[155px] items-center justify-center ${className}`}
        role="img"
      >
        <div className="relative flex h-10 w-[142px] items-center bg-[#08a7df] px-2 text-white">
          <strong className="text-[21px] leading-none font-bold [font-family:var(--font-oswald)]">
            POLYLITE<sup className="ml-0.5 align-top text-[7px]">TM</sup>
          </strong>
          <span className="ml-auto border-l border-white/70 pl-1.5 text-[25px] leading-none font-light [font-family:var(--font-oswald)]">
            38
          </span>
          <span className="absolute bottom-[2px] left-2 text-[6px] leading-none tracking-[0.4px]">
            DAILY WEAR
          </span>
          <i className="absolute right-[7px] bottom-[2px] size-[6px] rounded-full border border-[#d5df15]" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Clearthin Lava and UV Protection"
      className={`flex h-[52px] w-[155px] flex-col items-center justify-center text-[#8a1a7a] ${className}`}
      role="img"
    >
      <strong className="text-[22px] leading-none font-semibold tracking-[-0.7px] [font-family:var(--font-gabarito)]">
        CLEARTHIN<sup className="ml-0.5 align-top text-[7px]">TM</sup>
      </strong>
      <span className="mt-1 text-[6px] leading-none font-bold tracking-[1.25px]">
        LAVA &amp; UV PROTECTION
      </span>
    </div>
  );
}

function BrandCategories({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-[clamp(12px,0.972vw,15px)] leading-5 [font-family:var(--font-manrope)] ${className}`}
    >
      <span>Colour Lenses</span>
      <Image src="/assets/brand-category-dot.svg" alt="" width={10} height={10} />
      <span>Everyday Style</span>
      <Image src="/assets/brand-category-dot.svg" alt="" width={10} height={10} />
      <span>Self Expression</span>
    </div>
  );
}

function BrandForeground({ brand }) {
  return (
    <>
      <div className="absolute top-[16.45%] left-1/2 -translate-x-1/2">
        <SectionBadge tone="white">BUILT FOR EVERYONE</SectionBadge>
      </div>

      <BrandMark
        brand={brand}
        className="absolute top-[26.6%] left-1/2 -translate-x-1/2"
      />

      <BrandCategories className="absolute top-[38.09%] left-1/2 w-[355px] -translate-x-1/2" />

      <h3
        className={`absolute top-[43.41%] left-1/2 -translate-x-1/2 text-center text-[clamp(84px,8.333vw,140px)] leading-[1.1333] font-bold tracking-[-1.2px] whitespace-nowrap ${brand.headingFont}`}
      >
        {brand.title}
      </h3>

      <p className="absolute top-[63.48%] left-1/2 -translate-x-1/2 text-center text-[clamp(16px,1.389vw,22px)] leading-[30px] font-medium whitespace-nowrap [font-family:var(--font-roboto)]">
        {brand.description}
      </p>

      <p className="absolute top-[86.7%] left-[5.56%] text-[clamp(16px,1.389vw,22px)] leading-[30px] font-medium [font-family:var(--font-roboto)]">
        {brand.count}
      </p>
      <p className="absolute top-[86.7%] right-[5.49%] text-[clamp(16px,1.389vw,22px)] leading-[30px] font-medium [font-family:var(--font-roboto)]">
        Keep Scrolling
      </p>
    </>
  );
}

function BrandArtwork({ brand, side }) {
  const isFullArtwork = side === "full";

  return (
    <div
      aria-hidden={side === "left" ? "true" : undefined}
      className={`absolute isolate overflow-hidden bg-[#f0f1ff] text-white ${
        isFullArtwork
          ? "inset-0 w-full"
          : `inset-y-0 w-[200%] ${side === "left" ? "left-0" : "right-0"}`
      }`}
    >
      <Image
        aria-hidden="true"
        alt=""
        className={`-z-20 pointer-events-none select-none object-center ${brand.backgroundClass}`}
        draggable={false}
        fill
        sizes="100vw"
        src={brand.background}
        unoptimized
      />
      {brand.overlayClass ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 ${brand.overlayClass}`}
        />
      ) : null}

      <BrandForeground brand={brand} />
    </div>
  );
}

function SplitTrack({ brandsInOrder, side, trackRef }) {
  return (
    <div
      className={`absolute left-0 flex h-[300%] w-full flex-col [backface-visibility:hidden] will-change-transform ${side === "right" ? "bottom-0" : "top-0"}`}
      ref={trackRef}
    >
      {brandsInOrder.map((brand) => (
        <div className="relative h-1/3 w-full shrink-0" key={brand.id}>
          <BrandArtwork brand={brand} side={side} />
        </div>
      ))}
    </div>
  );
}

function MobileBrandSlide({ brand }) {
  return (
    <article
      aria-labelledby={`${brand.id}-mobile-title`}
      className="relative isolate h-[720px] overflow-hidden bg-[#f0f1ff] text-white"
    >
      <Image
        alt=""
        aria-hidden="true"
        className={`-z-20 ${brand.backgroundClass}`}
        fill
        sizes="100vw"
        src={brand.background}
        unoptimized
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${brand.overlayClass}`}
      />

      <div className="flex h-full flex-col items-center px-5 pt-[76px] text-center">
        <SectionBadge tone="white">BUILT FOR EVERYONE</SectionBadge>

        <BrandMark brand={brand} className="mt-9" />

        <BrandCategories className="mt-7 max-[479px]:gap-2 max-[479px]:text-[11px]" />

        <h3
          className={`mt-4 text-[clamp(56px,17vw,76px)] leading-none font-bold tracking-[-0.8px] ${brand.headingFont}`}
          id={`${brand.id}-mobile-title`}
        >
          {brand.title}
        </h3>

        <p className="mt-6 max-w-[560px] text-base leading-7 font-medium [font-family:var(--font-roboto)]">
          {brand.description}
        </p>

      </div>

      <p className="absolute bottom-8 left-6 text-sm font-medium [font-family:var(--font-roboto)]">
        {brand.count}
      </p>
      <p className="absolute right-6 bottom-8 text-sm font-medium [font-family:var(--font-roboto)]">
        Keep Scrolling
      </p>
    </article>
  );
}

export default function ProductShowcaseSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const splitRef = useRef(null);
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const finalArtworkRef = useRef(null);
  const productCursorRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mediaQuery;
    const ctx = gsap.context(() => {
      mediaQuery = gsap.matchMedia();

      mediaQuery.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const leftTrack = leftTrackRef.current;
          const rightTrack = rightTrackRef.current;
          const pin = pinRef.current;
          const split = splitRef.current;
          const finalArtwork = finalArtworkRef.current;
          const productCursor = productCursorRef.current;

          if (
            !leftTrack ||
            !rightTrack ||
            !pin ||
            !split ||
            !finalArtwork ||
            !productCursor
          ) {
            return undefined;
          }

          gsap.set([leftTrack, rightTrack], { force3D: false, y: 0 });
          gsap.set(finalArtwork, { autoAlpha: 0 });
          const supportsPointerCursor = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;
          let moveCursorX;
          let moveCursorY;
          let showProductCursor;
          let moveProductCursor;
          let hideProductCursor;

          if (supportsPointerCursor) {
            gsap.set(productCursor, { autoAlpha: 0, xPercent: -50, yPercent: -50 });
            moveCursorX = gsap.quickTo(productCursor, "x", {
              duration: 0.16,
              ease: "power3.out",
            });
            moveCursorY = gsap.quickTo(productCursor, "y", {
              duration: 0.16,
              ease: "power3.out",
            });
            moveProductCursor = (event) => {
              const bounds = pin.getBoundingClientRect();
              moveCursorX(event.clientX - bounds.left);
              moveCursorY(event.clientY - bounds.top);
            };
            showProductCursor = (event) => {
              moveProductCursor(event);
              gsap.to(productCursor, {
                autoAlpha: 1,
                duration: 0.2,
                overwrite: "auto",
              });
            };
            hideProductCursor = () => {
              gsap.to(productCursor, {
                autoAlpha: 0,
                duration: 0.16,
                overwrite: "auto",
              });
            };

            pin.addEventListener("pointerenter", showProductCursor);
            pin.addEventListener("pointermove", moveProductCursor);
            pin.addEventListener("pointerleave", hideProductCursor);
          }
          const trackPosition = { y: 0 };
          let showcaseProgress = 0;
          const setLeftTrackY = gsap.quickSetter(leftTrack, "y", "px");
          const setRightTrackY = gsap.quickSetter(rightTrack, "y", "px");
          const syncSplitTracks = () => {
            const timelinePosition = showcaseProgress * SHOWCASE_SCROLLS;
            const isPolyliteResting =
              timelinePosition >=
                POLYLITE_CENTERED_AT - SCROLL_PROGRESS_EPSILON &&
              timelinePosition <= SECOND_SPLIT_AT + SCROLL_PROGRESS_EPSILON;
            const devicePixelRatio = window.devicePixelRatio || 1;
            const renderedY = isPolyliteResting
              ? split.clientHeight
              : trackPosition.y;
            const alignedY =
              Math.round(renderedY * devicePixelRatio) / devicePixelRatio;

            setLeftTrackY(-alignedY);
            setRightTrackY(alignedY);
          };
          const clearthinHold = { progress: 0 };
          let isStaticClearthinVisible = false;
          const setStaticClearthinVisibility = (isVisible) => {
            if (isStaticClearthinVisible === isVisible) return;

            isStaticClearthinVisible = isVisible;
            gsap.set(finalArtwork, { autoAlpha: isVisible ? 1 : 0 });
          };
          const lockClearthinAtRest = (trigger) => {
            const hasReachedFinalPause =
              trigger.progress >=
              CLEARTHIN_LOCK_PROGRESS - SCROLL_PROGRESS_EPSILON;

            setStaticClearthinVisibility(hasReachedFinalPause);
          };

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: syncSplitTracks,
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${window.innerHeight * SHOWCASE_SCROLLS}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 2,
              invalidateOnRefresh: true,
              onUpdate: (trigger) => {
                showcaseProgress = trigger.progress;
                lockClearthinAtRest(trigger);
                syncSplitTracks();
              },
              onLeave: () => setStaticClearthinVisibility(true),
              onLeaveBack: () => setStaticClearthinVisibility(false),
            },
          });

          timeline
            .addLabel("firstSplit", FIRST_SPLIT_AT)
            .to(
              trackPosition,
              { duration: 1, y: () => split.clientHeight },
              "firstSplit",
            )
            .addLabel("polyliteCentered", POLYLITE_CENTERED_AT)
            .addLabel("secondSplit", SECOND_SPLIT_AT)
            .to(
              trackPosition,
              { duration: 1, y: () => split.clientHeight * 2 },
              "secondSplit",
            )
            .addLabel("clearthinCentered", CLEARTHIN_CENTERED_AT)
            .to(
              clearthinHold,
              { duration: CLEARTHIN_HOLD_SCROLLS, progress: 1 },
              "clearthinCentered",
            );

          return () => {
            if (supportsPointerCursor) {
              pin.removeEventListener("pointerenter", showProductCursor);
              pin.removeEventListener("pointermove", moveProductCursor);
              pin.removeEventListener("pointerleave", hideProductCursor);
              moveCursorX.tween.kill();
              moveCursorY.tween.kill();
            }

            timeline.kill();
            gsap.set([leftTrack, rightTrack], { clearProps: "transform" });
            gsap.set(finalArtwork, { clearProps: "opacity,visibility" });
            gsap.set(productCursor, { clearProps: "opacity,transform,visibility" });
          };
        },
      );
    }, rootRef);

    return () => {
      mediaQuery?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="brands" ref={rootRef} aria-labelledby="brands-title">
      <h2 className="sr-only" id="brands-title">
        ColorEyes product brands
      </h2>

      <div
        className="relative h-[100svh] max-[767px]:hidden motion-reduce:hidden"
        ref={pinRef}
      >
        <div className="absolute inset-0 overflow-hidden" ref={splitRef}>
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <SplitTrack
              brandsInOrder={brands}
              side="left"
              trackRef={leftTrackRef}
            />
          </div>

          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <SplitTrack
              brandsInOrder={reversedBrands}
              side="right"
              trackRef={rightTrackRef}
            />
          </div>

          <div
            className="invisible absolute inset-0 z-20 opacity-0"
            ref={finalArtworkRef}
          >
            <BrandArtwork brand={brands[2]} side="full" />
          </div>
        </div>

        <a
          aria-label="View products"
          className="invisible absolute top-0 left-0 z-50 grid size-[clamp(108px,8.68vw,138px)] place-items-center rounded-full text-[clamp(14px,1.11vw,17px)] font-medium text-white opacity-0 [font-family:var(--font-roboto)]"
          href="#contact"
          ref={productCursorRef}
          tabIndex={-1}
        >
          <Image
            aria-hidden="true"
            alt=""
            className="absolute inset-0 size-full"
            height={125}
            src="/assets/brand-product-ring.svg"
            width={125}
          />
          <span className="relative">View Products</span>
        </a>
      </div>

      <div className="hidden max-[767px]:block motion-reduce:block">
        {brands.map((brand) => (
          <MobileBrandSlide brand={brand} key={brand.id} />
        ))}
      </div>
    </section>
  );
}

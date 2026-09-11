"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_BLUE = "#a9cdec";
const IMAGE_REVEAL_DURATION = 0.25;
const IMAGE_HOLD_DURATION = 0.28;
const BLUE_HOLD_DURATION = 0.3;

const BLOCKED_SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

export default function HeroIntroLoader({ images }) {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const blueCoverRef = useRef(null);
  const percentRef = useRef(null);
  const imageRefs = useRef([]);
  const sources = useMemo(
    () => [
      ...new Set(
        images.map(([source]) =>
          source.startsWith("/") ? source : `/assets/${source}`,
        ),
      ),
    ],
    [images],
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const card = cardRef.current;
    const blueCover = blueCoverRef.current;
    const percent = percentRef.current;
    const imageNodes = imageRefs.current.filter(Boolean);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!root || !card || !blueCover || !percent) return undefined;

    let disposed = false;
    let timeline;
    let scrollIsLocked = true;

    const preventScroll = (event) => event.preventDefault();
    const preventScrollKey = (event) => {
      if (BLOCKED_SCROLL_KEYS.has(event.key)) event.preventDefault();
    };
    const unlockScroll = () => {
      if (!scrollIsLocked) return;
      scrollIsLocked = false;
      document.documentElement.classList.remove("hero-intro-active");
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      window.removeEventListener("keydown", preventScrollKey, true);
    };
    const finishIntro = () => {
      if (disposed) return;
      unlockScroll();
      root.classList.remove("hero-intro-loader");
      gsap.set(root, { display: "none" });
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    document.documentElement.classList.add("hero-intro-active");
    window.addEventListener("wheel", preventScroll, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchmove", preventScroll, {
      capture: true,
      passive: false,
    });
    window.addEventListener("keydown", preventScrollKey, true);

    gsap.set(imageNodes, {
      autoAlpha: 0,
      scale: 0.96,
    });
    gsap.set(percent, { autoAlpha: 1, textContent: "0%" });

    const preloadImages = sources.map(
      (source) =>
        new Promise((resolve) => {
          const image = new window.Image();
          const complete = () => resolve();
          image.onload = () => {
            image.decode?.().catch(() => undefined).finally(complete);
          };
          image.onerror = complete;
          image.src = source;
          if (image.complete) complete();
        }),
    );

    const playIntro = () => {
      if (disposed) return;

      timeline = gsap.timeline({ onComplete: finishIntro });
      const progress = { value: 0 };
      const updatePercentage = () => {
        percent.textContent = `${Math.round(progress.value)}%`;
      };

      if (!reducedMotion) {
        imageNodes.forEach((imageNode, index) => {
          const stageStart = timeline.duration();
          const stagePercentage = ((index + 1) / imageNodes.length) * 100;

          timeline
            .set(imageNode, {
              autoAlpha: 1,
              scale: 0.96,
            })
            .to(imageNode, {
              scale: 1,
              duration: IMAGE_REVEAL_DURATION,
              ease: "power2.inOut",
            })
            .to({}, { duration: IMAGE_HOLD_DURATION })
            .set(imageNode, { autoAlpha: 0 });

          timeline.to(
            progress,
            {
              value: stagePercentage,
              duration: IMAGE_REVEAL_DURATION + IMAGE_HOLD_DURATION,
              ease: "none",
              onUpdate: updatePercentage,
            },
            stageStart,
          );
        });
      } else {
        timeline
          .to(progress, {
            value: 100,
            duration: 0.3,
            ease: "none",
            onUpdate: updatePercentage,
          });
      }

      timeline
        .set(imageNodes, { autoAlpha: 0 })
        .to(blueCover, {
          autoAlpha: 1,
          duration: reducedMotion ? 0.1 : 0.2,
          ease: "power1.out",
        })
        .to({}, { duration: reducedMotion ? 0.1 : BLUE_HOLD_DURATION })
        .to(percent, {
          autoAlpha: 0,
          duration: reducedMotion ? 0.05 : 0.15,
          ease: "power1.out",
        })
        .to(card, {
          scaleX: root.clientWidth / card.offsetWidth,
          scaleY: root.clientHeight / card.offsetHeight,
          duration: reducedMotion ? 0.25 : 0.8,
          ease: "power3.inOut",
        })
        .to(root, {
          autoAlpha: 0,
          duration: reducedMotion ? 0.1 : 0.22,
          ease: "power1.out",
        });
    };

    void Promise.all(preloadImages).then(playIntro);

    return () => {
      disposed = true;
      timeline?.kill();
      unlockScroll();
      root.classList.remove("hero-intro-loader");
    };
  }, [sources]);

  return (
    <div
      ref={rootRef}
      className="hero-intro-loader fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-white"
      style={{
        backgroundColor: "#fff",
        display: "grid",
        inset: 0,
        overflow: "hidden",
        placeItems: "center",
        position: "fixed",
        zIndex: 200,
      }}
      aria-hidden="true"
    >
      <div
        ref={cardRef}
        className="relative aspect-square w-[min(68vw,250px)] shrink-0 overflow-hidden will-change-transform"
      >
        {sources.map((source, index) => (
          <Image
            key={source}
            ref={(node) => {
              imageRefs.current[index] = node;
            }}
            className="absolute inset-0 object-contain object-center opacity-0 will-change-[transform,opacity]"
            src={source}
            alt=""
            fill
            preload
            sizes="250px"
            unoptimized
          />
        ))}
        <span
          ref={blueCoverRef}
          className="absolute inset-0 z-10 opacity-0"
          style={{ backgroundColor: HERO_BLUE }}
        />
        <span
          ref={percentRef}
          className="absolute top-3 right-3 z-20 min-w-11 bg-white/85 px-2 py-1 text-right font-mono text-xs font-semibold tracking-[-0.03em] text-[#061d39] tabular-nums backdrop-blur-sm"
        >
          0%
        </span>
      </div>
    </div>
  );
}

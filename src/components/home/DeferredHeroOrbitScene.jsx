"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroOrbitScene = dynamic(() => import("./HeroOrbitScene"), {
  ssr: false,
});

const HERO_INTRO_COMPLETE_EVENT = "hero-intro-complete";

export default function DeferredHeroOrbitScene({ images, title }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loadOrbit = () => setShouldLoad(true);

    // The orbit is hidden by the loader, so evaluating Three.js before this
    // point only delays the initial page without improving what is visible.
    if (!document.querySelector(".hero-intro-loader")) {
      loadOrbit();
      return undefined;
    }

    window.addEventListener(HERO_INTRO_COMPLETE_EVENT, loadOrbit, {
      once: true,
    });
    return () => window.removeEventListener(HERO_INTRO_COMPLETE_EVENT, loadOrbit);
  }, []);

  return shouldLoad ? <HeroOrbitScene images={images} title={title} showTitle={false} /> : null;
}

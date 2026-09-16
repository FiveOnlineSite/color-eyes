"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomepageSmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return undefined;

    let disposed = false;
    let started = false;
    let destroySmoothScroll = () => {};

    const startSmoothScroll = async () => {
      if (disposed || started) return;
      started = true;

      const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (disposed) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        syncTouch: false,
        autoRaf: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      });

      let isActive = true;
      let firstRefreshFrame = 0;
      let secondRefreshFrame = 0;

      const refreshAfterLayout = () => {
        window.cancelAnimationFrame(firstRefreshFrame);
        window.cancelAnimationFrame(secondRefreshFrame);

        firstRefreshFrame = window.requestAnimationFrame(() => {
          secondRefreshFrame = window.requestAnimationFrame(() => {
            if (!isActive) return;
            lenis.resize();
            ScrollTrigger.refresh();
          });
        });
      };

      const unsubscribeFromLenis = lenis.on("scroll", ScrollTrigger.update);
      const tickLenis = (time) => lenis.raf(time * 1000);

      gsap.ticker.add(tickLenis);
      gsap.ticker.lagSmoothing(0);

      const pageReady =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((resolve) => {
              window.addEventListener("load", resolve, { once: true });
            });
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      // A single refresh after initial layout settles replaces per-asset
      // refreshes. Deferred sections refresh themselves when they mount.
      void Promise.all([pageReady, fontsReady]).then(() => {
        if (isActive) refreshAfterLayout();
      });

      destroySmoothScroll = () => {
        isActive = false;
        window.cancelAnimationFrame(firstRefreshFrame);
        window.cancelAnimationFrame(secondRefreshFrame);

        gsap.ticker.remove(tickLenis);
        unsubscribeFromLenis();
        lenis.destroy();
      };
    };

    const handleIntroComplete = () => startSmoothScroll();
    if (document.querySelector(".hero-intro-loader")) {
      window.addEventListener("hero-intro-complete", handleIntroComplete, {
        once: true,
      });
    } else {
      startSmoothScroll();
    }

    return () => {
      disposed = true;
      window.removeEventListener("hero-intro-complete", handleIntroComplete);
      destroySmoothScroll();
    };
  }, [pathname]);

  return null;
}

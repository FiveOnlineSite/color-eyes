"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function HomepageSmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return undefined;

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

    const pendingAssets = [];
    const watchAsset = (asset, eventName) => {
      asset.addEventListener(eventName, refreshAfterLayout, { once: true });
      asset.addEventListener("error", refreshAfterLayout, { once: true });
      pendingAssets.push([asset, eventName]);
    };

    document.querySelectorAll("img").forEach((image) => {
      if (!image.complete) watchAsset(image, "load");
    });

    document.querySelectorAll("video").forEach((video) => {
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
        watchAsset(video, "loadedmetadata");
      }
    });

    window.addEventListener("load", refreshAfterLayout, { once: true });
    document.fonts?.ready.then(() => {
      if (isActive) refreshAfterLayout();
    });

    refreshAfterLayout();

    return () => {
      isActive = false;
      window.cancelAnimationFrame(firstRefreshFrame);
      window.cancelAnimationFrame(secondRefreshFrame);
      window.removeEventListener("load", refreshAfterLayout);

      pendingAssets.forEach(([asset, eventName]) => {
        asset.removeEventListener(eventName, refreshAfterLayout);
        asset.removeEventListener("error", refreshAfterLayout);
      });

      gsap.ticker.remove(tickLenis);
      unsubscribeFromLenis();
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}

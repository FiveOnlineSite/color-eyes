"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredVideo({ src, type, ...videoProps }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;

    video.load();
    void video.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <video ref={videoRef} {...videoProps} preload="none">
      {shouldLoad ? <source src={src} type={type} /> : null}
    </video>
  );
}

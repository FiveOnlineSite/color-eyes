"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import SectionBadge from "./SectionBadge";
import WaveHeadingText from "./WaveHeadingText";

const stories = [
  {
    alt: "ColorEyes client story",
    title: "Coloured lens essentials",
    youtubeId: "VXSAVCoQ0LA",
  },
  {
    alt: "ColorEyes client story",
    title: "Contact lens guide",
    youtubeId: "m-Px8OxzCY0",
  },
  {
    alt: "ColorEyes client story",
    title: "Lens care tutorial",
    youtubeId: "0pPVkAcwp7Q",
  },
  {
    alt: "ColorEyes client story",
    title: "Circle lens basics",
    youtubeId: "w4ad2YQOxRU",
  },
  {
    alt: "ColorEyes client story",
    title: "Coloured contact tips",
    youtubeId: "WQUMyGvW3ag",
  },
  {
    alt: "ColorEyes client story",
    title: "Cleaning contact lenses",
    youtubeId: "w7skd-AA1PQ",
  },
];

function getYouTubeEmbedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=0&enablejsapi=1&playsinline=1&rel=0`;
}

function getYouTubeThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function getPlacement(index, activeIndex) {
  const position = (index - activeIndex + stories.length) % stories.length;

  return position;
}

export default function ClientStoriesSection() {
  const dragRef = useRef({ active: false, startX: 0 });
  const playerRefs = useRef([]);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mutedStories, setMutedStories] = useState(() => stories.map(() => true));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const sendPlayerCommand = useCallback((index, func, args = []) => {
    playerRefs.current[index]?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  }, []);

  const activateStory = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    sendPlayerCommand(activeIndex, mutedStories[activeIndex] ? "mute" : "unMute");
    sendPlayerCommand(activeIndex, "seekTo", [0, true]);
    sendPlayerCommand(activeIndex, "playVideo");
  }, [activeIndex, mutedStories, sendPlayerCommand]);

  useEffect(() => {
    const onPlayerEvent = (event) => {
      if (!event.origin.includes("youtube")) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.event !== "onStateChange" || data.info !== 0) return;

        const finishedIndex = playerRefs.current.findIndex(
          (player) => player?.contentWindow === event.source,
        );

        if (finishedIndex < 0) return;
        setActiveIndex((current) =>
          current === finishedIndex ? (current + 1) % stories.length : current,
        );
      } catch {
        // Ignore non-YouTube postMessage payloads.
      }
    };

    window.addEventListener("message", onPlayerEvent);
    return () => window.removeEventListener("message", onPlayerEvent);
  }, []);

  useLayoutEffect(() => {
    const sideOffset = isMobile ? window.innerWidth * 0.38 : 337;
    const sideY = isMobile ? 31 : 29;
    const sideScaleX = isMobile ? 0.73 : 0.846;
    const sideScaleY = isMobile ? 0.752 : 0.837;

    const tweens = cardRefs.current.flatMap((card, index) => {
      if (!card) return [];
      const position = getPlacement(index, activeIndex);
      const motion =
        position === 0
          ? { autoAlpha: 1, scaleX: 1, scaleY: 1, x: 0, y: 0, zIndex: 20 }
            : position === 1
              ? {
                  autoAlpha: 1,
                  scaleX: sideScaleX,
                  scaleY: sideScaleY,
                  x: sideOffset,
                  y: sideY,
                  zIndex: 10,
                }
              : position === stories.length - 1
                ? {
                    autoAlpha: 1,
                    scaleX: sideScaleX,
                    scaleY: sideScaleY,
                    x: -sideOffset,
                    y: sideY,
                    zIndex: 10,
                  }
              : { autoAlpha: 0, scaleX: 0.75, scaleY: 0.75, x: 0, y: sideY, zIndex: 0 };

      return [
        gsap.to(card, {
          ...motion,
          xPercent: -50,
          duration: 1.15,
          ease: "power3.inOut",
          overwrite: "auto",
        }),
      ];
    });

    return () => tweens.forEach((tween) => tween.kill());
  }, [activeIndex, isMobile]);

  const finishDrag = (event) => {
    if (!dragRef.current.active) return;

    const distance = event.clientX - dragRef.current.startX;
    dragRef.current.active = false;

    if (Math.abs(distance) < 36) return;
    activateStory(
      distance < 0
        ? (activeIndex + 1) % stories.length
        : (activeIndex - 1 + stories.length) % stories.length,
    );
  };

  const onPointerDown = (event) => {
    dragRef.current = { active: true, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const toggleMuted = (index) => {
    setMutedStories((current) =>
      current.map((isMuted, storyIndex) => (storyIndex === index ? !isMuted : isMuted)),
    );
    const command = mutedStories[index] ? "unMute" : "mute";
    sendPlayerCommand(index, command);
  };

  return (
    <section
      className="relative flex h-[1079px] flex-col items-center overflow-hidden bg-[#fafafa] pt-[60px] max-[900px]:h-[900px] max-[640px]:h-auto max-[640px]:min-h-[720px] max-[640px]:px-4 max-[640px]:pt-14 max-[640px]:pb-14"
      aria-labelledby="stories-title"
    >
      <SectionBadge>Our Clients</SectionBadge>
      <h2
        className="mt-6 text-center text-4xl leading-12 font-bold text-[#232323] [font-family:var(--font-gabarito)] max-[640px]:text-[clamp(28px,8vw,31px)] max-[640px]:leading-9"
        id="stories-title"
      >
        <WaveHeadingText lines="Seen, Worn & Trusted" />
      </h2>

      <div
        className="relative mt-11 h-[600px] w-[min(1084px,calc(100%-80px))] touch-pan-y select-none max-[900px]:origin-top max-[900px]:scale-80 max-[640px]:mt-10 max-[640px]:h-[clamp(390px,122vw,480px)] max-[640px]:w-full max-[640px]:scale-100"
        onPointerCancel={finishDrag}
        onPointerDown={onPointerDown}
        onPointerUp={finishDrag}
      >
        {stories.map((story, index) => {
          const isMuted = mutedStories[index];
          const isActive = index === activeIndex;
          const position = getPlacement(index, activeIndex);

          return (
            <article
              className={`absolute top-[14px] left-1/2 h-[572px] w-[485px] origin-top overflow-hidden rounded-lg will-change-transform max-[640px]:aspect-[0.654] max-[640px]:h-auto max-[640px]:w-[min(74vw,320px)] ${
                position > 1 && position !== stories.length - 1 ? "pointer-events-none" : ""
              }`}
              key={story.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              {isActive ? (
                <iframe
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="pointer-events-none size-full scale-[1.55] border-0"
                  ref={(node) => {
                    playerRefs.current[index] = node;
                  }}
                  onLoad={() => {
                    sendPlayerCommand(index, "addEventListener", ["onStateChange"]);
                    sendPlayerCommand(index, isMuted ? "mute" : "unMute");
                    sendPlayerCommand(index, "playVideo");
                  }}
                  src={getYouTubeEmbedUrl(story.youtubeId)}
                  title={story.title}
                />
              ) : (
                <div
                  className="size-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${getYouTubeThumbnail(story.youtubeId)})` }}
                />
              )}
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-black/15 to-black/35 transition-opacity duration-700 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <button
                aria-label={isMuted ? `Unmute ${story.title}` : `Mute ${story.title}`}
                aria-pressed={!isMuted}
                className="volume-icon absolute top-5 left-5 z-[4] grid size-7 place-items-center rounded-full bg-black/25 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/45"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => toggleMuted(index)}
                type="button"
              >
                <Image
                  alt=""
                  className="size-4"
                  src={`/assets/${isMuted ? "volume-muted.svg" : "volume-up.svg"}`}
                  height={16}
                  width={16}
                />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

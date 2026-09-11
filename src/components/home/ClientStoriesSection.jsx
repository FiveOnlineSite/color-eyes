"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { A11y, EffectCoverflow, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import SectionBadge from "./SectionBadge";
import WaveHeadingText from "./WaveHeadingText";

const stories = [
  {
    alt: "ColorEyes client story",
    title: "Coloured lens essentials",
    video: "/videos/video-1.mp4",
  },
  {
    alt: "ColorEyes client story",
    title: "Contact lens guide",
    video: "/videos/video-2.mp4",
  },
  {
    alt: "ColorEyes client story",
    title: "Lens care tutorial",
    video: "/videos/video-3.mp4",
  },
   {
    alt: "ColorEyes client story",
    title: "Coloured lens",
    video: "/videos/video-1.mp4",
  },
  {
    alt: "ColorEyes client story",
    title: "Contact lens",
    video: "/videos/video-2.mp4",
  },
  {
    alt: "ColorEyes client story",
    title: "Lens care ",
    video: "/videos/video-3.mp4",
  },
];

export default function ClientStoriesSection() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isStoriesInView, setIsStoriesInView] = useState(false);
  const [mutedStories, setMutedStories] = useState(() => stories.map(() => true));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStoriesInView(entry.isIntersecting),
      { rootMargin: "300px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStoriesInView) return;

    const video = videoRefs.current[activeIndex];
    if (!video) return;

    video.muted = mutedStories[activeIndex];
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [activeIndex, isStoriesInView, mutedStories]);

  const toggleMuted = (index) => {
    setMutedStories((current) =>
      current.map((isMuted, storyIndex) => (storyIndex === index ? !isMuted : isMuted)),
    );
    const video = videoRefs.current[index];
    if (video) video.muted = !mutedStories[index];
  };

  return (
    <section
      ref={sectionRef}
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
        className="relative mt-11 h-[560px] w-[min(1000px,calc(100%-80px))] select-none max-[900px]:origin-top max-[900px]:scale-80 max-[640px]:mt-10 max-[640px]:h-[clamp(370px,116vw,455px)] max-[640px]:w-full max-[640px]:scale-100"
      >
        <Swiper
          a11y={{ enabled: true }}
          centeredSlides
          className="size-full overflow-hidden"
          coverflowEffect={{
            depth: 80,
            modifier: 1,
            rotate: 0,
            scale: 0.84,
            slideShadows: false,
            stretch: 0,
          }}
          effect="coverflow"
          grabCursor
          initialSlide={1}
          keyboard={{ enabled: true }}
          loop
          loopAddBlankSlides={false}
          loopAdditionalSlides={0}
          modules={[A11y, EffectCoverflow, Keyboard]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          slideToClickedSlide
          slidesPerView="auto"
          spaceBetween={-120}
          speed={900}
        >
          {stories.map((story, index) => {
            const isMuted = mutedStories[index];
            const isActive = isStoriesInView && index === activeIndex;

            return (
              <SwiperSlide
                className="mt-[14px] h-[530px]! w-[450px]! max-[640px]:aspect-[0.654] max-[640px]:h-auto! max-[640px]:w-[min(70vw,300px)]!"
                key={story.title}
              >
                <article className="relative size-full overflow-hidden rounded-lg">
                  {isActive ? (
                    <video
                      aria-label={story.title}
                      autoPlay
                      className="pointer-events-none size-full scale-[1.55] border-0"
                      muted={isMuted}
                      onEnded={() => swiperRef.current?.slideNext()}
                      playsInline
                      preload="none"
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                    >
                      <source src={story.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div
                      className="size-full bg-cover bg-center"
                      style={{
                        backgroundColor: "#1b6cb8",
                      }}
                    />
                  )}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-black/15 to-black/35 transition-opacity duration-700 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {isActive ? (
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
                  ) : null}
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

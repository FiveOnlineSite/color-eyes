"use client";

import { useEffect, useRef } from "react";

const letters = [
  ["C", "#0b4f9c"],
  ["o", "#168bb5"],
  ["l", "#0f70c9"],
  ["o", "#22a4ce"],
  ["r", "#075fb4"],
  ["e", "#188abf"],
  ["y", "#0b4f9c"],
  ["e", "#22a4ce"],
  ["s", "#0f70c9"],
];

const RESTING_COLOR = "#666666";
const MAX_HOVER_OFFSET = 48;

export default function FooterWordmark() {
  const letterRefs = useRef([]);
  const wordRef = useRef(null);
  const frameRef = useRef(null);
  const isHoveringRef = useRef(false);
  const motionRef = useRef(
    letters.map(() => ({ current: 0, target: 0, velocity: 0 })),
  );

  function animateLetters() {
    let hasMotion = false;
    const returning = !isHoveringRef.current;
    const stiffness = returning ? 0.035 : 0.11;
    const damping = returning ? 0.87 : 0.76;

    motionRef.current.forEach((motion, index) => {
      const difference = motion.target - motion.current;
      motion.velocity = (motion.velocity + difference * stiffness) * damping;
      motion.current += motion.velocity;

      if (Math.abs(difference) < 0.08 && Math.abs(motion.velocity) < 0.08) {
        motion.current = motion.target;
        motion.velocity = 0;
      } else {
        hasMotion = true;
      }

      const element = letterRefs.current[index];
      if (element) {
        element.style.transform = `translate3d(0, ${motion.current}px, 0)`;
      }
    });

    frameRef.current = hasMotion ? requestAnimationFrame(animateLetters) : null;
  }

  function startAnimation() {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(animateLetters);
    }
  }

  function moveNearbyLetters(event) {
    const word = wordRef.current;
    if (!word) return;

    isHoveringRef.current = true;
    const wordBounds = word.getBoundingClientRect();

    letterRefs.current.forEach((element, index) => {
      if (!element) return;

      const letterWidth = element.offsetWidth;
      const letterHeight = element.offsetHeight;
      const centerX = wordBounds.left + element.offsetLeft + letterWidth / 2;
      const centerY = wordBounds.top + element.offsetTop + letterHeight / 2;
      const influenceRadius = Math.max(80, Math.min(205, letterWidth * 1.85));
      const horizontalDistance = Math.abs(event.clientX - centerX);
      const influence = Math.max(0, 1 - horizontalDistance / influenceRadius);
      const verticalPosition = Math.max(
        -1,
        Math.min(1, (event.clientY - centerY) / (letterHeight * 0.52)),
      );

      motionRef.current[index].target =
        verticalPosition * MAX_HOVER_OFFSET * influence;
      element.style.color = influence > 0.08 ? letters[index][1] : RESTING_COLOR;
    });

    startAnimation();
  }

  function resetLetters() {
    isHoveringRef.current = false;

    motionRef.current.forEach((motion, index) => {
      motion.target = 0;
      const element = letterRefs.current[index];
      if (element) element.style.color = RESTING_COLOR;
    });

    startAnimation();
  }

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <p
      aria-label="Coloreyes"
      className="absolute right-0 bottom-[112px] left-0 m-0 flex justify-center text-center text-[clamp(145px,15.6vw,225px)] leading-none font-extrabold tracking-[2.2px] whitespace-nowrap text-[#666] uppercase [font-family:var(--font-gabarito)] max-[900px]:text-[13.25vw] max-[640px]:bottom-[127px] max-[640px]:text-[13.7vw]"
      onPointerLeave={resetLetters}
      onPointerMove={moveNearbyLetters}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex before:absolute before:-inset-x-16 before:-inset-y-12 before:content-['']"
        ref={wordRef}
      >
        {letters.map(([letter], index) => (
          <span
            className="relative inline-block cursor-default select-none transition-colors duration-500 ease-out will-change-transform"
            key={`${letter}-${index}`}
            ref={(element) => {
              letterRefs.current[index] = element;
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </p>
  );
}

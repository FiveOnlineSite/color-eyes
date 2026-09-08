"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const firstLine = "COLORS THAT";
const secondLine = "CHANGES EVERYTHING";
const particleColor = "#1667c2";

function ParticleText({ children, letterRefs, startIndex = 0 }) {
  return children.split("").map((character, index) => (
    <span
      className="inline-block"
      key={`${character}-${index}`}
      ref={(node) => {
        letterRefs.current[startIndex + index] = node;
      }}
      aria-hidden="true"
    >
      {character === " " ? "\u00a0" : character}
    </span>
  ));
}

function ParticleCloud({ pointerRef, targets, pointSize }) {
  const pointsRef = useRef(null);
  const velocitiesRef = useRef(new Float32Array(targets.length));
  const particleCount = targets.length / 3;
  const initialPositions = useMemo(() => new Float32Array(targets), [targets]);

  useEffect(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    positionAttribute.array.set(targets);
    positionAttribute.needsUpdate = true;
    velocitiesRef.current = new Float32Array(targets.length);
  }, [targets]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array;
    const velocities = velocitiesRef.current;
    const frameScale = Math.min(delta * 60, 2);
    const damping = Math.pow(0.92, frameScale);
    const pointer = pointerRef.current;

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      const x = positions[offset];
      const y = positions[offset + 1];
      const z = positions[offset + 2];
      let pointerInfluence = 0;
      let pointerDirectionX = 0;
      let pointerDirectionY = 0;

      if (pointer.active) {
        const distanceX = x - pointer.x;
        const distanceY = y - pointer.y;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance > 0 && distance < pointer.radius) {
          pointerInfluence = 1 - distance / pointer.radius;
          pointerDirectionX = distanceX / distance;
          pointerDirectionY = distanceY / distance;
        }
      }

      const gatherStrength = 0.01385 * (1 - pointerInfluence * 0.965);

      velocities[offset] += (targets[offset] - x) * gatherStrength * frameScale;
      velocities[offset + 1] +=
        (targets[offset + 1] - y) * gatherStrength * frameScale;
      velocities[offset + 2] += (targets[offset + 2] - z) * 0.025 * frameScale;

      if (pointerInfluence > 0) {
        const force = pointerInfluence * pointerInfluence * 3.1 * frameScale;
        velocities[offset] += pointerDirectionX * force;
        velocities[offset + 1] += pointerDirectionY * force;
        velocities[offset + 2] += pointerInfluence * 0.62 * frameScale;
      }

      velocities[offset] *= damping;
      velocities[offset + 1] *= damping;
      velocities[offset + 2] *= damping;
      positions[offset] += velocities[offset] * frameScale;
      positions[offset + 1] += velocities[offset + 1] * frameScale;
      positions[offset + 2] += velocities[offset + 2] * frameScale;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={particleColor}
        depthWrite={false}
        opacity={0.96}
        size={pointSize}
        sizeAttenuation={false}
        transparent
      />
    </points>
  );
}

function ParticleCanvas({ data, isActive, isCompact, pointerRef }) {
  return (
    <Canvas
      className={`pointer-events-none! absolute! inset-0! z-10 ${isActive ? "visible" : "invisible"}`}
      orthographic
      camera={{ far: 1000, near: 0.1, position: [0, 0, 100], zoom: 1 }}
      dpr={isCompact ? [1, 1.25] : [1, 2]}
      frameloop={isActive ? "always" : "never"}
      gl={{ alpha: true, antialias: true }}
    >
      <ParticleCloud
        pointerRef={pointerRef}
        targets={data.targets}
        pointSize={isCompact ? 1.7 : 2.35}
      />
    </Canvas>
  );
}

export default function ParticleHeading() {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const pointerRef = useRef({ active: false, radius: 58, x: 0, y: 0 });
  const [isParticleCanvasActive, setIsParticleCanvasActive] = useState(false);
  const [particleData, setParticleData] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  const sampleHeading = useCallback(() => {
    if (!containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const width = Math.max(1, Math.ceil(bounds.width));
    const height = Math.max(1, Math.ceil(bounds.height));
    const sampleCanvas = document.createElement("canvas");
    const context = sampleCanvas.getContext("2d", { willReadFrequently: true });

    sampleCanvas.width = width;
    sampleCanvas.height = height;
    context.fillStyle = particleColor;
    context.textAlign = "center";
    context.textBaseline = "middle";

    letterRefs.current.filter(Boolean).forEach((element) => {
      if (element.textContent.trim() === "") return;

      const letterBounds = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      const centerX = letterBounds.left - bounds.left + letterBounds.width / 2;
      const centerY = letterBounds.top - bounds.top + letterBounds.height / 2;

      context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      context.fillText(element.textContent, centerX, centerY);
    });

    const pixels = context.getImageData(0, 0, width, height).data;
    const spacing = width > 800 ? 5 : width <= 640 ? 5 : 4;
    const points = [];

    for (let y = Math.floor(spacing / 2); y < height; y += spacing) {
      for (let x = Math.floor(spacing / 2); x < width; x += spacing) {
        if (pixels[(y * width + x) * 4 + 3] > 72) points.push({ x, y });
      }
    }

    const stride = Math.max(1, Math.ceil(points.length / 2800));
    const selectedPoints = points.filter((_, index) => index % stride === 0);
    const targets = new Float32Array(selectedPoints.length * 3);

    selectedPoints.forEach((point, index) => {
      const offset = index * 3;
      targets[offset] = point.x - width / 2;
      targets[offset + 1] = height / 2 - point.y;
      targets[offset + 2] = 0;
    });

    setParticleData({ targets });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    let disposed = false;
    let resizeTimer;
    let resizeObserver;

    async function prepareParticles() {
      await document.fonts.ready;
      if (disposed) return;
      sampleHeading();

      resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(sampleHeading, 140);
      });
      resizeObserver.observe(containerRef.current);
    }

    prepareParticles();
    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
    };
  }, [sampleHeading]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsParticleCanvasActive(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  function updatePointer(event) {
    if (!containerRef.current || !particleData) return;

    const bounds = containerRef.current.getBoundingClientRect();
    pointerRef.current = {
      active: true,
      radius: Math.max(90, Math.min(150, bounds.width * 0.12)),
      x: event.clientX - bounds.left - bounds.width / 2,
      y: bounds.height / 2 - (event.clientY - bounds.top),
    };
  }

  function releasePointer() {
    pointerRef.current.active = false;
  }

  function focusParticles() {
    pointerRef.current = { active: true, radius: 140, x: 0, y: 0 };
  }

  const showParticles =
    Boolean(particleData) && !reducedMotion && !isCompactViewport;
  const particlesAreActive = showParticles && isParticleCanvasActive;

  return (
    <h2
      className="mt-8 mb-[42px] max-w-full text-[clamp(72px,7.64vw,110px)] leading-[1.09] font-extrabold tracking-[-2.2px] text-[#1667c2] uppercase [font-family:var(--font-gabarito)] max-[1180px]:text-[76px] max-[900px]:mb-9 max-[900px]:text-[clamp(48px,9vw,72px)] max-[640px]:mt-6 max-[640px]:mb-4 max-[640px]:text-[clamp(28px,8.7vw,42px)] max-[640px]:leading-[1.14] max-[640px]:tracking-[-1.1px]"
      id="manifesto-title"
    >
      <button
        aria-label="Colors that changes everything. Move the pointer across the heading to disperse nearby particles."
        className="cursor-pointer border-0 bg-transparent p-0 text-inherit uppercase [font:inherit]"
        type="button"
        onBlur={releasePointer}
        onFocus={focusParticles}
        onPointerEnter={updatePointer}
        onPointerMove={updatePointer}
        onPointerLeave={releasePointer}
      >
        <span className="relative inline-block" ref={containerRef} aria-hidden="true">
          {showParticles ? (
            <ParticleCanvas
              data={particleData}
              isActive={particlesAreActive}
              isCompact={isCompactViewport}
              pointerRef={pointerRef}
            />
          ) : null}
          <span className="block whitespace-nowrap">
            <span className={showParticles ? "opacity-0" : undefined}>
              <ParticleText letterRefs={letterRefs}>{firstLine}</ParticleText>
            </span>{" "}
            <span className="relative ml-1.5 inline-block h-20 w-[205px] translate-y-1 overflow-hidden rounded-[63px] align-baseline max-[900px]:h-[58px] max-[900px]:w-[150px] max-[640px]:ml-1 max-[640px]:h-8 max-[640px]:w-[72px] max-[640px]:translate-y-px">
              <video
                aria-hidden="true"
                autoPlay
                className="absolute inset-0 size-full scale-150 object-cover object-[50%_38%]"
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src="/assets/eye.mp4" type="video/mp4" />
              </video>
            </span>
          </span>
          <span className={`block whitespace-nowrap ${showParticles ? "opacity-0" : ""}`}>
            <ParticleText letterRefs={letterRefs} startIndex={firstLine.length}>
              {secondLine}
            </ParticleText>
          </span>
        </span>
      </button>
    </h2>
  );
}

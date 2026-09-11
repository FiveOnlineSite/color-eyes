"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

const DESKTOP_RING_COUNT = 3;
const DESKTOP_IMAGES_PER_RING = 8;
const MOBILE_RING_COUNT = 3;
const MOBILE_IMAGES_PER_RING = 5;
const MOBILE_SPIRAL_ANGLE_STEP = 0.82;
const MOBILE_SPIRAL_HEIGHT = 8.2;
const MOBILE_SPIRAL_RADIUS = 3.1;
const FRONT_CARD_SCALE_BOOST = 0.25;
const BACK_CARD_SCALE_REDUCTION = 0.1;
const CARD_TEXTURE_INSET = 0.08;
const CURVATURE_IDLE_DELAY = 180;
const ACTIVE_CURVATURE_DAMPING = 6;
const REST_CURVATURE_DAMPING = 2.2;
const HERO_SCROLL_STAGES = 2;
const HERO_INTRO_COMPLETE_EVENT = "hero-intro-complete";
const MAX_RENDER_FPS = 30;
const FRAME_INTERVAL = 1000 / MAX_RENDER_FPS;
const CURVATURE_UPDATE_EPSILON = 0.001;

function createCurvedCardGeometry(width, height) {
  const geometry = new THREE.PlaneGeometry(width, height, 18, 12);
  const positions = geometry.attributes.position;
  const horizontalBendRadius = width * 1.72;
  const verticalBendRadius = height * 3.4;

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const horizontalBend =
      Math.sqrt(Math.max(0, horizontalBendRadius ** 2 - x ** 2)) -
      horizontalBendRadius;
    const verticalBend =
      Math.sqrt(Math.max(0, verticalBendRadius ** 2 - y ** 2)) -
      verticalBendRadius;
    positions.setZ(index, horizontalBend + verticalBend);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.userData.horizontalBendRadius = horizontalBendRadius;
  geometry.userData.verticalBendRadius = verticalBendRadius;
  return geometry;
}

function updateCardCurvature(geometry, amount) {
  const positions = geometry.attributes.position;
  const { horizontalBendRadius, verticalBendRadius } = geometry.userData;

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const horizontalBend =
      Math.sqrt(Math.max(0, horizontalBendRadius ** 2 - x ** 2)) -
      horizontalBendRadius;
    const verticalBend =
      Math.sqrt(Math.max(0, verticalBendRadius ** 2 - y ** 2)) -
      verticalBendRadius;
    positions.setZ(index, (horizontalBend + verticalBend) * amount);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

function getRingPlacement(index, imagesPerRing, ringSpacing) {
  const angle = -Math.PI / 2 + (index / imagesPerRing) * Math.PI * 2;

  return {
    angle,
    yOffset: (index / imagesPerRing - 0.5) * ringSpacing,
  };
}

export default function HeroOrbitScene({ images, title }) {
  const rootRef = useRef(null);
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const backCanvasHost = backCanvasRef.current;
    const frontCanvasHost = frontCanvasRef.current;
    const heroSection = root?.closest("section");

    if (
      !root ||
      !backCanvasHost ||
      !frontCanvasHost ||
      !heroSection ||
      !images.length
    ) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ringCount = isDesktop ? DESKTOP_RING_COUNT : MOBILE_RING_COUNT;
      const imagesPerRing = isDesktop ? DESKTOP_IMAGES_PER_RING : MOBILE_IMAGES_PER_RING;
      const ringImages = images.slice(0, Math.min(images.length, imagesPerRing));
      const activeImages = Array.from({ length: ringCount }, () => ringImages).flat();
      const ringSpacing = isDesktop ? 4.7 : 3;
      const textureLoader = new THREE.TextureLoader();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(isDesktop ? 36 : 42, 1, 0.1, 100);
      const createRenderer = (host) => {
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, isDesktop ? 1.75 : 1.25),
        );
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.className = "pointer-events-none block size-full";
        host.appendChild(renderer.domElement);
        return renderer;
      };
      const backRenderer = createRenderer(backCanvasHost);
      const frontRenderer = createRenderer(frontCanvasHost);
      const masterGroup = new THREE.Group();
      const spiralGroup = new THREE.Group();
      const ringGroups = Array.from({ length: ringCount }, (_, index) => {
        const group = new THREE.Group();

        group.userData.radius = isDesktop ? 6.7 : 3.1;
        group.userData.baseY = (index - (ringCount - 1) / 2) * ringSpacing;
        group.position.y = group.userData.baseY;
        group.position.z = 0;
        spiralGroup.add(group);
        return group;
      });
      const sharedGeometry = createCurvedCardGeometry(
        isDesktop ? 1.58 : 1.34,
        isDesktop ? 2.44 : 2.04,
      );
      const timer = new THREE.Timer();
      timer.connect(document);
      const worldPosition = new THREE.Vector3();
      const cards = [];
      const textureCache = new Map();
      const scrollState = { rotation: 0, verticalFlow: 0 };
      const ringSpan = ringCount * ringSpacing;
      const verticalSpan = isDesktop ? ringSpan : MOBILE_SPIRAL_HEIGHT;
      const curveState = { current: 0, target: 0 };
      let frameId = 0;
      let refreshFrameId = 0;
      let curvatureResetTimer = 0;
      let disposed = false;
      let lastFrameTime = 0;
      let appliedCurvature = Number.NaN;
      let introIsComplete = !document.querySelector(".hero-intro-loader");

      const handleIntroComplete = () => {
        introIsComplete = true;
        lastFrameTime = 0;
      };

      window.addEventListener(HERO_INTRO_COMPLETE_EVENT, handleIntroComplete);

      camera.position.set(0, 0, isDesktop ? 18 : 16.5);
      masterGroup.add(spiralGroup);
      scene.add(masterGroup);

      const resize = () => {
        const { width, height } = backCanvasHost.getBoundingClientRect();
        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        backRenderer.setSize(width, height, false);
        frontRenderer.setSize(width, height, false);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(backCanvasHost);
      resize();

      const createCards = () => {
        activeImages.forEach(([source, alt], index) => {
          const texture = textureCache.get(source);
          if (!texture) return;

          const ringIndex = Math.floor(index / imagesPerRing);
          const placement = isDesktop
            ? getRingPlacement(
                index % imagesPerRing,
                imagesPerRing,
                ringSpacing,
              )
            : {
                angle: -Math.PI / 2 + index * MOBILE_SPIRAL_ANGLE_STEP,
                yOffset:
                  (index / Math.max(activeImages.length - 1, 1) - 0.5) *
                  MOBILE_SPIRAL_HEIGHT,
              };
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          const mesh = new THREE.Mesh(sharedGeometry, material);

          mesh.name = alt || `Orbit image ${index + 1}`;
          mesh.position.set(0, 0, 0);
          mesh.rotation.y = -placement.angle - Math.PI / 2;
          mesh.userData = {
            angle: placement.angle,
            ringIndex,
            radius: isDesktop
              ? ringGroups[ringIndex].userData.radius
              : MOBILE_SPIRAL_RADIUS,
            yOffset: placement.yOffset,
          };

          if (isDesktop) {
            ringGroups[ringIndex].add(mesh);
          } else {
            spiralGroup.add(mesh);
          }
          cards.push(mesh);
        });
      };

      const preloadTextures = async () => {
        const uniqueSources = [...new Set(activeImages.map(([source]) => source))];
        const loadedTextures = await Promise.all(
          uniqueSources.map(async (source) => {
            try {
              const texturePath = source.startsWith("/") ? source : `/assets/${source}`;
              const texture = await textureLoader.loadAsync(texturePath);
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.minFilter = THREE.LinearFilter;
              texture.offset.set(CARD_TEXTURE_INSET, CARD_TEXTURE_INSET);
              texture.repeat.set(
                1 - CARD_TEXTURE_INSET * 2,
                1 - CARD_TEXTURE_INSET * 2,
              );
              return [source, texture];
            } catch {
              return [source, null];
            }
          }),
        );

        if (disposed) {
          loadedTextures.forEach(([, texture]) => texture?.dispose());
          return;
        }

        loadedTextures.forEach(([source, texture]) => {
          if (texture) textureCache.set(source, texture);
        });
        createCards();
        refreshFrameId = window.requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };

      void preloadTextures();

      const scrollAnimation = reducedMotion
        ? null
        : gsap
            .timeline({
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: () =>
                  `+=${window.innerHeight * (HERO_SCROLL_STAGES - 1)}`,
                pin: true,
                pinSpacing: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (Math.abs(self.getVelocity()) < 1) return;

                  curveState.target = self.direction >= 0 ? -1 : 1;
                  window.clearTimeout(curvatureResetTimer);
                  curvatureResetTimer = window.setTimeout(() => {
                    curveState.target = 0;
                  }, CURVATURE_IDLE_DELAY);
                },
              },
            })
            .to(
              scrollState,
              {
                rotation: Math.PI * 2 * 1.35,
                verticalFlow: verticalSpan * 0.67,
                duration: 1,
                ease: "none",
              },
              0,
            );

      const render = (timestamp) => {
        if (disposed) return;

        frameId = window.requestAnimationFrame(render);
        if (!introIsComplete) return;
        if (
          lastFrameTime &&
          timestamp - lastFrameTime < FRAME_INTERVAL
        ) {
          return;
        }
        lastFrameTime = timestamp;

        timer.update(timestamp);
        const delta = timer.getDelta();
        const elapsed = timer.getElapsed();
        spiralGroup.rotation.y = (reducedMotion ? 0 : elapsed * 0.028) + scrollState.rotation;
        curveState.current = reducedMotion
          ? 0
          : THREE.MathUtils.damp(
              curveState.current,
              curveState.target,
              curveState.target === 0
                ? REST_CURVATURE_DAMPING
                : ACTIVE_CURVATURE_DAMPING,
              delta,
            );
        if (
          !Number.isFinite(appliedCurvature) ||
          Math.abs(curveState.current - appliedCurvature) >=
            CURVATURE_UPDATE_EPSILON
        ) {
          updateCardCurvature(sharedGeometry, curveState.current);
          appliedCurvature = curveState.current;
        }

        if (isDesktop) {
          ringGroups.forEach((ringGroup) => {
            ringGroup.position.y =
              THREE.MathUtils.euclideanModulo(
                ringGroup.userData.baseY + scrollState.verticalFlow + ringSpan / 2,
                ringSpan,
              ) -
              ringSpan / 2;
          });
        }

        cards.forEach((mesh) => {
          const { angle, radius, yOffset } = mesh.userData;

          mesh.position.x = Math.cos(angle) * radius;
          mesh.position.y = isDesktop
            ? yOffset
            : THREE.MathUtils.euclideanModulo(
                yOffset + scrollState.verticalFlow + verticalSpan / 2,
                verticalSpan,
              ) -
              verticalSpan / 2;
          mesh.position.z = Math.sin(angle) * radius;
          mesh.rotation.z = 0;
        });

        scene.updateMatrixWorld();
        cards.forEach((mesh) => {
          mesh.getWorldPosition(worldPosition);
          const { radius } = mesh.userData;
          const verticalLayerFocus =
            1 -
            THREE.MathUtils.smoothstep(
              Math.abs(worldPosition.y),
              0,
              ringSpacing,
            );
          const layerScale = THREE.MathUtils.lerp(
            isDesktop ? 0.68 : 0.76,
            1,
            verticalLayerFocus,
          );
          const frontFocus = THREE.MathUtils.smoothstep(
            worldPosition.z,
            0,
            radius * 0.95,
          );
          const backFocus =
            1 -
            THREE.MathUtils.smoothstep(
              worldPosition.z,
              -radius * 0.95,
              0,
            );
          const depthScale =
            1 +
            frontFocus * FRONT_CARD_SCALE_BOOST -
            backFocus * BACK_CARD_SCALE_REDUCTION;

          mesh.scale.setScalar(layerScale * depthScale);
          mesh.userData.baseOpacity = 1;
          mesh.userData.isInFrontOfTitle = worldPosition.z > 0.2;
        });

        cards.forEach((mesh) => {
          mesh.material.opacity = mesh.userData.isInFrontOfTitle
            ? 0
            : mesh.userData.baseOpacity;
        });
        backRenderer.render(scene, camera);

        cards.forEach((mesh) => {
          mesh.material.opacity = mesh.userData.isInFrontOfTitle
            ? mesh.userData.baseOpacity
            : 0;
        });
        frontRenderer.render(scene, camera);

      };

      render(performance.now());

      return () => {
        disposed = true;
        window.cancelAnimationFrame(frameId);
        window.cancelAnimationFrame(refreshFrameId);
        window.clearTimeout(curvatureResetTimer);
        window.removeEventListener(
          HERO_INTRO_COMPLETE_EVENT,
          handleIntroComplete,
        );
        scrollAnimation?.kill();
        resizeObserver.disconnect();

        cards.forEach((mesh) => {
          mesh.parent?.remove(mesh);
          mesh.material.dispose();
        });
        sharedGeometry.dispose();
        timer.dispose();
        textureCache.forEach((texture) => texture.dispose());
        [backRenderer, frontRenderer].forEach((renderer) => {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        });
      };
    }, root);

    return () => ctx.revert();
  }, [images]);

  return (
    <div ref={rootRef} className="absolute inset-0 z-[1] overflow-hidden">
      <div ref={backCanvasRef} className="absolute inset-0 z-[5]" aria-hidden="true" />
      <h1 id="hero-title" className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-[clamp(1.75rem,2.5vw,3.25rem)] font-semibold uppercase leading-[0.85] tracking-[-0.06em] text-white mix-blend-normal md:px-16">
        <span className="inline-block">{title}</span>
      </h1>
      <div ref={frontCanvasRef} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
    </div>
  );
}

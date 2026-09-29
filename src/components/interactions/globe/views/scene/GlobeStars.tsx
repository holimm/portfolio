'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/config';
import { GLOBE_CONFIG, type GlobeLineStyle } from '../../config/Globe.Config';

type Range = readonly [number, number];

/** Small deterministic PRNG (mulberry32), so the sky is identical on every load. */
function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarLayerOptions {
  count: number;
  brightness: Range;
  twinkle: Range;
}

/**
 * Positions spread evenly through the star shell, each star with its own tint of the base color and
 * its own twinkle: how deep it dips, how fast and where in the cycle it starts.
 */
function buildStarLayer(
  { count, brightness, twinkle }: StarLayerOptions,
  color: THREE.Color,
  random: () => number
) {
  const { radius, twinklePeriod } = GLOBE_CONFIG.stars;
  const between = ([min, max]: Range) => min + random() * (max - min);

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const twinkles = new Float32Array(count * 3);
  const direction = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    // Uniform direction on the sphere, at a distance anywhere through the shell
    const z = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const ring = Math.sqrt(1 - z * z);
    direction
      .set(ring * Math.cos(angle), ring * Math.sin(angle), z)
      .multiplyScalar(between([radius.inner, radius.outer]));
    direction.toArray(positions, i * 3);

    const shade = between(brightness);
    colors[i * 3] = color.r * shade;
    colors[i * 3 + 1] = color.g * shade;
    colors[i * 3 + 2] = color.b * shade;

    twinkles[i * 3] = between(twinkle);
    twinkles[i * 3 + 1] = (Math.PI * 2) / between(twinklePeriod);
    twinkles[i * 3 + 2] = random() * Math.PI * 2;
  }

  return new THREE.BufferGeometry()
    .setAttribute('position', new THREE.BufferAttribute(positions, 3))
    .setAttribute('color', new THREE.BufferAttribute(colors, 3))
    .setAttribute('twinkle', new THREE.BufferAttribute(twinkles, 3));
}

// Fixed pixel size so stars don't grow as the camera dives in
const VERTEX_SHADER = /* glsl */ `
  attribute vec3 color;
  // x: depth of the dip, y: angular speed, z: phase
  attribute vec3 twinkle;
  uniform float uTime;
  // 0 holds every star at full brightness
  uniform float uTwinkle;
  uniform float uSize;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vColor = color;
    vBrightness = 1.0 - uTwinkle * twinkle.x * (0.5 + 0.5 * sin(uTime * twinkle.y + twinkle.z));
    gl_PointSize = uSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    gl_FragColor = vec4(vColor, uOpacity * vBrightness);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

interface GlobeStarsProps {
  style: GlobeLineStyle;
  /** Off for reduced motion: the stars hold still at full brightness. */
  twinkle: boolean;
  /** On-demand scenes only redraw for the twinkle while this returns true. */
  isVisible?: () => boolean;
}

/** Distant, twinkling starfield; scenes may turn the returned group to suggest travel. */
export const GlobeStars = forwardRef<THREE.Group, GlobeStarsProps>(
  ({ style, twinkle, isVisible }, ref) => {
    const dpr = useThree((state) => state.viewport.dpr);
    const frameloop = useThree((state) => state.frameloop);
    const invalidate = useThree((state) => state.invalidate);

    const isVisibleRef = useRef(isVisible);
    isVisibleRef.current = isVisible;

    const layers = useMemo(() => {
      const random = createRandom(GLOBE_CONFIG.stars.seed);
      const color = new THREE.Color(style.color);

      return GLOBE_CONFIG.stars.layers.map((layer) => ({
        key: layer.size,
        geometry: buildStarLayer(layer, color, random),
        material: new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms: {
            uTime: { value: 0 },
            uTwinkle: { value: 1 },
            uSize: { value: layer.size },
            uOpacity: { value: style.opacity },
          },
          transparent: true,
          depthWrite: false,
        }),
      }));
    }, [style.color, style.opacity]);

    useEffect(
      () => () =>
        layers.forEach((layer) => {
          layer.geometry.dispose();
          layer.material.dispose();
        }),
      [layers]
    );

    // Point size is in device pixels, so scale the configured CSS size by the pixel ratio
    useEffect(() => {
      GLOBE_CONFIG.stars.layers.forEach((layer, index) => {
        layers[index].material.uniforms.uSize.value = layer.size * dpr;
      });
    }, [layers, dpr]);

    useEffect(() => {
      layers.forEach((layer) => {
        layer.material.uniforms.uTwinkle.value = twinkle ? 1 : 0;
      });
      invalidate();
    }, [layers, twinkle, invalidate]);

    // An on-demand canvas only draws when asked: request throttled frames while the sky is visible
    useEffect(() => {
      if (!twinkle || frameloop !== 'demand') return;

      const interval = 1 / GLOBE_CONFIG.stars.twinkleFps;
      let last = 0;
      const tick = (time: number) => {
        if (time - last < interval) return;
        if (isVisibleRef.current && !isVisibleRef.current()) return;
        last = time;
        invalidate();
      };

      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }, [twinkle, frameloop, invalidate]);

    useFrame(({ clock }) => {
      if (!twinkle) return;
      const time = clock.getElapsedTime();
      layers.forEach((layer) => {
        layer.material.uniforms.uTime.value = time;
      });
    });

    return (
      <group ref={ref}>
        {layers.map((layer) => (
          <points
            key={layer.key}
            geometry={layer.geometry}
            material={layer.material}
          />
        ))}
      </group>
    );
  }
);

GlobeStars.displayName = 'GlobeStars';

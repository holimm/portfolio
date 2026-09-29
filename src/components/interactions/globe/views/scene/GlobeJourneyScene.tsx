'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { gsap } from '@/config';
import {
  GLOBE_CONFIG,
  type GlobeJourney,
  type GlobeMarker,
  type GlobePalette,
} from '../../config/Globe.Config';
import { getFacingQuaternion, getOverviewDistance } from '../../utils/Geo.Util';
import { GlobeModel } from './GlobeModel';
import { GlobeStars } from './GlobeStars';

export interface GlobeJourneySceneProps {
  markers: GlobeMarker[];
  palette: GlobePalette;
  reducedMotion: boolean;
  /** Mutated by the page's scroll timeline; never triggers a React render. */
  journeyRef: RefObject<GlobeJourney>;
}

const { lerp } = THREE.MathUtils;

const IDENTITY = new THREE.Quaternion();
const startQuat = new THREE.Quaternion();
const turnQuat = new THREE.Quaternion();

/**
 * Globe whose orientation and camera distance are driven entirely by `journeyRef`. There are no
 * controls or idle loops here, so nothing competes with the scroll timeline.
 */
export function GlobeJourneyScene({
  markers,
  palette,
  reducedMotion,
  journeyRef,
}: GlobeJourneySceneProps) {
  const invalidate = useThree((state) => state.invalidate);
  // Subscribed only so a resize re-renders, and redraws, the scene
  useThree((state) => state.size);
  useThree((state) => state.viewport.dpr);
  const globeRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);

  // Resizing, or the Canvas re-applying its props, clears the drawing buffer: redraw after every commit
  useEffect(() => invalidate());

  // The canvas renders on demand: only request a frame when GSAP has moved the journey
  useEffect(() => {
    let travel = NaN;
    let zoom = NaN;

    const checkForChanges = () => {
      const journey = journeyRef.current;
      if (journey.travel === travel && journey.zoom === zoom) return;
      travel = journey.travel;
      zoom = journey.zoom;
      invalidate();
    };

    gsap.ticker.add(checkForChanges);
    return () => gsap.ticker.remove(checkForChanges);
  }, [invalidate, journeyRef]);

  useFrame(({ camera, size }) => {
    const globe = globeRef.current;
    if (!globe || !(camera instanceof THREE.PerspectiveCamera)) return;

    const { travel, zoom } = journeyRef.current;
    const { radius, journey } = GLOBE_CONFIG;
    const { from, to } = journey;

    // Travel east across the surface, easing out the resting tilt and roll on arrival
    const fromLon = reducedMotion
      ? to.lon - journey.reducedMotionArc
      : from.lon;
    getFacingQuaternion(
      lerp(from.lat, to.lat, travel),
      lerp(fromLon, to.lon, travel),
      lerp(from.roll, to.roll, travel),
      globe.quaternion
    );

    // The sky turns with part of the globe's rotation since the start pose, so the flight reads as travel
    const stars = starsRef.current;
    if (stars) {
      getFacingQuaternion(from.lat, fromLon, from.roll, startQuat);
      turnQuat.copy(globe.quaternion).multiply(startQuat.invert());
      stars.quaternion.slerpQuaternions(
        IDENTITY,
        turnQuat,
        GLOBE_CONFIG.stars.drift
      );
    }

    // Interpolate altitude exponentially so the approach reads as a steady flight, not a lurch
    const aspect = size.width / size.height;
    const overviewAltitude =
      getOverviewDistance(
        camera.fov,
        aspect,
        journey.distance,
        journey.fitMargin
      ) - radius;
    const closeAltitude =
      aspect < 1
        ? journey.closeAltitude.portrait
        : journey.closeAltitude.landscape;
    const altitude =
      overviewAltitude * (closeAltitude / overviewAltitude) ** zoom;

    camera.position.set(0, 0, radius + altitude);
  });

  return (
    <>
      <GlobeStars
        ref={starsRef}
        style={palette.stars}
        twinkle={!reducedMotion}
        isVisible={() =>
          journeyRef.current.zoom < GLOBE_CONFIG.journey.starsHiddenAtZoom
        }
      />

      <GlobeModel
        ref={globeRef}
        markers={markers}
        palette={palette}
        highlightCountry={GLOBE_CONFIG.journey.highlightCountry}
      />

      {/* Depth-only sphere hides the far hemisphere and the stars behind the globe */}
      <mesh renderOrder={-1}>
        <sphereGeometry
          args={[
            GLOBE_CONFIG.radius * GLOBE_CONFIG.journey.occluderScale,
            64,
            32,
          ]}
        />
        <meshBasicMaterial colorWrite={false} />
      </mesh>
    </>
  );
}

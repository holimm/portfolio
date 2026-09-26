'use client';

import { useFrame, useThree } from '@react-three/fiber';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import * as THREE from 'three';
import {
  GLOBE_CONFIG,
  type GlobeMarker,
  type GlobePalette,
} from '../../config/Globe.Config';
import { getViewQuaternion, latLonToVector3 } from '../../utils/Geo.Util';
import { GlobeControls } from './GlobeControls';
import { CountryOutlines, GlobeGraticule, GlobeWireframe } from './GlobeLines';
import { GlobeMarkerPin } from './GlobeMarkerPin';

export interface GlobeSceneProps {
  markers: GlobeMarker[];
  palette: GlobePalette;
  interactive: boolean;
  reducedMotion: boolean;
  /** DOM element positioned over the active marker every frame. */
  labelRef: RefObject<HTMLDivElement | null>;
  onActiveMarkerChange: (marker: GlobeMarker | null) => void;
}

const labelPoint = new THREE.Vector3();

/** Configured view direction, expressed in world space for the current camera orientation. */
function getViewDirection(
  camera: THREE.Camera,
  size: { width: number; height: number }
): THREE.Vector3 {
  const { landscape, portrait } = GLOBE_CONFIG.viewDirection;
  const direction = size.width < size.height ? portrait : landscape;
  return new THREE.Vector3(...direction).applyQuaternion(camera.quaternion);
}

export function GlobeScene({
  markers,
  palette,
  interactive,
  reducedMotion,
  labelRef,
  onActiveMarkerChange,
}: GlobeSceneProps) {
  const camera = useThree((state) => state.camera);
  const getState = useThree((state) => state.get);
  const globeRef = useRef<THREE.Group>(null);
  const targetQuatRef = useRef<THREE.Quaternion | null>(null);
  const pendingMarkerRef = useRef<GlobeMarker | null>(null);
  const activeMarkerRef = useRef<GlobeMarker | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [autoRotate, setAutoRotate] = useState(true);

  const cancelAutoRotateResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  }, []);

  useEffect(() => cancelAutoRotateResume, [cancelAutoRotateResume]);

  const homeMarker = markers[0];

  // Start with the home marker at the view direction, facing the camera
  useLayoutEffect(() => {
    if (!globeRef.current || !homeMarker) return;
    globeRef.current.quaternion.copy(
      getViewQuaternion(
        homeMarker.lat,
        homeMarker.lon,
        getViewDirection(camera, getState().size)
      )
    );
  }, [homeMarker?.lat, homeMarker?.lon]);

  const setActiveMarker = useCallback(
    (marker: GlobeMarker | null) => {
      activeMarkerRef.current = marker;
      onActiveMarkerChange(marker);
    },
    [onActiveMarkerChange]
  );

  useEffect(() => () => onActiveMarkerChange(null), [onActiveMarkerChange]);

  const focusOnMarker = useCallback(
    (marker: GlobeMarker) => {
      // A focused marker stays put; the pointerup that preceded this click scheduled a resume
      cancelAutoRotateResume();
      setActiveMarker(null);
      setAutoRotate(false);
      pendingMarkerRef.current = marker;
      // Relative to the camera (not world axes) so focusing works after the user orbits
      targetQuatRef.current = getViewQuaternion(
        marker.lat,
        marker.lon,
        getViewDirection(camera, getState().size)
      );
    },
    [camera, getState, cancelAutoRotateResume, setActiveMarker]
  );

  const handleControlsStart = useCallback(() => {
    cancelAutoRotateResume();
    setActiveMarker(null);
    setAutoRotate(false);
  }, [cancelAutoRotateResume, setActiveMarker]);

  // Resume auto-rotate a few seconds after the user stops dragging
  const handleControlsEnd = useCallback(() => {
    cancelAutoRotateResume();
    resumeTimerRef.current = setTimeout(() => {
      resumeTimerRef.current = null;
      setAutoRotate(true);
    }, GLOBE_CONFIG.controls.autoRotateResumeDelay);
  }, [cancelAutoRotateResume]);

  useFrame(({ size }, delta) => {
    const globe = globeRef.current;
    if (!globe) return;

    // Focus animation
    const target = targetQuatRef.current;
    if (target) {
      const step = reducedMotion ? 1 : delta * GLOBE_CONFIG.focus.speed;
      globe.quaternion.slerp(target, Math.min(step, 1));

      if (globe.quaternion.angleTo(target) < GLOBE_CONFIG.focus.threshold) {
        globe.quaternion.copy(target);
        targetQuatRef.current = null;

        if (pendingMarkerRef.current) {
          setActiveMarker(pendingMarkerRef.current);
          pendingMarkerRef.current = null;
        }
      }
    }

    // Keep the DOM label pinned to the active marker
    const active = activeMarkerRef.current;
    const label = labelRef.current;
    if (!active || !label) return;

    latLonToVector3(active.lat, active.lon, GLOBE_CONFIG.radius, labelPoint);
    globe.localToWorld(labelPoint).project(camera);

    // Label sits above the marker, clamped horizontally inside the canvas
    const { labelGap, labelEdgePadding } = GLOBE_CONFIG.marker;
    const halfWidth = label.offsetWidth / 2;
    const x = THREE.MathUtils.clamp(
      (labelPoint.x * 0.5 + 0.5) * size.width,
      halfWidth + labelEdgePadding,
      size.width - halfWidth - labelEdgePadding
    );
    const y = (-labelPoint.y * 0.5 + 0.5) * size.height - labelGap;
    label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
  });

  return (
    <>
      <group ref={globeRef}>
        <GlobeWireframe style={palette.wireframe} />
        <GlobeGraticule style={palette.graticule} />
        <CountryOutlines style={palette.countries} />

        {markers.map((marker) => (
          <GlobeMarkerPin
            key={marker.id}
            marker={marker}
            color={palette.marker}
            onSelect={focusOnMarker}
          />
        ))}
      </group>

      <GlobeControls
        autoRotate={autoRotate && !reducedMotion}
        enabled={interactive}
        onStart={handleControlsStart}
        onEnd={handleControlsEnd}
      />
    </>
  );
}

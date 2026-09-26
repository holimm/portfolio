'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLOBE_CONFIG } from '../../config/Globe.Config';

interface GlobeControlsProps {
  autoRotate: boolean;
  enabled: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

/** Orbit controls (rotate only) with a camera distance that keeps the globe inside narrow viewports. */
export function GlobeControls({
  autoRotate,
  enabled,
  onStart,
  onEnd,
}: GlobeControlsProps) {
  const camera = useThree((state) => state.camera);
  const domElement = useThree((state) => state.gl.domElement);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  const [controls, setControls] = useState<OrbitControls | null>(null);
  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onStartRef.current = onStart;
    onEndRef.current = onEnd;
  }, [onStart, onEnd]);

  useEffect(() => {
    const instance = new OrbitControls(camera, domElement);
    // Zoom and pan stay off: the globe sits inside a scrolling page
    instance.enablePan = false;
    instance.enableZoom = false;
    instance.enableDamping = true;
    instance.dampingFactor = GLOBE_CONFIG.controls.dampingFactor;
    instance.rotateSpeed = GLOBE_CONFIG.controls.rotateSpeed;
    instance.autoRotateSpeed = GLOBE_CONFIG.controls.autoRotateSpeed;

    const handleStart = () => onStartRef.current?.();
    const handleEnd = () => onEndRef.current?.();
    instance.addEventListener('start', handleStart);
    instance.addEventListener('end', handleEnd);
    setControls(instance);

    return () => {
      instance.removeEventListener('start', handleStart);
      instance.removeEventListener('end', handleEnd);
      instance.dispose();
    };
  }, [camera, domElement]);

  useEffect(() => {
    if (controls) controls.autoRotate = autoRotate;
  }, [controls, autoRotate]);

  useEffect(() => {
    if (!controls) return;
    controls.enabled = enabled;
    // OrbitControls sets `touch-action: none`; give scrolling back when rotation is disabled
    domElement.style.touchAction = enabled ? 'none' : 'auto';
  }, [controls, domElement, enabled]);

  useEffect(() => {
    if (!controls || !(camera instanceof THREE.PerspectiveCamera)) return;

    const { radius, camera: cameraConfig } = GLOBE_CONFIG;
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const halfHorizontalFov = Math.atan(Math.tan(halfFov) * (width / height));
    const fitDistance =
      (radius * cameraConfig.fitMargin) / Math.sin(halfHorizontalFov);

    camera.position.setLength(Math.max(cameraConfig.distance, fitDistance));
    controls.update();
  }, [controls, camera, width, height]);

  useFrame((_, delta) => controls?.update(delta));

  return null;
}

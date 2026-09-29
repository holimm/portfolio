'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GLOBE_CONFIG, type GlobeMarker } from '../../config/Globe.Config';
import { latLonToVector3 } from '../../utils/Geo.Util';
import { GlobeLines } from './GlobeLines';

const pinWorldPosition = new THREE.Vector3();

interface GlobeMarkerPinProps {
  marker: GlobeMarker;
  color: string;
  /** Without a handler the pin is purely decorative. */
  onSelect?: (marker: GlobeMarker) => void;
}

export function GlobeMarkerPin({
  marker,
  color,
  onSelect,
}: GlobeMarkerPinProps) {
  const domElement = useThree((state) => state.gl.domElement);
  const pinRef = useRef<THREE.Group>(null);

  const { surface, stem } = useMemo(() => {
    const { radius } = GLOBE_CONFIG;
    const surfacePoint = latLonToVector3(marker.lat, marker.lon, radius);
    const stemEnd = latLonToVector3(
      marker.lat,
      marker.lon,
      radius + GLOBE_CONFIG.marker.stemLength
    );

    return {
      surface: surfacePoint,
      stem: new Float32Array([...surfacePoint.toArray(), ...stemEnd.toArray()]),
    };
  }, [marker.lat, marker.lon]);

  useEffect(() => () => void (domElement.style.cursor = ''), [domElement]);

  // Keep the dot and its hit area the same on-screen size as the camera backs off or flies in
  useFrame(({ camera }) => {
    const pin = pinRef.current;
    if (!pin) return;

    pin.getWorldPosition(pinWorldPosition);
    pin.scale.setScalar(
      camera.position.distanceTo(pinWorldPosition) /
        GLOBE_CONFIG.marker.referenceDistance
    );
  });

  return (
    <group>
      <group ref={pinRef} position={surface}>
        {/* Invisible, larger hit area so the small dot is easy to click */}
        {onSelect && (
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              onSelect(marker);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              domElement.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              domElement.style.cursor = '';
            }}
          >
            <sphereGeometry args={[GLOBE_CONFIG.marker.hitRadius, 12, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        )}

        <mesh>
          <sphereGeometry args={[GLOBE_CONFIG.marker.dotRadius, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      <GlobeLines positions={stem} style={{ color, opacity: 0.9 }} />
    </group>
  );
}

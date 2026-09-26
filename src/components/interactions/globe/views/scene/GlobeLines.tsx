'use client';

import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { GLOBE_CONFIG, type GlobeLineStyle } from '../../config/Globe.Config';
import {
  buildGraticulePositions,
  buildRingPositions,
  loadCountryRings,
} from '../../utils/Geo.Util';

interface GlobeLinesProps {
  /** Flat xyz pairs, one pair per segment. */
  positions: Float32Array;
  style: GlobeLineStyle;
}

export function GlobeLines({ positions, style }: GlobeLinesProps) {
  const geometry = useMemo(
    () =>
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      ),
    [positions]
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={style.color}
        transparent
        opacity={style.opacity}
      />
    </lineSegments>
  );
}

export function GlobeWireframe({ style }: { style: GlobeLineStyle }) {
  const positions = useMemo(() => {
    const sphere = new THREE.IcosahedronGeometry(
      GLOBE_CONFIG.radius,
      GLOBE_CONFIG.wireframeDetail
    );
    const edges = new THREE.EdgesGeometry(sphere);
    const array = edges.getAttribute('position').array as Float32Array;

    sphere.dispose();
    edges.dispose();
    return array;
  }, []);

  return <GlobeLines positions={positions} style={style} />;
}

export function GlobeGraticule({ style }: { style: GlobeLineStyle }) {
  const positions = useMemo(
    () =>
      buildGraticulePositions(GLOBE_CONFIG.radius, GLOBE_CONFIG.graticuleStep),
    []
  );

  return <GlobeLines positions={positions} style={style} />;
}

export function CountryOutlines({ style }: { style: GlobeLineStyle }) {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loadCountryRings().then((rings) => {
      if (cancelled || rings.length === 0) return;
      // Slightly above the surface to avoid z-fighting with the graticule
      setPositions(buildRingPositions(rings, GLOBE_CONFIG.radius + 0.002));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!positions) return null;

  return <GlobeLines positions={positions} style={style} />;
}

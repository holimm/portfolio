'use client';

import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { GLOBE_CONFIG, type GlobeLineStyle } from '../../config/Globe.Config';
import {
  buildGraticulePositions,
  buildRingPositions,
  loadCountries,
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

interface CountryOutlinesProps {
  style: GlobeLineStyle;
  /** Country (by code) drawn again on top in its own style. */
  highlight?: { code: string; style: GlobeLineStyle };
}

export function CountryOutlines({ style, highlight }: CountryOutlinesProps) {
  const highlightCode = highlight?.code;
  const [positions, setPositions] = useState<{
    all: Float32Array;
    highlight: Float32Array | null;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loadCountries().then((countries) => {
      if (cancelled || countries.length === 0) return;
      // Slightly above the surface to avoid z-fighting with the graticule
      const radius = GLOBE_CONFIG.radius + 0.002;
      const highlighted = countries.find(
        (country) => country.code === highlightCode
      );

      setPositions({
        all: buildRingPositions(
          countries.flatMap((country) => country.rings),
          radius
        ),
        // A touch higher again so the highlight always draws over the shared border
        highlight: highlighted
          ? buildRingPositions(highlighted.rings, radius + 0.002)
          : null,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [highlightCode]);

  if (!positions) return null;

  return (
    <>
      <GlobeLines positions={positions.all} style={style} />
      {highlight && positions.highlight && (
        <GlobeLines positions={positions.highlight} style={highlight.style} />
      )}
    </>
  );
}

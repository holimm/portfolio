'use client';

import { forwardRef } from 'react';
import type * as THREE from 'three';
import type { GlobeMarker, GlobePalette } from '../../config/Globe.Config';
import { CountryOutlines, GlobeGraticule, GlobeWireframe } from './GlobeLines';
import { GlobeMarkerPin } from './GlobeMarkerPin';

interface GlobeModelProps {
  markers: GlobeMarker[];
  palette: GlobePalette;
  /** Country code whose outline is drawn in `palette.highlight`. */
  highlightCountry?: string;
  onSelectMarker?: (marker: GlobeMarker) => void;
}

/** The globe's geometry; scenes decide how it is oriented. */
export const GlobeModel = forwardRef<THREE.Group, GlobeModelProps>(
  ({ markers, palette, highlightCountry, onSelectMarker }, ref) => (
    <group ref={ref}>
      <GlobeWireframe style={palette.wireframe} />
      <GlobeGraticule style={palette.graticule} />
      <CountryOutlines
        style={palette.countries}
        highlight={
          highlightCountry
            ? { code: highlightCountry, style: palette.highlight }
            : undefined
        }
      />

      {markers.map((marker) => (
        <GlobeMarkerPin
          key={marker.id}
          marker={marker}
          color={palette.marker}
          onSelect={onSelectMarker}
        />
      ))}
    </group>
  )
);

GlobeModel.displayName = 'GlobeModel';

import { tv, type VariantProps } from 'tailwind-variants';

const globeVariants = tv({
  slots: {
    root: 'relative h-full w-full overflow-hidden',
    canvas: 'transition-opacity duration-1000 ease-out',
    labelAnchor:
      'pointer-events-none absolute top-0 left-0 z-10 will-change-transform',
    label:
      'flex w-max max-w-[180px] flex-col gap-1 rounded-xs border px-3 py-2 text-center shadow-md backdrop-blur-sm sm:max-w-[220px]',
  },
  variants: {
    theme: {
      default: {
        label:
          'border-contrast-lowest bg-background-lightest/95 text-contrast-highest',
      },
      light: {
        label:
          'border-contrast-lowest bg-background-lightest/95 text-contrast-highest',
      },
      dark: {
        label:
          'border-contrast-lowest bg-background-light/95 text-contrast-highest',
      },
    },
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
  },
  compoundVariants: [],
});

export type GlobeVariantProps = VariantProps<typeof globeVariants>;
export type GlobeTheme = NonNullable<GlobeVariantProps['theme']>;
export { globeVariants };

export interface GlobeMarker {
  id: string;
  label: string;
  description?: string;
  lat: number;
  lon: number;
}

/**
 * Scroll-driven view state. GSAP tweens these values directly and the scene reads them every
 * frame, so scrubbing never goes through React state.
 */
export interface GlobeJourney {
  /** 0 = overview pose, 1 = `GLOBE_CONFIG.journey.to` centred and facing the camera. */
  travel: number;
  /** 0 = fitted overview distance, 1 = close-up altitude; values above 1 keep diving in. */
  zoom: number;
}

export interface GlobeLineStyle {
  color: string;
  opacity: number;
}

export interface GlobePalette {
  wireframe: GlobeLineStyle;
  graticule: GlobeLineStyle;
  countries: GlobeLineStyle;
  /** Outline of a single emphasised country. */
  highlight: GlobeLineStyle;
  marker: string;
  /** Background starfield; each star's brightness varies below this. */
  stars: GlobeLineStyle;
}

/** Scene colors, mapped from the design tokens in `styles/tokens/colors.css`. */
export const GLOBE_PALETTES: Record<GlobeTheme, GlobePalette> = {
  default: {
    wireframe: { color: '#8e94a2', opacity: 0.45 }, // raven-400
    graticule: { color: '#a3a3a3', opacity: 0.28 }, // gray-400
    countries: { color: '#2e2e2e', opacity: 0.5 }, // gray-700
    highlight: { color: '#121212', opacity: 1 }, // gray-950
    marker: '#45b441', // leaf-500 (success)
    stars: { color: '#8e94a2', opacity: 0.5 }, // raven-400
  },
  light: {
    wireframe: { color: '#8e94a2', opacity: 0.45 },
    graticule: { color: '#a3a3a3', opacity: 0.28 },
    countries: { color: '#2e2e2e', opacity: 0.5 },
    highlight: { color: '#121212', opacity: 1 },
    marker: '#45b441',
    stars: { color: '#8e94a2', opacity: 0.5 },
  },
  dark: {
    wireframe: { color: '#5b606e', opacity: 0.55 }, // raven-600
    graticule: { color: '#525252', opacity: 0.35 }, // gray-600
    countries: { color: '#d1d1d1', opacity: 0.5 }, // gray-300
    highlight: { color: '#ffffff', opacity: 1 },
    marker: '#66c563', // leaf-400
    stars: { color: '#ffffff', opacity: 0.9 },
  },
};

export const GLOBE_CONFIG = {
  radius: 2,
  wireframeDetail: 3,
  graticuleStep: 15,
  camera: {
    fov: 45,
    /** Minimum camera distance; grows on narrow viewports so the globe fits. */
    distance: 5.5,
    /** Horizontal breathing room around the globe on narrow viewports. */
    fitMargin: 1.15,
  },
  controls: {
    rotateSpeed: 0.45,
    autoRotateSpeed: 0.35,
    dampingFactor: 0.05,
    /** Delay (ms) after the user stops dragging before auto-rotate resumes. */
    autoRotateResumeDelay: 3000,
  },
  focus: {
    /** Slerp speed used when rotating a marker to face the camera. */
    speed: 2.5,
    /** Angle (radians) under which the focus animation snaps and completes. */
    threshold: 0.02,
  },
  marker: {
    /** Camera-to-marker distance at which the pin renders at its configured size. */
    referenceDistance: 5,
    dotRadius: 0.035,
    hitRadius: 0.08,
    stemLength: 0.28,
    /** Screen-space gap (px) between the marker and the bottom edge of its label. */
    labelGap: 16,
    labelEdgePadding: 8,
  },
  /**
   * Camera-space direction where the home marker starts and where selected markers are
   * rotated to, chosen to keep markers and labels clear of the hero content.
   */
  viewDirection: {
    landscape: [-0.5, 0.3, 0.81],
    portrait: [0, -0.15, 0.99],
  },
  /** Starfield scattered through a distant shell around the globe. */
  stars: {
    /** Far enough out that the field barely shifts as the camera dives towards the globe. */
    radius: { inner: 45, outer: 90 },
    /**
     * Faint dust, then fewer brighter stars, over the whole sky (the camera sees roughly 8% of it).
     * Size is in CSS pixels; brightness and twinkle (share of brightness a star dips by) are
     * [min, max] ranges each star picks from.
     */
    layers: [
      { count: 5000, size: 1.1, brightness: [0.25, 0.75], twinkle: [0.1, 0.5] },
      { count: 520, size: 1.9, brightness: [0.65, 1], twinkle: [0.3, 0.85] },
    ],
    /** Seconds per twinkle cycle, picked per star. */
    twinklePeriod: [2, 6],
    /** Redraw rate while twinkling in an on-demand scene; slow twinkles don't need 60fps. */
    twinkleFps: 30,
    /** Share of the globe's journey rotation the sky follows, giving a sense of travel. */
    drift: 0.4,
    /** Fixed seed so the same sky appears on every load. */
    seed: 20260930,
  },
  /** Scroll-driven flight from the overview pose to a close-up of `to`. */
  journey: {
    /** Coordinate facing the camera at the start; sweeping east crosses Africa and Asia. */
    from: { lat: 24, lon: -38, roll: -0.22 },
    /** Viet Nam, framed so the whole country and the home marker stay in view. */
    to: { lat: 15.5, lon: 106.5, roll: 0 },
    highlightCountry: 'VNM',
    /** Shorter arc used when the user prefers reduced motion. */
    reducedMotionArc: 25,
    /** Minimum overview distance; smaller than `camera.distance` leaves room around the globe. */
    distance: 7,
    fitMargin: 1.08,
    /** Below the surface so graticule chords, which dip inside the sphere, still draw. */
    occluderScale: 0.985,
    /** Camera height above the surface at zoom = 1. */
    closeAltitude: { landscape: 1.05, portrait: 1.3 },
    /** Past this zoom the page's white bloom has covered the sky, so the stars stop twinkling. */
    starsHiddenAtZoom: 1.55,
  },
  countriesUrl:
    'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
} as const;

export const GLOBE_DEFAULT_MARKERS: GlobeMarker[] = [
  {
    id: 'ho-chi-minh-city',
    label: 'Ho Chi Minh City, Viet Nam',
    description: 'UTC+7 · Home base',
    lat: 10.7769,
    lon: 106.7009,
  },
];

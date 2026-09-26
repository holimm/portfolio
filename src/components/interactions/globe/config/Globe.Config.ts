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

export interface GlobeLineStyle {
  color: string;
  opacity: number;
}

export interface GlobePalette {
  wireframe: GlobeLineStyle;
  graticule: GlobeLineStyle;
  countries: GlobeLineStyle;
  marker: string;
}

/** Scene colors, mapped from the design tokens in `styles/tokens/colors.css`. */
export const GLOBE_PALETTES: Record<GlobeTheme, GlobePalette> = {
  default: {
    wireframe: { color: '#8e94a2', opacity: 0.45 }, // raven-400
    graticule: { color: '#a3a3a3', opacity: 0.28 }, // gray-400
    countries: { color: '#2e2e2e', opacity: 0.5 }, // gray-700
    marker: '#45b441', // leaf-500 (success)
  },
  light: {
    wireframe: { color: '#8e94a2', opacity: 0.45 },
    graticule: { color: '#a3a3a3', opacity: 0.28 },
    countries: { color: '#2e2e2e', opacity: 0.5 },
    marker: '#45b441',
  },
  dark: {
    wireframe: { color: '#5b606e', opacity: 0.55 }, // raven-600
    graticule: { color: '#525252', opacity: 0.35 }, // gray-600
    countries: { color: '#d1d1d1', opacity: 0.5 }, // gray-300
    marker: '#66c563', // leaf-400
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

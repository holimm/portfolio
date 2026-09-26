'use client';

import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMediaQuery } from '@/hooks';
import {
  GLOBE_DEFAULT_MARKERS,
  GLOBE_PALETTES,
  globeVariants,
  type GlobeMarker,
  type GlobeVariantProps,
} from '../config/Globe.Config';

export interface UseGlobeProps extends GlobeVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  markers?: GlobeMarker[];
}

export const useGlobe = (props: UseGlobeProps) => {
  const {
    ref,
    variant = 'default',
    theme = 'default',
    markers = GLOBE_DEFAULT_MARKERS,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

  const globeStyle = useMemo(
    () => globeVariants({ variant, theme }),
    [variant, theme]
  );
  const palette = GLOBE_PALETTES[theme];

  // States
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [activeMarker, setActiveMarker] = useState<GlobeMarker | null>(null);

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // Dragging the globe would hijack touch scrolling, so only fine pointers can rotate it.
  const interactive = useMediaQuery('(pointer: fine)');

  // Pause rendering while the globe is scrolled out of view
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  return {
    variant,
    theme,
    markers,
    palette,
    globeStyle,
    rootRef,
    labelRef,
    ready,
    setReady,
    inView,
    reducedMotion,
    interactive,
    activeMarker,
    setActiveMarker,
  };
};

export type UseGlobeReturn = ReturnType<typeof useGlobe>;

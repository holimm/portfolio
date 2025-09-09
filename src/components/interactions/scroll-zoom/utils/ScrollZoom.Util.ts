'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  scrollZoomVariants,
  type ScrollZoomVariantProps,
} from '../config/ScrollZoom.Config';

// Context Provider
const ScrollZoomContext = createContext<UseScrollZoomReturn | undefined>(
  undefined
);

const useScrollZoomContext = () => {
  const context = useContext(ScrollZoomContext);

  if (!context) {
    throw new Error('Missing ScrollZoomProvider');
  }
  return context;
};

const ScrollZoomProvider = ScrollZoomContext.Provider;

export { ScrollZoomProvider, useScrollZoomContext };

// Custom hook for using the context
export interface UseScrollZoomProps extends ScrollZoomVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  initialSize?: string; // width of the box, e.g. '60vmin'
  zoomVh?: number; // how many extra viewport heights the section occupies for the zoom
  src: string; // image url
  alt?: string;
}

export const useScrollZoom = (props: UseScrollZoomProps) => {
  const {
    ref: scrollZoomRef,
    variant = 'default',
    initialSize,
    zoomVh,
    src,
    alt = 'Zoom image',
  } = props;

  const { root: scrollZoomStyle } = useMemo(
    () =>
      scrollZoomVariants({
        variant,
      }),
    [variant]
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);
  const finalScale = useRef(1);

  // easeOutCubic for a designer feel
  const easeOutCubic = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  // Memoize sectionHeight to avoid recalculation on every render
  const sectionHeight = useMemo(
    () => `calc(100vh + ${zoomVh ?? 0}vh)`,
    [zoomVh]
  );

  // Compute final scale so the image box will cover the viewport (cover)
  const computeFinalScale = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const r = wrapper.getBoundingClientRect();
    const initialW = r.width || 1;
    const initialH = r.height || 1;
    const scale = Math.max(vw / initialW, vh / initialH);
    finalScale.current = isFinite(scale) && scale > 0 ? scale : 1;
  }, []);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;
    if (ticking.current) return;
    ticking.current = true;
    window.requestAnimationFrame(() => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = Math.min(Math.max(-rect.top / total, 0), 1);
      const eased = easeOutCubic(raw);

      const s = 1 + (finalScale.current - 1) * eased;
      wrapper.style.transform = `scale(${s}) translateZ(0)`;

      const overlay = section.querySelector(
        '.__sz_overlay'
      ) as HTMLDivElement | null;
      if (overlay) {
        overlay.style.opacity = String(Math.min(eased * 0.45, 0.45));
      }

      ticking.current = false;
    });
  }, [easeOutCubic]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    computeFinalScale();

    const img = wrapper.querySelector('img') as HTMLImageElement | null;
    if (img && !img.complete) {
      img.onload = computeFinalScale;
      img.onerror = computeFinalScale;
    }

    window.addEventListener('resize', computeFinalScale);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial scroll effect
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', computeFinalScale);
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [computeFinalScale, onScroll, initialSize, zoomVh]);

  return {
    variant,
    scrollZoomRef,
    scrollZoomStyle,
    sectionRef,
    wrapperRef,
    initialSize: initialSize || '60vmin',
    sectionHeight,
    src,
    alt,
  };
};

export type UseScrollZoomReturn = ReturnType<typeof useScrollZoom>;

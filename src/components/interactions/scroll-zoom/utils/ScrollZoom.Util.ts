'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import {
  scrollZoomVariants,
  type ScrollZoomVariantProps,
} from '../config/ScrollZoom.Config';
import { getPinType, ScrollTrigger, useGSAP } from '@/config';

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
  const pinRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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

  const render = useCallback(
    (progress: number) => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      if (!section || !wrapper) return;

      const eased = easeOutCubic(progress);

      const s = 1 + (finalScale.current - 1) * eased;
      wrapper.style.transform = `scale(${s}) translateZ(0)`;

      const overlay = section.querySelector(
        '.__sz_overlay'
      ) as HTMLDivElement | null;
      if (overlay) {
        overlay.style.opacity = String(Math.min(eased * 0.45, 0.45));
      }
    },
    [easeOutCubic]
  );

  useGSAP(
    () => {
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

      // Pin the viewport-sized stage (replaces position: sticky) and zoom with the scroll progress
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        pinSpacing: false,
        pinType: getPinType(),
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });

      return () => {
        window.removeEventListener('resize', computeFinalScale);
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      };
    },
    {
      dependencies: [computeFinalScale, render, initialSize, zoomVh],
      revertOnUpdate: true,
    }
  );

  return {
    variant,
    scrollZoomRef,
    scrollZoomStyle,
    sectionRef,
    pinRef,
    wrapperRef,
    initialSize: initialSize || '60vmin',
    sectionHeight,
    src,
    alt,
  };
};

export type UseScrollZoomReturn = ReturnType<typeof useScrollZoom>;

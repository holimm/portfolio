'use client';

import { useCallback, useState, RefObject } from 'react';
import { ScrollTrigger, useGSAP } from '@/config';

export const useScrollParallax = (ref: RefObject<HTMLElement>) => {
  const [scrollY, setScrollY] = useState(0);
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    const element = ref && ref.current ? ref.current : null;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const { innerHeight: windowHeight } = window;
    const {
      height: elementHeight,
      top: elementTop,
      bottom: elementBottom,
    } = rect;

    // Early exit if element is completely out of extended viewport
    const extendedTop = -elementHeight;
    const extendedBottom = windowHeight + elementHeight;

    if (elementBottom < extendedTop || elementTop > extendedBottom) {
      setVisibilityPercentage(0);
      setScrollY(0);
      return;
    }

    // Calculate visibility percentage
    const totalJourney = windowHeight + elementHeight;
    const currentProgress = Math.max(0, windowHeight - elementTop);
    const percentage = Math.min(
      100,
      Math.max(0, (currentProgress / totalJourney) * 100)
    );

    // Calculate scroll relative to viewport center
    const viewportCenter = windowHeight * 0.5;
    const elementCenter = elementTop + elementHeight * 0.5;
    const relativeScroll =
      percentage >= 100 ? 0 : viewportCenter - elementCenter;

    setScrollY(relativeScroll);
    setVisibilityPercentage(percentage);
  }, [ref]);

  // ScrollTrigger updates on every smoothed scroll frame, not just native scroll events
  useGSAP(
    () => {
      handleScroll();
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: handleScroll,
        onRefresh: handleScroll,
      });
    },
    { dependencies: [handleScroll], revertOnUpdate: true }
  );

  return { scrollY, visibilityPercentage };
};

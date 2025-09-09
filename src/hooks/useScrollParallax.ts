'use client';

import { useCallback, useEffect, useState, RefObject } from 'react';

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

  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  return { scrollY, visibilityPercentage };
};

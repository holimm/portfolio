'use client';

import { useCallback, useState, RefObject } from 'react';
import { ScrollTrigger, useGSAP } from '@/config';

export const useScrollParallax = (
  ref: RefObject<HTMLElement | null> | null
) => {
  const [scrollY, setScrollY] = useState(0);
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    const element = ref?.current;
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
      setVisibilityPercentage((current) => (current === 0 ? current : 0));
      setScrollY((current) => (current === 0 ? current : 0));
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

    setScrollY((current) =>
      current === relativeScroll ? current : relativeScroll
    );
    setVisibilityPercentage((current) =>
      current === percentage ? current : percentage
    );
  }, [ref]);

  // Only the footer parallax needs this, and only while it is near the viewport. A page-long
  // listener was reading layout on every frame and stalling the pinned hero and horizontal track.
  useGSAP(
    () => {
      const element = ref?.current;
      if (!element) return;

      const reset = () => {
        setVisibilityPercentage((current) => (current === 0 ? current : 0));
        setScrollY((current) => (current === 0 ? current : 0));
      };

      ScrollTrigger.create({
        trigger: element,
        // One section-height before it arrives, until two section-heights after its top has left.
        // Outside this, scroll frames do not read layout.
        start: 'top-=100% bottom',
        end: 'top+=200% top',
        onEnter: handleScroll,
        onEnterBack: handleScroll,
        onUpdate: handleScroll,
        onRefresh: handleScroll,
        onLeave: reset,
        onLeaveBack: reset,
      });
    },
    { dependencies: [handleScroll, ref], revertOnUpdate: true }
  );

  return { scrollY, visibilityPercentage };
};

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  marqueeVariants,
  type MarqueeVariantProps,
} from '../config/Marquee.Config';

// Context Provider
const MaraqueeContext = createContext<UseMarqueeReturn | undefined>(undefined);

const useMarqueeContext = () => {
  const context = useContext(MaraqueeContext);

  if (!context) {
    throw new Error('Missing MarqueeProvider');
  }
  return context;
};

const MarqueeProvider = MaraqueeContext.Provider;

export { MarqueeProvider, useMarqueeContext };

// Custom hook for using the context

export interface UseMarqueeProps extends MarqueeVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  speed?: number;
}

export const useMarquee = (props: UseMarqueeProps) => {
  const { ref: maraqueeRef, variant = 'default', speed = 20 } = props;

  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted) return;

    const calculateWidth = () => {
      // Find width of container and width of marquee
      if (marqueeRef.current && containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
        setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
      }
    };

    calculateWidth();
    // Rerender on window resize
    window.addEventListener('resize', calculateWidth);
    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const duration = useMemo(
    () =>
      marqueeWidth < containerWidth
        ? containerWidth / speed
        : marqueeWidth / speed,
    [marqueeWidth, containerWidth, speed]
  );

  const { root: marqueeStyle, item: marqueeItemStyle } = useMemo(
    () => marqueeVariants({ variant }),
    [variant]
  );

  return {
    variant,
    duration,
    isMounted,
    marqueeRef,
    containerRef,
    maraqueeRef,
    marqueeStyle,
    marqueeItemStyle,
  };
};

export type UseMarqueeReturn = ReturnType<typeof useMarquee>;

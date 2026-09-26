'use client';

import { useRef } from 'react';
import { ScrollSmoother, useGSAP } from '@/config';

export function SmoothScrollProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: ScrollSmoother.Vars;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      // Catch-up time matching the previous lerp of 0.1 per frame
      smooth: 1.15,
      // Touch devices keep native scrolling
      smoothTouch: false,
      ...options,
    });

    return () => smoother.kill();
  });

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}

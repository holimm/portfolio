'use client';

import { ReactNode, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, useGSAP } from '@/config';

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'easeOut' }
      );
    },
    { dependencies: [pathname] }
  );

  return (
    <html lang="en">
      <body>
        <div ref={containerRef}>{children}</div>
      </body>
    </html>
  );
};

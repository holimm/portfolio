'use client';

import dynamic from 'next/dynamic';

/** Client-only globe; three.js is split into its own chunk and loaded after hydration. */
export const LazyGlobe = dynamic(
  () => import('./Globe').then((mod) => mod.Globe),
  { ssr: false }
);

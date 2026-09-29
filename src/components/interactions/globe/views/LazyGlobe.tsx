'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAssetTask } from '@/hooks';
import type { GlobeProps } from './Globe';

/** Client-only globe; three.js is split into its own chunk and loaded after hydration. */
const DynamicGlobe = dynamic(() => import('./Globe').then((mod) => mod.Globe), {
  ssr: false,
});

/** Holds the page loader from first render, before the globe's chunk has even arrived. */
export const LazyGlobe = (props: GlobeProps) => {
  const [ready, setReady] = useState(false);
  useAssetTask(ready);

  const handleAssetsReady = useCallback(() => setReady(true), []);

  return <DynamicGlobe {...props} onAssetsReady={handleAssetsReady} />;
};

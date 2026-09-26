'use client';

import { useCallback, useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query. Returns `serverValue` during SSR. */
export const useMediaQuery = (query: string, serverValue = false): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
};

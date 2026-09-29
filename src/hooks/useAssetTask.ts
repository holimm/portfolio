'use client';

import { useEffect } from 'react';
import { createAssetTask } from '@/utils';

/** Holds the page loader until `ready` turns true, or until the component unmounts. */
export const useAssetTask = (ready: boolean) => {
  useEffect(() => {
    if (ready) return;
    return createAssetTask();
  }, [ready]);
};

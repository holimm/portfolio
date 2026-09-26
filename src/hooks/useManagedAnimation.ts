'use client';

import { useCallback, useEffect, useRef } from 'react';
import { gsap } from '@/config';

// Created at module load, outside any active context; only used for its ignore()
const detachedContext = gsap.context(() => {});

// Runs one animation at a time outside any useGSAP context, so repeated runs don't accumulate there.
// Starting a new animation kills the previous one; unmounting kills the current one.
export const useManagedAnimation = () => {
  const animationRef = useRef<gsap.core.Animation | null>(null);

  const kill = useCallback(() => {
    animationRef.current?.kill();
    animationRef.current = null;
  }, []);

  // `create` runs before the previous animation is killed, so it can still read its state (e.g. velocity)
  const play = useCallback((create: () => gsap.core.Animation) => {
    let animation: gsap.core.Animation | null = null;
    detachedContext.ignore(() => {
      animation = create();
    });
    animationRef.current?.kill();
    animationRef.current = animation;
    return animation;
  }, []);

  useEffect(() => kill, [kill]);

  return { play, kill };
};

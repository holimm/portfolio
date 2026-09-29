'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/config';
import { useManagedAnimation } from './useManagedAnimation';

interface UsePresenceOptions {
  // `isInitial` is true when the element has just been mounted and needs its hidden state applied
  onEnter: (isInitial: boolean) => gsap.core.Animation;
  onExit: () => gsap.core.Animation;
}

// Keeps an element mounted until its GSAP exit animation completes
export const usePresence = (
  isVisible: boolean,
  { onEnter, onExit }: UsePresenceOptions
) => {
  const [isMounted, setIsMounted] = useState(isVisible);
  const hasEnteredRef = useRef(false);
  const { play } = useManagedAnimation();

  useGSAP(
    () => {
      if (isVisible && !isMounted) {
        setIsMounted(true);
        return;
      }
      if (!isMounted) return;

      if (isVisible) {
        // Replacing an unfinished exit kills it, so it can no longer unmount the element
        play(() => onEnter(!hasEnteredRef.current));
        hasEnteredRef.current = true;
      } else {
        play(() =>
          gsap
            .timeline({
              onComplete: () => {
                hasEnteredRef.current = false;
                setIsMounted(false);
              },
            })
            .add(onExit())
        );
      }
    },
    { dependencies: [isVisible, isMounted] }
  );

  return isMounted;
};

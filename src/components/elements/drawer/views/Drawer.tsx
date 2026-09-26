'use client';

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { gsap, slideVariants } from '@/config';
import { usePresence } from '@/hooks';
import { type Easing, type SlideOptions } from '@/types';
import { useDrawer } from '../utils/Drawer.Util';

interface DrawerProps extends SlideOptions {
  open: boolean;
  onClose?: () => void;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  ease?: Easing;
  children: ReactNode;
  className?: string;
  backdropClassName?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useDrawer({
      ref,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);

    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const { drawerRef } = ctx;
    const setPanelRef = useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof drawerRef === 'function') {
          drawerRef(node);
        } else if (drawerRef) {
          drawerRef.current = node;
        }
      },
      [drawerRef]
    );

    const variants = slideVariants({
      x: ctx.x,
      y: ctx.y,
      duration: ctx.duration,
      ease: ctx.ease,
    });
    const backdropTransition = { duration: 0.2, ease: 'easeOut' };

    const isMounted = usePresence(ctx.open, {
      onEnter: (isInitial) => {
        if (isInitial) {
          gsap.set(backdropRef.current, { opacity: 0 });
          gsap.set(panelRef.current, variants.hidden);
        }
        return gsap
          .timeline()
          .to(backdropRef.current, { opacity: 1, ...backdropTransition }, 0)
          .to(panelRef.current, variants.visible, 0);
      },
      onExit: () =>
        gsap
          .timeline()
          .to(backdropRef.current, { opacity: 0, ...backdropTransition }, 0)
          .to(panelRef.current, variants.exit ?? variants.hidden, 0),
    });

    if (!isMounted) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className={ctx.backdropClassName || 'fixed inset-0 z-40 bg-black/50'}
          onClick={ctx.onClose}
        />
        {/* Drawer */}
        <div
          ref={setPanelRef}
          className="fixed top-0 right-0 z-50 h-full w-fit bg-white shadow-lg"
          style={ctx.getDrawerStyle(ctx.direction)}
        >
          <div className={className}>{children}</div>
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

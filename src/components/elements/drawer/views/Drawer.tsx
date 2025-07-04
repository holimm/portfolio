'use client';

import React, { forwardRef, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence, Easing } from 'motion/react';
import { slideVariants } from '@/config';
import { type SlideOptions } from '@/types';
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

    return (
      <AnimatePresence>
        {ctx.open && (
          <>
            {/* Backdrop */}
            <motion.div
              className={
                ctx.backdropClassName || 'fixed inset-0 z-40 bg-black/50'
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={ctx.onClose}
            />
            {/* Drawer */}
            <motion.div
              ref={ctx.drawerRef}
              className="fixed top-0 right-0 z-50 h-full w-fit bg-white shadow-lg"
              variants={slideVariants({
                x: ctx.x,
                y: ctx.y,
                duration: ctx.duration,
                ease: ctx.ease,
              })}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: ctx.duration }}
              style={ctx.getDrawerStyle(ctx.direction)}
            >
              <div className={className}>{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = 'Drawer';

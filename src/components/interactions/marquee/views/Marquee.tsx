'use client';

import { Fragment, forwardRef, useMemo, type HTMLAttributes } from 'react';
import {
  MarqueeProvider,
  useMarquee,
  type UseMarqueeProps,
} from '../utils/Marquee.Util';
import { cn } from '@/utils';

export interface MarqueeProps
  extends UseMarqueeProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseMarqueeProps> {
  repeat?: number;
  isPlaying?: boolean;
  isPauseOnHover?: boolean;
  isPauseOnClick?: boolean;
  direction?: 'left' | 'right';
  gap?: number | string;
  delay?: number;
  loop?: number;
  isGradient?: boolean;
  gradientColor?: [number, number, number];
  gradientWidth?: number | string;
  onFinish?: () => void;
  onCycleComplete?: () => void;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,

      loop = 0,
      delay = 0,
      repeat = 10,
      direction = 'left',
      gap = 0,

      // Function
      onFinish,
      onCycleComplete,
      isPlaying = true,
      isPauseOnClick = false,
      isPauseOnHover = false,

      // Color
      isGradient = false,
      gradientWidth = 200,
      gradientColor = [255, 255, 255],

      ...props
    },
    ref
  ) => {
    const { ...context } = useMarquee({ ref, ...props });
    const ctx = useMemo(() => context, [context]);

    const rgbaGradientColor = `rgba(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]}`;

    // Convert gap to string with px if number
    const gapValue = typeof gap === 'number' ? `${gap}px` : (gap ?? '0px');

    return (
      <MarqueeProvider value={ctx}>
        {!ctx.isMounted ? null : (
          <div
            data-comp="marquee"
            className={cn('marquee', ctx.marqueeStyle(), className)}
            ref={ctx.containerRef}
            {...props}
            style={{
              ['--marquee-pause-on-hover' as string]:
                !isPlaying || isPauseOnHover ? 'paused' : 'running',
              ['--marquee-pause-on-click' as string]:
                !isPlaying ||
                (isPauseOnHover && !isPauseOnClick) ||
                isPauseOnClick
                  ? 'paused'
                  : 'running',
            }}
          >
            {isGradient && (
              <div
                style={{
                  ['--marquee-gradient-color' as string]: `${rgbaGradientColor}, 1), ${rgbaGradientColor}, 0)`,
                  ['--marquee-gradient-width' as string]:
                    typeof gradientWidth === 'number'
                      ? `${gradientWidth}px`
                      : gradientWidth,
                }}
                className="marquee-overlay"
              />
            )}
            <div
              ref={ctx.marqueeRef}
              style={{
                ['--marquee-play' as string]: isPlaying ? 'running' : 'paused',
                ['--marquee-direction' as string]:
                  direction === 'left' ? 'normal' : 'reverse',
                ['--marquee-duration' as string]: `${ctx.duration}s`,
                ['--marquee-delay' as string]: `${delay}s`,
                ['--marquee-iteration-count' as string]: loop
                  ? `${loop}`
                  : 'infinite',
                display: 'flex',
                gap: gapValue, // <-- Add gap here
                alignItems: 'center',
                translate: direction === 'right' ? '100vw 0px' : '0px', // Set initial position if direction is right
              }}
              className={cn('marquee-inner', ctx.marqueeItemStyle())}
              onAnimationIteration={onCycleComplete}
              onAnimationEnd={onFinish}
            >
              {new Array(repeat).fill(children).map((_, i) => (
                <Fragment key={i}>{children}</Fragment>
              ))}
            </div>
          </div>
        )}
      </MarqueeProvider>
    );
  }
);

Marquee.displayName = 'Marquee';

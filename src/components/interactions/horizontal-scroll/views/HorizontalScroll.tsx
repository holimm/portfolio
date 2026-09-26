'use client';

import { forwardRef, HTMLAttributes } from 'react';
import {
  HorizontalScrollProvider,
  useHorizontalScroll,
  UseHorizontalScrollProps,
} from '../utils/HorizontalScroll.Util';
import { cn } from '@/utils';

export interface HorizontalScrollSection {
  key: string | number;
  content: React.ReactNode;
}

export interface HorizontalScrollProps
  extends UseHorizontalScrollProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseHorizontalScrollProps> {
  sections?: HorizontalScrollSection[];
}

export const HorizontalScroll = forwardRef<
  HTMLDivElement,
  HorizontalScrollProps
>(({ className, children, theme, ...props }, ref) => {
  const context = useHorizontalScroll({ ref, ...props });

  return (
    <HorizontalScrollProvider value={context}>
      <div
        ref={context.scrollContainerRef}
        style={{
          height: `${context.sections.length * 100}vh`,
          position: 'relative',
        }}
        className={cn(className, context.horizontalScrollStyle?.())}
        data-variant={context.variant}
        data-comp="horizontalScroll"
        data-theme={theme}
        id={props.id}
        {...props}
      >
        <div
          ref={context.pinRef}
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <div
            ref={context.trackRef}
            style={{
              display: 'flex',
              width: `${context.sections.length * 100}vw`,
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {context.sections.map((section) => (
              <div
                key={section.key}
                style={{
                  width: '100vw',
                  height: '100%',
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {section.content}
              </div>
            ))}
          </div>
        </div>
        {children}
      </div>
    </HorizontalScrollProvider>
  );
});

HorizontalScroll.displayName = 'HorizontalScroll';

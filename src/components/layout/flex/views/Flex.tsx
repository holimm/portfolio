'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { FlexProvider, useFlex, UseFlexProps } from '../utils/Flex.Util';

export interface FlexProps
  extends UseFlexProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'ref'> {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useFlex({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <FlexProvider value={ctx}>
        <div
          id={props.id}
          data-variant={ctx.variant}
          data-comp="flex"
          className={`${className} ${ctx.flexStyle()}`}
          ref={ctx.flexRef}
          {...props}
        >
          {children}
        </div>
      </FlexProvider>
    );
  }
);

Flex.displayName = 'Flex';

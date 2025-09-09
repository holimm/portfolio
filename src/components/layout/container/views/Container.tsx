'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import {
  ContainerProvider,
  useContainer,
  UseContainerProps,
} from '../utils/Container.Util';
import { cn } from '@/utils';

export interface ContainerProps
  extends UseContainerProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseContainerProps> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, theme, ...props }, ref) => {
    const { ...context } = useContainer({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <ContainerProvider value={ctx}>
        <div
          id={props.id}
          data-variant={ctx.variant}
          data-comp="container"
          data-theme={theme}
          className={cn(className, ctx.containerStyle())}
          ref={ctx.containerRef}
          {...props}
        >
          {children}
        </div>
      </ContainerProvider>
    );
  }
);

Container.displayName = 'Container';

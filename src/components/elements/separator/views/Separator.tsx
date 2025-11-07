'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  children?: React.ReactNode;
}) {
  if (!children) {
    return (
      <SeparatorPrimitive.Root
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-gray-400 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn('flex w-full items-center', className)}
      data-slot="separator-root"
      {...props}
    >
      <SeparatorPrimitive.Root
        decorative={decorative}
        orientation={orientation}
        className="h-px flex-1 shrink-0 bg-gray-400"
      />
      <span className="mx-4 whitespace-nowrap text-gray-500">{children}</span>
      <SeparatorPrimitive.Root
        decorative={decorative}
        orientation={orientation}
        className="h-px flex-1 shrink-0 bg-gray-400"
      />
    </div>
  );
}

export { Separator };

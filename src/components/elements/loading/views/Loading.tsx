import { cn } from '@/utils';
import React, { forwardRef, ReactNode } from 'react';

type LoadingProps = {
  loading: boolean;
  children: ReactNode;
  className?: string;
};

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ loading, children, className }, ref) => (
    <div ref={ref} className={cn('relative', className)} data-loading={loading}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  )
);

Loading.displayName = 'Loading';

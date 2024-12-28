'use client';
import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { useCard, type UseCardProps } from '../utils/useCard';
import { CardProvider } from '../utils/useCardContext';

export interface CardData {
  title?: string;
  text?: string;
  alignContent?: string;
}

export interface CardOptions extends UseCardProps {}

export interface CardProps
  extends CardOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseCardProps>,
    CardData {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { alignContent, ...rest } = props;
    const { ...context } = useCard({ ref, alignContent, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <CardProvider value={ctx}>
        <div
          data-comp="card"
          className={`${className} ${ctx.cardStyle()}`}
          ref={ctx.cardRef}
          {...rest}
        >
          {children}
        </div>
      </CardProvider>
    );
  }
);

Card.displayName = 'CardRoot';

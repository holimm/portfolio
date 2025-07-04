'use client';
import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { useCard, CardProvider, type UseCardProps } from '../utils/Card.Util';
export interface CardData {
  title?: string;
  text?: string;
  alignContent?: string;
}

export interface CardProps
  extends UseCardProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseCardProps>,
    CardData {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
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

const CardBody = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <article className={`${className} ${ctx.cardBodyStyle()}`}>
        {children}
      </article>
    );
  }
);

const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <footer className={`${className} ${ctx.cardFooterStyle()}`}>
        {children}
      </footer>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <header className={`${className} ${ctx.cardHeaderStyle()}`}>
        {children}
      </header>
    );
  }
);

CardRoot.displayName = 'Card';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';
CardHeader.displayName = 'CardHeader';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

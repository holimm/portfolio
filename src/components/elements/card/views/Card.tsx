"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { useCard, type UseCardProps } from "../utils/useCard";
import { CardProvider } from "../utils/useCardContext";

export interface CardData {
  title?: string;
  text?: string;
}

export interface CardOptions extends UseCardProps {}

export interface CardProps
  extends CardOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseCardProps>,
    CardData {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <CardProvider value={ctx}>
        <div
          data-comp="card"
          className={`${className} ${ctx.cardStyle()}`}
          ref={ctx.cardRef}
          {...props}
        >
          {children}
        </div>
      </CardProvider>
    );
  },
);

Card.displayName = "CardRoot";

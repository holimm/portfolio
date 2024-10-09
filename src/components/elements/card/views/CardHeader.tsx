"use client";
import { forwardRef, useMemo } from "react";
import { useCard } from "../utils/useCard";
import { type CardProps } from "./Card";

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <header className={`${className} ${ctx.cardHeaderStyle()}`}>
        {children}
      </header>
    );
  },
);

CardHeader.displayName = "CardHeader";

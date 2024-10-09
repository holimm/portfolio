"use client";
import { forwardRef, useMemo } from "react";
import { useCard } from "../utils/useCard";
import { type CardProps } from "./Card";

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <footer className={`${className} ${ctx.cardFooterStyle()}`}>
        {children}
      </footer>
    );
  },
);

CardFooter.displayName = "CardFooter";

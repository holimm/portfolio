"use client";
import { forwardRef, useMemo } from "react";
import { useCard } from "../utils/useCard";
import { type CardProps } from "./Card";

export const CardBody = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useCard({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <article className={`${className} ${ctx.cardBodyStyle()}`}>
        {children}
      </article>
    );
  },
);

CardBody.displayName = "CardBody";

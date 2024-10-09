"use client";
import { useMemo } from "react";
import { cardVariants, type CardVariantProps } from "../styles/card.config";

export interface UseCardProps extends CardVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useCard = (props: UseCardProps) => {
  const {
    ref: cardRef,
    variant = "default",
    rounded,
    color,
    custom = "elevated",
    direction = "vertical",
    padding,
  } = props;

  const {
    root: cardStyle,
    header: cardHeaderStyle,
    body: cardBodyStyle,
    footer: cardFooterStyle,
    icon: cardIconStyle,
  } = useMemo(
    () => cardVariants({ variant, custom, rounded, color, padding, direction }),
    [variant, custom, rounded, color, padding, direction],
  );

  return {
    cardRef,
    cardStyle,
    cardHeaderStyle,
    cardBodyStyle,
    cardFooterStyle,
    cardIconStyle,
  };
};

export type UseCardReturn = ReturnType<typeof useCard>;

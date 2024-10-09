"use client";
import { useMemo } from "react";

import {
  sectionVariants,
  type SectionVariantProps,
} from "../styles/section.config";

export interface UseSectionProps extends SectionVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useSection = (props: UseSectionProps) => {
  const { ref: sectionRef, variant = "default", yspace, xspace } = props;

  const { root: sectionStyle } = useMemo(
    () => sectionVariants({ variant, yspace, xspace }),
    [variant, yspace, xspace],
  );

  return {
    variant,
    sectionRef,
    sectionStyle,
  };
};

export type UseSectionReturn = ReturnType<typeof useSection>;

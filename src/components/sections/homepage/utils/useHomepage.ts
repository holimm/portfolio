"use client";

import { MotionProps } from "motion/react";
import { useCallback, useRef, useState } from "react";

export interface UseHomepageProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useHomepage = (props: UseHomepageProps) => {
  const { ref: homepageRef } = props;

  const [isCompletedAnimation, setIsCompletedAnimation] = useState(false);
  const [currentPage, setCurrentPage] = useState("hero");
  const [heroAnimateState, setHeroAnimateState] = useState(false);

  const refScroll = useRef<HTMLDivElement>(null);

  return {
    currentPage,
    setCurrentPage,
    heroAnimateState,
    setHeroAnimateState,
    homepageRef,
    refScroll,
    isCompletedAnimation,
    setIsCompletedAnimation,
  };
};

export type UseHomepageReturn = ReturnType<typeof useHomepage>;

"use client";
import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import { useHomepage, UseHomepageProps } from "../utils/useHomepage";
import { ThemeTypes } from "@/types/styles/theme";
import { Locale } from "../../../../../i18n.config";
import { motion } from "motion/react";
import { HomepageProvider } from "../utils/useHomepageContext";

export interface HomepageData {}

export interface HomepageOptions extends UseHomepageProps {}

export interface HomepageProps
  extends HomepageOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof HomepageData>,
    HomepageData {
  theme?: ThemeTypes;
  locale: Locale;
}

export const Homepage = forwardRef<HTMLDivElement, HomepageProps>(
  ({ className, children, theme, locale, ...props }, ref) => {
    const { ...context } = useHomepage({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <HomepageProvider value={ctx}>
        <div
          ref={ctx.refScroll}
          className="max-h-screen overflow-y-auto"
          style={{
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
          onKeyDown={(e) => {
            if (ctx.isCompletedAnimation) {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                if (ctx.refScroll.current) {
                  ctx.refScroll.current.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth",
                  });
                }
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                if (ctx.refScroll.current) {
                  ctx.refScroll.current.scrollBy({
                    top: -window.innerHeight,
                    behavior: "smooth",
                  });
                }
              }
            } else {
              if (ctx.currentPage === "hero") {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  ctx.setHeroAnimateState(false);
                  ctx.setIsCompletedAnimation(true);
                  e.preventDefault();
                }
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  ctx.setHeroAnimateState(true);
                  ctx.setIsCompletedAnimation(true);
                  e.preventDefault();
                }
              }
            }
          }}
          tabIndex={0}
        >
          <motion.div className="h-screen snap-center">
            <div className="flex h-full w-full items-center justify-center bg-white">
              <div className="inline-flex flex-col items-center gap-[258.113px] rounded-3xl px-[80.5px] pb-[60px] pt-[45.4px] shadow-xl">
                <div className="w-[181px] text-center">Test</div>
                <div className="w-[181px] text-center">Test</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="h-screen snap-center bg-slate-200"></motion.div>
        </div>
      </HomepageProvider>
    );
  },
);

Homepage.displayName = "Homepage";

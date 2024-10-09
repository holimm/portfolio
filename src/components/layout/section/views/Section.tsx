"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useSection, UseSectionProps } from "../utils/useSection";
import { SectionProvider } from "../utils/useSectionContext";

export interface SectionData {}

export interface SectionOptions extends UseSectionProps {}

export interface SectionProps
  extends SectionOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof SectionData>,
    SectionData {
  comp?: string;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, theme, ...props }, ref) => {
    const { ...context } = useSection({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <SectionProvider value={ctx}>
        <section
          id={props.id}
          data-variant={ctx.variant}
          data-comp={props.comp ? "section" : props.comp}
          data-theme={theme || "default"}
          className={`${className} ${ctx.sectionStyle()}`}
          ref={ctx.sectionRef}
          {...props}
        >
          {children}
        </section>
      </SectionProvider>
    );
  },
);

Section.displayName = "Section";

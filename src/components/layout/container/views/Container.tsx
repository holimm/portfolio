"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useContainer, UseContainerProps } from "../utils/useContainer";
import { ContainerProvider } from "../utils/useContainerContext";

export interface ContainerData {}

export interface ContainerOptions extends UseContainerProps {}

export interface ContainerProps
  extends ContainerOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof ContainerData>,
    ContainerData {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, theme, ...props }, ref) => {
    const { ...context } = useContainer({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <ContainerProvider value={ctx}>
        <div
          id={props.id}
          data-variant={ctx.variant}
          data-comp="container"
          data-theme={theme}
          className={`${className} ${ctx.containerStyle()}`}
          ref={ctx.containerRef}
          {...props}
        >
          {children}
        </div>
      </ContainerProvider>
    );
  },
);

Container.displayName = "Container";

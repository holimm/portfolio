"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import {
  useSlidePicker,
  type UseSlidePickerProps,
} from "../utils/useSlidePicker";
import { Status } from "../types/slidePicker.types";
import { motion } from "motion/react";
import Image from "next/image";
import { Flex } from "@/components/layout/flex";
import { Card } from "../../card/views/Card";
import { CardBody } from "../../card/views/CardBody";
import { CardHeader } from "../../card/views/CardHeader";
import { Heading, Text } from "../../typography";
import { CardFooter } from "../../card/views/CardFooter";
import { Container } from "@/components/layout/container";

export interface SlidePickerData {}

export interface SlidePickerOptions extends UseSlidePickerProps {
  state?: Status;
}

export interface SlidePickerProps
  extends SlidePickerOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseSlidePickerProps>,
    SlidePickerData {
  asChild?: boolean;
}

export const SlidePicker = forwardRef<HTMLDivElement, SlidePickerProps>(
  (
    {
      className,
      children,
      title,
      state,
      type,
      endContent,
      startContent,
      ...props
    },
    ref,
  ) => {
    const { ...context } = useSlidePicker({
      ref,
      endContent,
      startContent,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <Component
        ref={ctx.slidePickerRef}
        data-comp="slidePicker"
        aria-label={title}
        data-variant={ctx.variant}
        className={`${className} ${ctx.slidePickerStyle()}`}
        {...props}
      >
        <motion.div
          className="scrollbar-hidden relative w-full select-none overflow-y-hidden overflow-x-scroll whitespace-nowrap py-lg"
          ref={ctx.scrollRef}
          onMouseDown={ctx.handleMouseDown}
          onMouseLeave={ctx.handleMouseLeave}
          onMouseUp={ctx.handleMouseUp}
          onMouseMove={ctx.handleMouseMove}
          onTouchStart={ctx.handleTouchDown}
          onTouchEnd={ctx.handleMouseLeave}
          onTouchMove={ctx.handleTouchMove}
          onTouchCancel={ctx.handleMouseUp}
          onScroll={ctx.handleOnScroll}
          style={{
            cursor: ctx.isDown ? "grabbing" : "grab",
          }}
        >
          {ctx.items.map((item: string, index: number) => {
            const isSelected = index === ctx.selectedIndex;
            return (
              <motion.div
                key={index}
                className={`relative inline-block max-h-[40rem] max-w-[16.875rem] cursor-pointer snap-center first:ml-[33.33%] last:mr-[33.33%]`}
                style={{
                  opacity: isSelected ? 1 : 0.5,
                  scale: isSelected ? 1 : 0.9,
                  zIndex: isSelected ? 50 : 40,
                  width: "60%",
                  transition:
                    "opacity 0.3s ease, transform 0.3s ease, width 0.3s ease",
                }}
                onClick={() => ctx.handleItemClick(index)}
              >
                <Card
                  className="border border-solid border-background-lighter"
                  custom="elevated"
                  padding="none"
                >
                  <CardHeader className="pt-md" rounded="none">
                    <Container xspace="md">
                      <Text
                        className="text-nowrap"
                        size="xs"
                        contrast="medium"
                        weight="semibold"
                      >
                        Mẫu xe
                      </Text>
                      <Heading
                        className="text-nowrap"
                        ashtml="h4"
                        weight="semibold"
                      >
                        {item}
                      </Heading>
                    </Container>
                  </CardHeader>
                  <CardBody padding="none">
                    <Flex className="w-full" justify="center" align="center">
                      <Image
                        className="aspect-auto"
                        src={"/images/bikes/sh150.png"}
                        height={500}
                        width={500}
                        alt="SH150 Img"
                        draggable={false}
                      />
                    </Flex>
                  </CardBody>
                  <CardFooter className="pb-md" rounded="none">
                    <Container xspace="md">
                      <Text
                        className="text-nowrap"
                        size="xs"
                        contrast="medium"
                        weight="semibold"
                      >
                        Phiên bản
                      </Text>
                      <Heading
                        className="text-nowrap"
                        ashtml="h4"
                        weight="semibold"
                      >
                        2023
                      </Heading>
                    </Container>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Component>
    );
  },
);

SlidePicker.displayName = "SlidePicker";

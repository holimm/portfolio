"use client";
import React from "react";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useHeader, UseHeaderProps } from "../utils/useHeader";
import { HeaderProvider } from "../utils/useHeaderContext";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/elements/link";
import { Flex } from "@/components/layout/flex";
import {
  HomeIcon,
  CalendarIcon,
  TrophyIcon,
  UserIcon,
  HomeOutlinedIcon,
  CalendarOutlinedIcon,
  TrophyOutlinedIcon,
  UserOutlinedIcon,
} from "@/components/elements/icon/icons";
import { Icon } from "@/components/elements/icon";

export interface HeaderData {}

export interface HeaderOptions extends UseHeaderProps {}

export interface HeaderProps
  extends HeaderOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof HeaderData>,
    HeaderData {
  translation: any;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    { className, variant, children, theme, translation, locale, ...props },
    ref,
  ) => {
    const { ...context } = useHeader({ ref, locale, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <HeaderProvider value={ctx}>
        <Section
          id={props.id}
          variant={"default"}
          comp="header"
          theme={theme}
          className={`${className} ${ctx.headerStyle()}`}
          yspace="xl"
          ref={ctx.headerRef}
          {...props}
        >
          <Container className="h-full">
            <Flex className="h-full" gap="7xl" justify="center" align="center">
              <div className="relative aspect-square h-full w-fit">
                <Link href={"/dashboard"} locale={locale}>
                  <Icon
                    color={`${ctx.currentPage === "dashboard" ? "primary" : "background"}`}
                    contrast={`${ctx.currentPage === "dashboard" ? "medium" : "low"}`}
                    size="xl"
                    icon={
                      ctx.currentPage === "dashboard" ? (
                        <HomeIcon />
                      ) : (
                        <HomeOutlinedIcon />
                      )
                    }
                  />
                </Link>
              </div>
              <div className="relative aspect-square h-full w-fit">
                <Link href={"/booking"} locale={locale}>
                  <Icon
                    color={`${ctx.currentPage === "booking" ? "primary" : "background"}`}
                    contrast={`${ctx.currentPage === "booking" ? "medium" : "low"}`}
                    size="xl"
                    icon={
                      ctx.currentPage === "booking" ? (
                        <CalendarIcon />
                      ) : (
                        <CalendarOutlinedIcon />
                      )
                    }
                  />
                </Link>
              </div>
              <div className="relative aspect-square h-full w-fit">
                <Link href={"/reward"} locale={locale}>
                  <Icon
                    color={`${ctx.currentPage === "reward" ? "primary" : "background"}`}
                    contrast={`${ctx.currentPage === "reward" ? "medium" : "low"}`}
                    size="xl"
                    icon={
                      ctx.currentPage === "reward" ? (
                        <TrophyIcon />
                      ) : (
                        <TrophyOutlinedIcon />
                      )
                    }
                  />
                </Link>
              </div>
              <div className="relative aspect-square h-full w-fit">
                <Link
                  href={"profile"}
                  locale={locale}
                >
                  <Icon
                    color={`${ctx.currentPage === "profile" ? "primary" : "background"}`}
                    contrast={`${ctx.currentPage === "profile" ? "medium" : "low"}`}
                    size="xl"
                    icon={
                      ctx.currentPage === "profile" ? (
                        <UserIcon />
                      ) : (
                        <UserOutlinedIcon />
                      )
                    }
                  />
                </Link>
              </div>
            </Flex>
          </Container>
        </Section>
      </HeaderProvider>
    );
  },
);

Header.displayName = "Header";

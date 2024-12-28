'use client';
import React from 'react';
import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { useHeader, UseHeaderProps } from '../utils/useHeader';
import { HeaderProvider } from '../utils/useHeaderContext';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Link } from '@/components/elements/link';
import { Flex } from '@/components/layout/flex';

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
    ref
  ) => {
    const { ...context } = useHeader({ ref, locale, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <HeaderProvider value={ctx}>
        <Section
          id={props.id}
          variant={'default'}
          comp="header"
          theme={theme}
          className={`${className} ${ctx.headerStyle()}`}
          yspace="xl"
          ref={ctx.headerRef}
          {...props}
        >
          <Container className="h-full">
            <Flex
              className="h-full px-xl"
              gap="6xl"
              justify="between"
              align="center"
            >
              <Flex>Ho Lim</Flex>
              <Flex justify="start" gap="2xl">
                <Link href={'/dashboard'} locale={locale}>
                  About
                </Link>
                <Link href={'/booking'} locale={locale}>
                  Projects
                </Link>
                <Link href={'/reward'} locale={locale}>
                  Contact
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Section>
      </HeaderProvider>
    );
  }
);

Header.displayName = 'Header';

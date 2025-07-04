'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { LayoutProps } from '@/types';
import { Section, Container, Flex } from '@/components/layout';

export const Header = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="header"
        theme={theme}
        className={className}
        yspace="xl"
        ref={ref}
        {...props}
      >
        <Container className="h-full">
          <Flex
            className="px-xl h-full"
            gap="6xl"
            justify="between"
            align="center"
          >
            <Flex>Ho Lim</Flex>
            <Flex justify="start" gap="2xl">
              <Link href={'/dashboard'}>About</Link>
              <Link href={'/booking'}>Projects</Link>
              <Link href={'/reward'}>Contact</Link>
            </Flex>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Header.displayName = 'Header';

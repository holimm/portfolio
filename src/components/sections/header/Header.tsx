'use client';

import React, { forwardRef, useRef } from 'react';
import Link from 'next/link';
import { LayoutProps } from '@/types';
import { Section, Container, Flex } from '@/components/layout';
import { cn } from '@/utils';

export const Header = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const renderLink = (href: string, label: string) => (
      <div
        className="group relative cursor-pointer transition-all duration-500"
        style={{
          animationDelay: `150ms`,
        }}
      >
        <Link href={href}>{label}</Link>
        {/* Hover accent */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-black transition-transform duration-500 group-hover:scale-x-100"></div>
      </div>
    );

    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="header"
        theme={theme}
        className={cn('!fixed top-8 left-0 z-50 w-full !bg-[unset]', className)}
        xspace="none"
        yspace="none"
        ref={ref}
        {...props}
      >
        <Container
          className="h-full rounded-md border border-white/10 bg-white/30 shadow-sm backdrop-blur-md"
          width="fit"
          yspace="md"
          xspace="2xl"
        >
          <Flex
            className="px-xl h-full"
            gap="xl"
            justify="between"
            align="center"
          >
            {renderLink('/dashboard', 'About')}
            {renderLink('/booking', 'Projects')}
            {renderLink('/reward', 'Contact')}
          </Flex>
        </Container>
      </Section>
    );
  }
);

Header.displayName = 'Header';

'use client';

import React, { forwardRef, useRef } from 'react';
import Link from 'next/link';
import { LayoutProps } from '@/types';
import { Section, Container, Flex } from '@/components/layout';

export const Footer = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const footerRef = useRef<HTMLDivElement>(null);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="footer"
        theme={theme}
        className={`top-38 z-10 ${className}`}
        ref={footerRef}
        parallaxDirection="top"
        {...props}
      >
        <Container className="h-full">
          <div className="flex h-full items-end justify-between px-8 py-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">© 2024 Ho Lim</p>
              <p className="text-xs text-gray-600">Full Stack Developer</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-6">
                <Link
                  href="/about"
                  className="text-sm transition-colors hover:text-gray-600"
                >
                  About
                </Link>
                <Link
                  href="/projects"
                  className="text-sm transition-colors hover:text-gray-600"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="text-sm transition-colors hover:text-gray-600"
                >
                  Contact
                </Link>
              </div>

              <div className="flex justify-end gap-4">
                <Link
                  href="https://github.com"
                  className="text-xs transition-colors hover:text-gray-600"
                >
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="text-xs transition-colors hover:text-gray-600"
                >
                  LinkedIn
                </Link>
                <Link
                  href="mailto:contact@holim.dev"
                  className="text-xs transition-colors hover:text-gray-600"
                >
                  Email
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }
);

Footer.displayName = 'Footer';

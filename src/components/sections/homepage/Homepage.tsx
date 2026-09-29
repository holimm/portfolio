'use client';

import React, { forwardRef } from 'react';
import { LayoutProps } from '@/types';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { TechStack } from './TechStack';

export const Homepage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <>
        <Hero />
        {/* Each section stacks above the one before so it can scroll over it */}
        <About className="z-10" />
        <TechStack className="z-20" />
        <Projects className="z-30" />
        {/* <Testimonials /> */}
        <Contact theme="light" className="z-40" />
      </>
    );
  }
);

Homepage.displayName = 'Homepage';

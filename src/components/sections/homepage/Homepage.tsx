'use client';

import React, { forwardRef } from 'react';
import { LayoutProps } from '@/types';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { TechStack } from './TechStack';
import { SubHero } from './SubHero';

export const Homepage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <>
        <Hero />
        <SubHero />
        <About />
        <TechStack />
        <Projects />
        {/* <Testimonials /> */}
        <Contact theme="light" className="z-20" />
      </>
    );
  }
);

Homepage.displayName = 'Homepage';

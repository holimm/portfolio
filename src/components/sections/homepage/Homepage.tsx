'use client';

import React, { forwardRef } from 'react';
import { LayoutProps } from '@/types';
import { Hero } from './Hero';
import { Work } from './Work';
import { Contact } from './Contact';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { Services } from './Services';
import { SubHero } from './SubHero';

export const Homepage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <>
        <Hero />
        <SubHero />
        <About />
        <Services />
        <Work />
        <Testimonials />
        <Contact theme="light" />
      </>
    );
  }
);

Homepage.displayName = 'Homepage';

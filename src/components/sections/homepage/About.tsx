'use client';

import React, { forwardRef, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Typography } from '@/components/elements';
import { Section } from '@/components/layout';
import { HorizontalScroll } from '@/components/interactions';
import { gsap, ScrollTrigger, useGSAP } from '@/config';
import { LayoutProps } from '@/types';
import { cn } from '@/utils';
import CoffeeShop from '@/assets/images/coffee-shop.webp';
import Forest from '@/assets/images/forest.webp';
import {
  ArrowPill,
  CONTAINER,
  META_LABEL,
  MOTION_OK,
  RevealLine,
  SectionHeader,
  createRevealTimeline,
  useScrollReveal,
} from '../common';

// `desktopOnly` facts are dropped on phones, where the next panel already covers them
const ABOUT_FACTS = [
  { label: 'Education', value: 'Saigon University' },
  { label: 'Experience', value: '1+ year in web development' },
  {
    label: 'Off the clock',
    value: 'Piano, coffee & new places',
    desktopOnly: true,
  },
];

/** Each panel fills the pinned viewport, clearing the fixed header like the hero does. */
const PANEL = cn(
  CONTAINER,
  'flex h-full flex-col justify-between gap-8 pt-24 pb-8 md:pt-32 md:pb-10'
);

// One screen that arrives as a single sheet, so it reveals as one sequence
const IntroPanel = () => (
  <div data-reveal-group className={PANEL}>
    <SectionHeader
      index="01"
      label="About"
      aside="Nguyen Lim Thai Ho"
      title={
        'I’m Ho Lim, a web developer based in Ho Chi Minh City, Viet\u00a0Nam.'
      }
    />

    <div className="grid gap-10 md:grid-cols-3 md:gap-x-6">
      {/* First in the markup so it leads the reveal; the order classes keep the facts on the left */}
      <div className="order-1 flex flex-col items-start gap-8 md:order-2 md:col-span-2 md:justify-end">
        {/* Revealed through a wrapper: Typography's CSS transition would fight the GSAP fade */}
        <div data-reveal-fade>
          <Typography
            contrast="high"
            className="max-w-[38ch] text-lg leading-snug md:text-2xl"
          >
            I graduated from Saigon University and have over a year of
            experience in website development. I’m passionate about creating
            modern, high-performance websites and bringing interfaces to life
            through thoughtful design and animation.
          </Typography>
        </div>
        <ArrowPill
          data-reveal-fade
          href="/file/NguyenLimThaiHo_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          My resume
        </ArrowPill>
      </div>

      <dl className="order-2 grid grid-cols-2 gap-x-6 gap-y-5 md:order-1 md:grid-cols-1">
        {ABOUT_FACTS.map((fact) => (
          <div
            key={fact.label}
            data-reveal-fade
            className={cn(
              'border-contrast-lowest flex-col gap-1.5 border-t pt-3',
              fact.desktopOnly ? 'hidden md:flex' : 'flex'
            )}
          >
            <dt className={META_LABEL}>{fact.label}</dt>
            <dd className="text-contrast-highest text-sm md:text-base">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>

    <div
      data-reveal-fade
      className="text-contrast-medium flex items-center justify-between text-sm md:text-base"
    >
      <span>Get to know me</span>
      <span className="flex items-center gap-2">
        Keep scrolling
        <ArrowRight className="size-4" />
      </span>
    </div>
  </div>
);

const Figure = ({
  src,
  caption,
  className,
}: {
  src: StaticImageData;
  caption: string;
  className?: string;
}) => (
  <figure className={cn('flex flex-col gap-3', className)}>
    <div
      data-reveal-image
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-300 md:max-h-[48svh]"
    >
      <Image
        src={src}
        alt={caption}
        fill
        sizes="(max-width: 767px) 50vw, 25vw"
        className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
      />
    </div>
    <figcaption data-reveal-fade className={META_LABEL}>
      {caption}
    </figcaption>
  </figure>
);

// Scrolled in from the side, so it reveals itself once it slides into view
const LifePanel = () => (
  <div data-reveal-manual className={PANEL}>
    <div
      data-reveal-fade
      className="border-contrast-lowest text-contrast-medium flex items-center justify-between gap-4 border-t pt-3 text-sm md:text-base"
    >
      <span>(Outside of work)</span>
      <span>Piano · Coffee · New places</span>
    </div>

    <div className="grid flex-1 grid-cols-2 content-center gap-x-4 gap-y-8 md:grid-cols-4 md:content-stretch md:gap-x-6">
      <RevealLine className="col-span-2 self-center md:col-start-2 md:row-start-1">
        <Typography
          ashtml="h3"
          weight="medium"
          contrast="highest"
          className="text-[1.75rem] leading-[1.02] tracking-[-0.04em] md:text-4xl 2xl:text-5xl"
        >
          Outside of work, I love exploring new places, trying different
          coffees, and spending time at the piano.
        </Typography>
      </RevealLine>
      <Figure
        src={CoffeeShop}
        caption="Fig. 01 — Coffee stops"
        className="md:col-start-1 md:row-start-1 md:self-start"
      />
      <Figure
        src={Forest}
        caption="Fig. 02 — New places"
        className="md:col-start-4 md:row-start-1 md:self-end"
      />
    </div>

    <div
      data-reveal-fade
      className="text-contrast-medium flex items-center justify-between gap-4 text-sm md:text-base"
    >
      <span>It’s my favourite way to relax and find inspiration.</span>
      <span className="hidden md:inline">(End of about)</span>
    </div>
  </div>
);

const panels = [
  { key: 'intro', content: <IntroPanel /> },
  { key: 'life', content: <LifePanel /> },
];

export const About = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useScrollReveal(sectionRef);

    // The second panel only slides into view halfway through the pinned scroll
    useGSAP(
      () => {
        const section = sectionRef.current;
        const panel = section?.querySelector('[data-reveal-manual]');
        if (!section || !panel) return;

        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
          const reveal = createRevealTimeline(panel);
          ScrollTrigger.create({
            trigger: section,
            start: () => `top+=${window.innerHeight * 0.55} top`,
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => reveal.play(),
          });
        });

        return () => mm.revert();
      },
      { scope: sectionRef }
    );

    return (
      <Section
        id="about"
        variant={'default'}
        comp="about"
        theme={theme}
        layout="block"
        className={className}
        yspace="none"
        xspace="none"
        ref={sectionRef}
        {...props}
      >
        <HorizontalScroll sections={panels} />
      </Section>
    );
  }
);

About.displayName = 'About';

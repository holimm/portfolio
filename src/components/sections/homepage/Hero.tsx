'use client';

import React, { forwardRef, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { Typography } from '@/components/elements';
import { Section } from '@/components/layout';
import { Globe, type GlobeJourney } from '@/components/interactions';
import { getPinType, getScrub, gsap, smoothScrollTo, useGSAP } from '@/config';
import { LayoutProps } from '@/types';
import { cn } from '@/utils';
import HeroImage from '@/assets/images/hero-image.webp';
import PortraitImage from '@/assets/images/sub-hero-intro.webp';
import {
  ArrowPill,
  Availability,
  CONTAINER,
  LocalTime,
  RevealLine,
} from '../common';

/**
 * Viewport heights the intro stays pinned for while the timeline scrubs. The pin releases as soon
 * as the landing content settles, so the next section follows without dead scroll.
 */
const INTRO_SCROLL_LENGTH = { desktop: 4.2, mobile: 3.05, reducedMotion: 1.9 };

/**
 * How far each landing layer lags behind the page, per pixel scrolled, while the next section
 * scrolls over it. Deeper layers lag more, so the next section overtakes the band and the band
 * overtakes the hero, keeping all three attached as they stack up.
 */
const EXIT_LAG = { hero: 0.44, photo: 0.33, band: 0.17 };

/** Seconds for the marquee to travel one full copy of its items. */
const MARQUEE_DURATION = 32;

/** Taglines the name alternates with around the marquee band. */
const MARQUEE_TAGLINES = ['Creative Developer', 'Based in Saigon'];

// `desktopOnly` items are dropped on phones, where the intro captions already carry them
const HERO_META = [
  {
    label: 'Based in',
    value: 'Ho Chi Minh City, Viet Nam',
    desktopOnly: true,
  },
  { label: 'Local time', value: <LocalTime /> },
  {
    label: 'Availability',
    value: <Availability />,
  },
  { label: 'Focus', value: 'Web design & development', desktopOnly: true },
];

/** Start value of `--bloom`: the soft edge sits fully inside the centre point. */
const BLOOM_HIDDEN = -20;

// A radial mask whose opaque radius (percent of the half-diagonal) follows `--bloom`
const BLOOM_MASK =
  'radial-gradient(circle at 50% 50%, #000 calc(var(--bloom) * 1%), transparent calc(var(--bloom) * 1% + 18%))';
const BLOOM_STYLE = {
  '--bloom': BLOOM_HIDDEN,
  maskImage: BLOOM_MASK,
  WebkitMaskImage: BLOOM_MASK,
} as React.CSSProperties;

/** A ringed "C" between marquee items. */
const MarqueeSeparator = () => (
  <span className="text-contrast-lower inline-flex size-[1.05em] shrink-0 items-center justify-center rounded-full border-[0.045em] border-current">
    <span className="text-[0.8em] leading-none">C</span>
  </span>
);

/** One full copy of the marquee items; two copies back to back loop seamlessly. */
const MarqueeCopy = () => (
  <div className="flex shrink-0 items-center gap-[0.3em] pr-[0.3em]">
    {MARQUEE_TAGLINES.map((tagline) => (
      <React.Fragment key={tagline}>
        <span>Ho Lim</span>
        <MarqueeSeparator />
        <span>{tagline}</span>
        <MarqueeSeparator />
      </React.Fragment>
    ))}
  </div>
);

/** Full-bleed band carrying the name at the foot of the hero; it slides up over the photo. */
const HeroMarquee = () => (
  <div
    data-parallax="band"
    data-intro="band"
    data-theme="dark"
    aria-hidden="true"
    className="text-contrast-highest relative z-10 bg-[linear-gradient(to_bottom,var(--color-gray-800),var(--color-black))] py-5 select-none md:py-8"
  >
    <div className="overflow-hidden border-t border-white/15 pt-4 pb-2 md:pt-6 md:pb-4">
      <div data-reveal>
        <div
          data-marquee-track
          className="flex w-max text-[length:max(3.25rem,min(9vw,13svh))] leading-none font-medium tracking-[-0.035em] whitespace-nowrap will-change-transform"
        >
          <MarqueeCopy />
          <MarqueeCopy />
        </div>
      </div>
    </div>
  </div>
);

export const Hero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className }, ref) => {
    const stageRef = useRef<HTMLDivElement>(null);
    // Tweened by the timeline below and read by the globe every frame
    const journeyRef = useRef<GlobeJourney>({ travel: 0, zoom: 0 });

    const handleScrollToSection = useCallback((sectionId: string) => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) smoothScrollTo(section);
    }, []);

    // One scrubbed timeline drives the globe, the white transition and the content reveal
    useGSAP(() => {
      const stage = stageRef.current;
      if (!stage) return;

      const q = gsap.utils.selector(stage);
      const journey = journeyRef.current;
      const mm = gsap.matchMedia();

      // Rebuilt whenever a condition flips; the callback only runs while at least one matches
      mm.add(
        {
          isMobile: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMobile, reducedMotion } = context.conditions as {
            isMobile: boolean;
            reducedMotion: boolean;
          };
          const scrollLength = reducedMotion
            ? INTRO_SCROLL_LENGTH.reducedMotion
            : isMobile
              ? INTRO_SCROLL_LENGTH.mobile
              : INTRO_SCROLL_LENGTH.desktop;
          const shift = reducedMotion ? 0 : 24;
          const scrub = getScrub();

          const timeline = gsap.timeline({
            defaults: { ease: 'none', duration: 1 },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: () => `+=${window.innerHeight * scrollLength}`,
              pin: true,
              pinType: getPinType(),
              scrub,
              // Rebuilt pins (e.g. after a breakpoint change) must still be measured before later triggers
              refreshPriority: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            // 1. Leave the overview: the hint clears as the globe starts turning east
            .to(
              q('[data-intro="hint"]'),
              { autoAlpha: 0, y: -shift / 2, duration: 0.8 },
              0
            )
            .to(journey, { travel: 1, duration: 6, ease: 'power2.inOut' }, 0)
            .fromTo(
              q('[data-intro="travel"]'),
              { autoAlpha: 0, y: shift },
              { autoAlpha: 1, y: 0 },
              1
            )
            .to(q('[data-intro="travel"]'), { autoAlpha: 0, y: -shift }, 3.4)

            // 2. Approach Viet Nam while the rotation settles
            .to(journey, { zoom: 1, duration: 4.5, ease: 'power1.inOut' }, 2.5)
            .fromTo(
              q('[data-intro="arrival"]'),
              { autoAlpha: 0, y: shift },
              { autoAlpha: 1, y: 0 },
              5.2
            )
            .to(
              q('[data-intro="arrival"]'),
              { autoAlpha: 0, y: -shift, duration: 0.8 },
              7.4
            )

            // 3. Dive through: keep descending while white light opens from the focus point
            .to(journey, { zoom: 1.6, duration: 2.5, ease: 'power2.in' }, 7)
            .fromTo(
              q('[data-intro="glow"]'),
              { autoAlpha: 0, scale: 0.6 },
              { autoAlpha: 1, scale: 1.2, duration: 1.4, ease: 'power1.in' },
              7.2
            )
            .fromTo(
              q('[data-intro="bloom"]'),
              { '--bloom': BLOOM_HIDDEN },
              { '--bloom': 100, duration: 1.6, ease: 'power2.in' },
              7.9
            )

            // 4. The white screen becomes the landing content
            .set(q('[data-intro="content"]'), { autoAlpha: 1 }, 9.5)
            .fromTo(
              q('[data-intro="photo"]'),
              { autoAlpha: 0, scale: reducedMotion ? 1 : 1.08 },
              { autoAlpha: 1, scale: 1, duration: 2, ease: 'power2.out' },
              9.5
            )
            .fromTo(
              q('[data-intro="band"]'),
              reducedMotion ? { autoAlpha: 0 } : { yPercent: 100 },
              {
                ...(reducedMotion ? { autoAlpha: 1 } : { yPercent: 0 }),
                duration: 1.4,
                ease: 'power3.out',
              },
              9.5
            )
            .fromTo(
              q('[data-reveal]'),
              reducedMotion ? { autoAlpha: 0 } : { yPercent: 110 },
              {
                ...(reducedMotion ? { autoAlpha: 1 } : { yPercent: 0 }),
                duration: 1.4,
                ease: 'power3.out',
                stagger: 0.14,
              },
              9.6
            )
            .fromTo(
              q('[data-reveal-fade]'),
              { autoAlpha: 0, y: shift / 2 },
              { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
              10.3
            );

          if (reducedMotion) return;

          const loop = gsap.to(q('[data-marquee-track]'), {
            xPercent: -50,
            duration: MARQUEE_DURATION,
            ease: 'none',
            repeat: -1,
          });

          // 5. Once released, the next section scrolls over the band while the band overtakes the hero
          const pin = timeline.scrollTrigger!;
          const lag = (amount: number) => () => window.innerHeight * amount;
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                start: () => pin.end,
                end: () => pin.end + window.innerHeight,
                scrub,
                invalidateOnRefresh: true,
                onLeave: () => loop.pause(),
                onEnterBack: () => loop.play(),
              },
            })
            .to(q('[data-parallax="hero"]'), { y: lag(EXIT_LAG.hero) })
            .to(q('[data-parallax="photo"]'), { y: lag(EXIT_LAG.photo) }, 0)
            .to(q('[data-parallax="band"]'), { y: lag(EXIT_LAG.band) }, 0);
        }
      );

      return () => mm.revert();
    });

    return (
      <Section
        id="home"
        comp="home"
        theme="dark"
        layout="block"
        className={cn('relative', className)}
        yspace="none"
        xspace="none"
        ref={ref}
      >
        <div
          ref={stageRef}
          className="relative isolate h-lvh w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,var(--color-gray-800)_0%,var(--color-gray-950)_45%,var(--color-black)_100%)]"
        >
          {/* Globe */}
          <div aria-hidden="true" className="absolute inset-0 z-0">
            <Globe theme="dark" journeyRef={journeyRef} />
            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent from-45% to-black/60" />
          </div>

          {/* Light gathering over the focus point before the white opens */}
          <div
            aria-hidden="true"
            data-intro="glow"
            className="pointer-events-none invisible absolute inset-0 z-10 m-auto size-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_65%)] opacity-0"
          />

          {/* Story captions, sized to the small viewport so mobile toolbars never cover them */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-svh">
            <div
              data-intro="travel"
              className="invisible absolute inset-x-5 bottom-24 opacity-0 md:inset-x-10 md:bottom-28 2xl:inset-x-14"
            >
              <Typography
                ashtml="h2"
                weight="light"
                className="max-w-[16ch] text-4xl leading-[1.05] md:text-5xl 2xl:text-6xl"
              >
                Crafting for the web, for people anywhere.
              </Typography>
            </div>

            <div
              data-intro="arrival"
              className="invisible absolute inset-x-5 bottom-24 flex flex-col gap-4 opacity-0 md:inset-x-10 md:bottom-28 2xl:inset-x-14"
            >
              <Typography
                ashtml="h2"
                weight="light"
                className="max-w-[16ch] text-4xl leading-[1.05] md:text-5xl 2xl:text-6xl"
              >
                From Ho Chi Minh City, Viet Nam.
              </Typography>
              <Typography
                ashtml="span"
                size="sm"
                contrast="medium"
                letterSpacing="wider"
                className="uppercase tabular-nums"
              >
                10.77° N · 106.70° E
              </Typography>
            </div>

            <div
              data-intro="hint"
              className="text-contrast-medium absolute inset-x-5 bottom-8 flex items-center justify-between text-xs tracking-wider uppercase md:inset-x-10 md:bottom-10 md:text-sm 2xl:inset-x-14"
            >
              <span>Portfolio · {new Date().getFullYear()}</span>
              <span className="flex items-center gap-2">
                Scroll to explore
                <ArrowDown className="size-4 animate-bounce" />
              </span>
            </div>
          </div>

          {/* White screen opening from the centre with a soft edge */}
          <div
            aria-hidden="true"
            data-intro="bloom"
            className="absolute inset-0 z-30 bg-white"
            style={BLOOM_STYLE}
          />

          {/* Landing content, revealed once the screen is white */}
          <div
            data-intro="content"
            data-theme="light"
            className="bg-background invisible absolute inset-0 z-40 overflow-hidden opacity-0"
          >
            {/* Background photo behind both the hero and the band, so the band always sits on it */}
            <div
              aria-hidden="true"
              data-parallax="photo"
              className="absolute inset-0"
            >
              <div data-intro="photo" className="relative size-full">
                <Image
                  src={HeroImage}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-bottom opacity-40 grayscale"
                />
                {/* Fades only the top, keeping the nav and headline legible */}
                <div className="from-background via-background/50 absolute inset-0 bg-linear-to-b via-35% to-transparent to-70%" />
              </div>
            </div>

            <h1 className="sr-only">
              Ho Lim, creative developer &amp; designer based in Saigon
            </h1>

            {/* Fills the stage so the band sits flush against the next section */}
            <div className="relative flex h-full flex-col">
              <div
                data-parallax="hero"
                className="relative flex flex-1 flex-col overflow-hidden"
              >
                <div
                  className={cn(
                    CONTAINER,
                    'flex flex-1 flex-col justify-between gap-8 pt-24 pb-6 md:pt-32 md:pb-8'
                  )}
                >
                  <div className="grid gap-8 md:grid-cols-3 md:gap-x-6">
                    <div
                      data-reveal-fade
                      className="relative hidden aspect-[3/2] w-full max-w-72 overflow-hidden rounded-sm md:block"
                    >
                      <Image
                        src={PortraitImage}
                        alt="Portrait of Ho Lim"
                        fill
                        sizes="18rem"
                        className="object-cover object-[50%_35%] grayscale"
                      />
                    </div>

                    <div className="flex flex-col gap-3 md:col-span-2 md:gap-4">
                      {/* Faded through a wrapper: Typography's CSS transition would fight GSAP */}
                      <div data-reveal-fade>
                        <Typography
                          ashtml="span"
                          contrast="medium"
                          className="text-sm md:text-base"
                        >
                          (Hello there)
                        </Typography>
                      </div>
                      <RevealLine>
                        <Typography
                          ashtml="paragraph"
                          weight="medium"
                          contrast="highest"
                          className="max-w-[26ch] text-[2rem] leading-[0.95] tracking-[-0.045em] md:text-5xl 2xl:text-6xl"
                        >
                          Full-stack developer &amp; designer crafting
                          interactive, considered experiences for the web.
                        </Typography>
                      </RevealLine>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 md:gap-8">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
                      {HERO_META.map((item) => (
                        <div
                          key={item.label}
                          data-reveal-fade
                          className={cn(
                            'border-contrast-lowest flex-col gap-1.5 border-t pt-3',
                            item.desktopOnly ? 'hidden md:flex' : 'flex'
                          )}
                        >
                          <dt className="text-contrast-medium text-xs tracking-wider uppercase">
                            {item.label}
                          </dt>
                          <dd className="text-contrast-highest text-sm md:text-base">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div
                      data-reveal-fade
                      className="text-contrast-medium grid grid-cols-2 items-center gap-6 text-sm md:grid-cols-3 md:text-base"
                    >
                      <span>/ {new Date().getFullYear()} /</span>
                      <span className="hidden items-center gap-2 md:flex">
                        Scroll down
                        <ArrowDown className="size-4" />
                      </span>
                      <ArrowPill
                        onClick={() => handleScrollToSection('contact')}
                        className="justify-self-end"
                      >
                        Get in touch
                      </ArrowPill>
                    </div>
                  </div>
                </div>
              </div>

              <HeroMarquee />
            </div>
          </div>
        </div>
      </Section>
    );
  }
);

Hero.displayName = 'Hero';

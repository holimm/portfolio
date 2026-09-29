'use client';

import type { RefObject } from 'react';
import { getScrub, gsap, ScrollTrigger, useGSAP } from '@/config';

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * The hero's reveal vocabulary, shared so every section enters the same way. GSAP writes into the
 * vars it is given (e.g. `parent`), so these are only ever handed over as fresh copies.
 */
const REVEAL = {
  // Lines rise out of their clip (see `RevealLine`)
  line: {
    selector: '[data-reveal]',
    from: { yPercent: 110 },
    to: { yPercent: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 },
  },
  // Supporting content fades up
  fade: {
    selector: '[data-reveal-fade]',
    from: { autoAlpha: 0, y: 24 },
    to: { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.08 },
  },
  // Image frames unmask from the bottom
  image: {
    selector: '[data-reveal-image]',
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4,
      ease: 'power3.inOut',
      stagger: 0.12,
    },
  },
} satisfies Record<
  string,
  { selector: string; from: gsap.TweenVars; to: gsap.TweenVars }
>;

/** Revealed by their section's own code. */
const MANUAL = '[data-reveal-manual]';
/** Revealed together, as one sequence, once the group's top comes into view. */
const GROUP = '[data-reveal-group]';

/** Marked elements inside `root` that no ancestor matching `claimedBy` has taken over. */
const collect = (root: Element, selector: string, claimedBy = MANUAL) =>
  Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (element) => !element.closest(claimedBy)
  );

/**
 * A paused timeline revealing everything marked inside `root`, for sections that decide when
 * their content enters themselves (e.g. a horizontally scrolled panel).
 */
export const createRevealTimeline = (root: Element) => {
  const timeline = gsap.timeline({ paused: true });

  Object.values(REVEAL).forEach(({ selector, from, to }, order) => {
    const targets = root.querySelectorAll(selector);
    if (targets.length) {
      timeline.fromTo(targets, { ...from }, { ...to }, order * 0.15);
    }
  });

  return timeline;
};

/**
 * Reveals marked content as it scrolls into view: `[data-reveal]` lines rise, `[data-reveal-fade]`
 * elements fade up and `[data-reveal-image]` frames unmask while their image drifts inside the
 * frame. Content under `[data-reveal-group]` enters as one sequence as soon as the group starts to
 * appear, so nothing low in it waits on its own; content under `[data-reveal-manual]` is left to its
 * section.
 */
export const useScrollReveal = (scope: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        collect(root, GROUP).forEach((group) => {
          const timeline = createRevealTimeline(group);
          ScrollTrigger.create({
            trigger: group,
            start: 'clamp(top 85%)',
            once: true,
            onEnter: () => {
              timeline.play();
            },
          });
        });

        Object.values(REVEAL).forEach(({ selector, from, to }) => {
          const targets = collect(root, selector, `${MANUAL}, ${GROUP}`);
          if (!targets.length) return;

          // Lines are measured by their clip, which never moves: measuring the line itself would
          // include its hidden offset and could push its start past the end of the page
          const triggers: Element[] = targets.map((target) =>
            selector === REVEAL.line.selector && target.parentElement
              ? target.parentElement
              : target
          );

          gsap.set(targets, { ...from });
          ScrollTrigger.batch(triggers, {
            start: 'clamp(top 90%)',
            once: true,
            onEnter: (batch) =>
              gsap.to(
                batch.map((trigger) => targets[triggers.indexOf(trigger)]),
                { ...to, overwrite: true }
              ),
          });
        });

        // Images sit slightly oversized so they can drift within their frame as it scrolls past
        collect(root, REVEAL.image.selector).forEach((frame) => {
          const image = frame.querySelector('img');
          if (!image) return;

          gsap.fromTo(
            image,
            { yPercent: -6, scale: 1.14 },
            {
              yPercent: 6,
              scale: 1.14,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: getScrub(),
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope }
  );
};

/** How far the content lags behind the page, per pixel scrolled, while it is covered. */
const EXIT_LAG = 0.4;

/**
 * Hands over to the next section the way the hero does: while the next section scrolls over this
 * one, `[data-exit-content]` lags behind the page and `[data-exit-shade]` fades in towards the
 * incoming section's tone. The next section must be stacked above this one.
 */
export const useStackedExit = (scope: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const content = root.querySelector('[data-exit-content]');
      const shade = root.querySelector('[data-exit-shade]');
      if (!content) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: getScrub(),
            invalidateOnRefresh: true,
          },
        });

        timeline.to(content, { y: () => window.innerHeight * EXIT_LAG });
        if (shade) {
          timeline.fromTo(shade, { autoAlpha: 0 }, { autoAlpha: 0.6 }, 0);
        }
      });

      return () => mm.revert();
    },
    { scope }
  );
};

'use client';

import React, { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/config';
import { subscribeToAssetTasks } from '@/utils';

/** Shortest time the loader shows, so a cached visit doesn't flash it. */
const MIN_DURATION = 900;
/** Longest the page waits for assets; past this it opens with whatever has arrived. */
const MAX_WAIT = 15000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Loads an image now, even a lazy one, and settles once it is decoded or has failed. */
const whenImageReady = (image: HTMLImageElement) => {
  image.loading = 'eager';
  const decoded = () => image.decode().catch(() => undefined);
  if (image.complete) return decoded();

  return new Promise<void>((resolve) => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => resolve(), { once: true });
  }).then(decoded);
};

/** Clips its child so a line can slide out of view. */
const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="block overflow-hidden">
    <span data-loader-line className="block">
      {children}
    </span>
  </span>
);

/**
 * Covers the page from the first paint until its fonts, images and registered assets (see
 * `createAssetTask`) have loaded, counting up as they arrive, then slides away.
 */
export const PageLoader = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const html = document.documentElement;
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // The intro is scroll-driven, so a reload starts from the top instead of mid-page; this also
      // stops ScrollTrigger restoring its own remembered position
      ScrollTrigger.clearScrollMemory('manual');
      window.scrollTo(0, 0);
      html.style.overflow = 'hidden';

      const counter = q('[data-loader-counter]')[0];
      const bar = q('[data-loader-bar]')[0];
      const shown = { progress: 0 };
      const render = () => {
        counter.textContent = String(Math.round(shown.progress * 100)).padStart(
          3,
          '0'
        );
        gsap.set(bar, { scaleX: shown.progress });
      };
      const showProgress = (progress: number, duration = 0.6) =>
        gsap.to(shown, {
          progress,
          duration,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: render,
        });

      const pending: Promise<unknown>[] = [];
      let settled = 0;
      const track = (asset: Promise<unknown>) => {
        pending.push(asset);
        void asset
          .catch(() => undefined)
          .then(() => {
            settled += 1;
            showProgress(settled / pending.length);
          });
      };

      let cancelled = false;
      let unsubscribe = () => {};
      const startedAt = performance.now();

      // Wait a frame so every section has mounted and registered its assets
      const frame = requestAnimationFrame(async () => {
        track(document.fonts.ready);
        document.querySelectorAll('img').forEach((image) => {
          track(whenImageReady(image));
        });
        unsubscribe = subscribeToAssetTasks(track);

        // Assets can register while others load (e.g. a lazily loaded chunk), so settle them all
        const allSettled = async () => {
          let count;
          do {
            count = pending.length;
            await Promise.allSettled([...pending]);
          } while (count !== pending.length);
        };
        await Promise.race([allSettled(), wait(MAX_WAIT)]);
        await wait(MIN_DURATION - (performance.now() - startedAt));
        if (cancelled) return;

        unsubscribe();
        await showProgress(1, 0.4);
        if (cancelled) return;

        const exit = gsap.timeline({
          onComplete: () => {
            html.style.overflow = '';
            // Fonts and images have settled, so measure the scroll-driven layouts again
            ScrollTrigger.refresh();
            setDone(true);
          },
        });

        if (reducedMotion) {
          exit.to(root, { autoAlpha: 0, duration: 0.4 });
        } else {
          exit
            .to(q('[data-loader-line]'), {
              yPercent: -110,
              duration: 0.7,
              ease: 'power3.in',
              stagger: 0.05,
            })
            .to(bar, { scaleX: 0, transformOrigin: 'right center' }, '<')
            .to(
              root,
              { yPercent: -100, duration: 1.1, ease: 'power4.inOut' },
              '-=0.2'
            );
        }
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
        unsubscribe();
        html.style.overflow = '';
      };
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-page-loader
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[radial-gradient(ellipse_at_center,var(--color-gray-800)_0%,var(--color-gray-950)_45%,var(--color-black)_100%)] text-white"
    >
      {/* Mirrors the header, so its logo is already in place when the loader lifts */}
      <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7 2xl:px-14">
        <Line>
          <span className="font-oldschool-grotesk-compact text-xl leading-none font-bold tracking-tight md:text-2xl">
            HO LIM
          </span>
        </Line>
        <Line>
          <span className="text-sm text-white/60 md:text-base">(Loading)</span>
        </Line>
      </div>

      <div className="flex flex-col gap-4 px-5 pb-8 md:gap-6 md:px-10 md:pb-10 2xl:px-14">
        <div className="flex items-end justify-between gap-6">
          <Line>
            <span className="block max-w-[18ch] text-sm text-white/60 md:text-base">
              Preparing the globe, type and imagery
            </span>
          </Line>
          <Line>
            <span
              data-loader-counter
              className="font-oldschool-grotesk-compressed block pt-[0.08em] text-[length:min(30vw,34vh)] leading-[0.8] font-bold tracking-tight tabular-nums"
            >
              000
            </span>
          </Line>
        </div>

        <div className="h-px w-full bg-white/15">
          <div
            data-loader-bar
            className="h-full w-full origin-left scale-x-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

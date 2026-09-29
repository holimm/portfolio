'use client';

import {
  forwardRef,
  HTMLAttributes,
  PointerEvent,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useTypography, UseTypographyProps } from '../utils/Typography.Util';
import { Flex } from '@/components/layout';
import { defaultConfig } from 'tailwind-variants';
import { gsap, useGSAP } from '@/config';
import { useManagedAnimation } from '@/hooks';
import { Easing } from '@/types';

export interface TypographyProps
  extends UseTypographyProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  animation?: {
    type: 'split-words' | 'split-chars';
    duration?: number;
    delay?: number;
    ease?: Easing;
    hover?:
      | boolean
      | {
          text: string;
          duration?: number;
          delay?: number;
          ease?: Easing;
          stagger?: number;
        };
  };
}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      className,
      children,
      letterSpacing,
      fontFamily,
      wrap,
      size,
      weight,
      variant,
      ashtml,
      color,
      animation,
      ...props
    }: TypographyProps,
    ref
  ) => {
    const { defaultConfig, ...context } = useTypography({
      ref,
      letterSpacing,
      wrap,
      size,
      weight,
      variant,
      ashtml,
      color,
      fontFamily,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);

    const containerRef = useRef<HTMLDivElement>(null);
    const { play } = useManagedAnimation();
    // Which text is rendered; switches only after the previous text has exited
    const [isHovered, setIsHovered] = useState(false);
    const isHoveredRef = useRef(false);

    const hasHoverTextAnimation =
      animation?.type &&
      typeof animation.hover === 'object' &&
      animation.hover.text;
    const hoverText = hasHoverTextAnimation
      ? (animation.hover as { text: string }).text
      : '';

    const currentText = useMemo(
      () => (isHovered && hasHoverTextAnimation ? hoverText : children),
      [isHovered, hasHoverTextAnimation, hoverText, children]
    );

    const currentAnimationProps = useMemo(
      () => (isHovered && hasHoverTextAnimation ? animation.hover : animation),
      [isHovered, hasHoverTextAnimation, animation]
    );

    const { baseDuration, baseDelay, baseEase, baseStagger } = useMemo(
      () => ({
        baseDuration:
          typeof currentAnimationProps === 'object'
            ? (currentAnimationProps.duration ?? 0.4)
            : 0.4,
        baseDelay:
          typeof currentAnimationProps === 'object'
            ? (currentAnimationProps.delay ?? 0.1)
            : 0.1,
        baseEase:
          typeof currentAnimationProps === 'object'
            ? currentAnimationProps.ease
            : undefined,
        baseStagger:
          (currentAnimationProps as { stagger?: number })?.stagger ??
          (animation?.type === 'split-words' ? 0.1 : 0.04),
      }),
      [currentAnimationProps, animation?.type]
    );

    const tweenVars = useMemo<gsap.TweenVars>(
      () => ({
        delay: baseDelay,
        duration: baseDuration,
        ease: baseEase ?? 'easeOut',
        stagger: baseStagger,
      }),
      [baseDelay, baseDuration, baseEase, baseStagger]
    );

    const getItems = useCallback(
      () =>
        gsap.utils.toArray<HTMLElement>(
          '[data-split-item]',
          containerRef.current
        ),
      []
    );

    // Slide the rendered words/chars in on mount and after every text swap
    useGSAP(
      () => {
        if (!animation?.type) return;
        play(() =>
          gsap.fromTo(
            getItems(),
            { y: 0, yPercent: 100 },
            { yPercent: 0, ...tweenVars }
          )
        );
      },
      { dependencies: [isHovered, animation?.type] }
    );

    const handleHoverChange = useCallback(
      (event: PointerEvent, hovering: boolean) => {
        if (event.pointerType === 'touch') return;

        // Hover reverted before the swap happened: bring the current text back
        if (hovering === isHoveredRef.current) {
          play(() => gsap.to(getItems(), { yPercent: 0, ...tweenVars }));
          return;
        }

        play(() =>
          gsap.to(getItems(), {
            yPercent: -100,
            ...tweenVars,
            onComplete: () => {
              isHoveredRef.current = hovering;
              setIsHovered(hovering);
            },
          })
        );
      },
      [play, getItems, tweenVars]
    );

    const renderAnimatedText = useCallback(
      (textToAnimate: string, isHovering: boolean) => {
        if (!textToAnimate || typeof textToAnimate !== 'string') return null;

        const items =
          animation?.type === 'split-words'
            ? textToAnimate.split(' ')
            : Array.from(textToAnimate);

        return (
          <Flex
            className="inline-block h-fit overflow-hidden"
            height="full"
            width="full"
            align="center"
            gap="none"
          >
            {items.map((item, i) => (
              <span
                key={isHovering ? `hover-${i}` : `initial-${i}`}
                className="my-0 inline-block py-0"
                // Hidden initial state is server-rendered to avoid a flash before hydration
                style={{ transform: 'translateY(100%)' }}
                data-split-item
              >
                <defaultConfig.Component
                  data-comp="typography"
                  data-variant={ctx.variant}
                  className={`${className} ${ctx.typographyStyle()}`}
                  ref={ctx.typographyRef}
                  {...props}
                >
                  {animation?.type === 'split-chars' && item === ' '
                    ? '\u00A0'
                    : item}
                  {animation?.type === 'split-words' && i !== items.length - 1
                    ? '\u00A0'
                    : ''}
                </defaultConfig.Component>
              </span>
            ))}
          </Flex>
        );
      },
      [animation?.type, className, ctx, props]
    );

    if (animation?.type) {
      if (typeof children !== 'string') {
        throw new Error(
          'Typography: Animation with split-words/chars only works with string children.'
        );
      }

      return (
        <div
          ref={containerRef}
          className="inline-block h-fit overflow-hidden"
          onPointerEnter={
            hasHoverTextAnimation
              ? (event) => handleHoverChange(event, true)
              : undefined
          }
          onPointerLeave={
            hasHoverTextAnimation
              ? (event) => handleHoverChange(event, false)
              : undefined
          }
        >
          {renderAnimatedText(currentText as string, isHovered)}
        </div>
      );
    }

    return (
      <defaultConfig.Component
        data-comp="typography"
        data-variant={ctx.variant}
        className={`${className} ${ctx.typographyStyle()}`}
        ref={ctx.typographyRef}
        {...props}
      >
        {children}
      </defaultConfig.Component>
    );
  }
);

Typography.displayName = 'Typography';

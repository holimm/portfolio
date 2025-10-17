'use client';

import {
  forwardRef,
  HTMLAttributes,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTypography, UseTypographyProps } from '../utils/Typography.Util';
import {
  AnimatePresence,
  EasingDefinition,
  motion,
  useAnimation,
} from 'framer-motion';
import { Flex } from '@/components/layout';
import { defaultConfig } from 'tailwind-variants';

export interface TypographyProps
  extends UseTypographyProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  animation?: {
    type: 'split-words' | 'split-chars';
    duration?: number;
    delay?: number;
    ease?: EasingDefinition;
    hover?:
      | boolean
      | {
          text: string;
          duration?: number;
          delay?: number;
          ease?: EasingDefinition;
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

    const [isHovered, setIsHovered] = useState(false);
    const initialControls = useAnimation();
    const [hasAnimatedInitial, setHasAnimatedInitial] = useState(false);

    const hasHoverTextAnimation =
      animation?.type &&
      typeof animation.hover === 'object' &&
      animation.hover.text;
    const hoverText = hasHoverTextAnimation
      ? (animation.hover as { text: string }).text
      : '';

    useEffect(() => {
      if (!isHovered && !hasAnimatedInitial && animation?.type) {
        initialControls
          .start('visible')
          .then(() => setHasAnimatedInitial(true));
      }
    }, [initialControls, hasAnimatedInitial, animation?.type, isHovered]);

    const getVariants = useCallback(
      (
        baseDelay: number,
        baseDuration: number,
        baseEase?: EasingDefinition,
        stagger: number = 0.05
      ) => ({
        visible: (customIndex: number) => ({
          y: 0,
          transition: {
            delay: baseDelay + customIndex * stagger,
            duration: baseDuration,
            ...(baseEase ? { ease: baseEase } : {}),
          },
        }),
        initial: {
          y: '100%',
        },
        exit: (customIndex: number) => ({
          y: '-100%',
          transition: {
            delay: baseDelay + customIndex * stagger,
            duration: baseDuration,
            ...(baseEase ? { ease: baseEase } : {}),
          },
        }),
      }),
      []
    );

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

    const textVariants = useMemo(
      () => getVariants(baseDelay, baseDuration, baseEase, baseStagger),
      [getVariants, baseDelay, baseDuration, baseEase, baseStagger]
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
            <AnimatePresence mode="wait">
              {items.map((item, i) => (
                <motion.span
                  key={isHovering ? `hover-${i}` : `initial-${i}`}
                  className="my-0 inline-block py-0"
                  custom={i}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  variants={textVariants}
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
                </motion.span>
              ))}
            </AnimatePresence>
          </Flex>
        );
      },
      [animation?.type, className, ctx, props, textVariants]
    );

    if (animation?.type) {
      if (typeof children !== 'string') {
        throw new Error(
          'Typography: Animation with split-words/chars only works with string children.'
        );
      }

      return (
        <motion.div
          className="inline-block h-fit overflow-hidden"
          onHoverStart={
            hasHoverTextAnimation ? () => setIsHovered(true) : undefined
          }
          onHoverEnd={
            hasHoverTextAnimation ? () => setIsHovered(false) : undefined
          }
          animate={
            !isHovered && !hasHoverTextAnimation ? initialControls : undefined
          }
          initial={!isHovered && !hasHoverTextAnimation ? 'initial' : undefined}
        >
          {renderAnimatedText(currentText as string, isHovered)}
        </motion.div>
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

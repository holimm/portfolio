'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { useTypography, UseTypographyProps } from '../utils/Typography.Util';
import { AnimatePresence, EasingDefinition, motion } from 'framer-motion';
import { Flex } from '@/components/layout';

export interface TypographyProps
  extends UseTypographyProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  animation?: {
    type: 'split-words' | 'split-chars';
    duration?: number;
    delay?: number;
    ease?: EasingDefinition;
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

    if (animation?.type === 'split-words') {
      if (!children) return null;
      if (typeof children !== 'string') {
        throw new Error(
          'Typography: Animation "split-words" only works with string children.'
        );
      }

      const words = children.split(' ');
      const duration = animation.duration ?? 0.4;
      const delay = animation.delay ?? 0.1;
      const ease = animation.ease;

      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              className="inline-block h-fit overflow-hidden"
              height="full"
              width="full"
              align="center"
              gap="none"
            >
              {words.map((word, i) => (
                <motion.span
                  className="my-0 inline-block py-0"
                  custom={i}
                  initial={{ y: '100%' }}
                  animate="visible"
                  variants={{
                    visible: (customIndex: number) => ({
                      y: 0,
                      transition: {
                        delay: (animation.delay ?? delay) + customIndex * delay,
                        duration: duration,
                        ...(ease ? { ease } : {}),
                      },
                    }),
                  }}
                  key={children + i}
                >
                  <defaultConfig.Component
                    data-comp="typography"
                    data-variant={ctx.variant}
                    className={`${className} ${ctx.typographyStyle()}`}
                    ref={ctx.typographyRef}
                    {...props}
                  >
                    {word}
                    {i !== words.length - 1 ? '\u00A0' : ''}
                  </defaultConfig.Component>
                </motion.span>
              ))}
            </Flex>
          </motion.div>
        </AnimatePresence>
      );
    }

    if (animation?.type === 'split-chars') {
      if (!children) return null;
      if (typeof children !== 'string') {
        throw new Error(
          'Typography: Animation "split-chars" only works with string children.'
        );
      }

      const chars = Array.from(children);
      const duration = animation.duration ?? 0.2;
      const delay = animation.delay ?? 0.04;
      const ease = animation.ease;

      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              className="inline-block h-fit overflow-hidden"
              height="full"
              width="full"
              align="center"
              gap="none"
            >
              {chars.map((char, i) => (
                <motion.span
                  className="my-0 inline-block py-0"
                  custom={i}
                  initial={{ y: '100%' }}
                  animate="visible"
                  variants={{
                    visible: (customIndex: number) => ({
                      y: 0,
                      transition: {
                        delay: (animation.delay ?? delay) + customIndex * delay,
                        duration: duration,
                        ...(ease ? { ease } : {}),
                      },
                    }),
                  }}
                  key={children + i}
                >
                  <defaultConfig.Component
                    data-comp="typography"
                    data-variant={ctx.variant}
                    className={`${className} ${ctx.typographyStyle()}`}
                    ref={ctx.typographyRef}
                    {...props}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </defaultConfig.Component>
                </motion.span>
              ))}
            </Flex>
          </motion.div>
        </AnimatePresence>
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

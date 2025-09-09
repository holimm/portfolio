import { radiusConfigs, xPaddingSpacing, yPaddingSpacing } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const sectionVariants = tv({
  slots: {
    root: 'relative bg-background',
  },
  variants: {
    theme: {
      default: { root: '' },
      dark: { root: '' },
      light: { root: '' },
    },
    variant: {
      default: { root: 'transition-all duration-200' },
      parallax: { root: '' },
    },
    parallaxDirection: {
      top: { root: '' },
      bottom: { root: '' },
    },
    layout: {
      flex: { root: 'flex flex-col justify-center items-center' },
      block: { root: '' },
    },
    yspace: yPaddingSpacing,
    xspace: xPaddingSpacing,
    rounded: radiusConfigs,
  },
  defaultVariants: {
    variant: 'default',
    yspace: '5xl',
    xspace: 'md',
    theme: 'default',
    layout: 'flex',
  },
  compoundVariants: [],
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
export { sectionVariants };

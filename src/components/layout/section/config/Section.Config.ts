import { xPaddingSpacing, yPaddingSpacing } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const sectionVariants = tv({
  slots: {
    root: 'relative transition-all duration-200 bg-background overflow-x-hidden',
  },
  variants: {
    theme: {
      default: { root: '' },
      dark: { root: '' },
      light: { root: '' },
    },
    variant: {
      default: { root: '' },
    },
    layout: {
      flex: { root: 'flex flex-col justify-center items-center' },
      block: { root: '' },
    },
    yspace: yPaddingSpacing,
    xspace: xPaddingSpacing,
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

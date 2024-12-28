import { horizontalSpacing, verticalSpacing } from '@/styles/config/spacing';
import { tv, type VariantProps } from 'tailwind-variants';

const sectionVariants = tv({
  slots: {
    root: 'relative flex flex-col justify-center items-center transition-all duration-200 bg-background-base overflow-x-hidden',
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
    yspace: verticalSpacing,
    xspace: horizontalSpacing,
  },
  defaultVariants: {
    variant: 'default',
    yspace: '9xl',
    xspace: 'md',
    theme: 'default',
  },
  compoundVariants: [],
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
export { sectionVariants };

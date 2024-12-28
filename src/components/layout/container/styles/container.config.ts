import { horizontalSpacing, verticalSpacing } from '@/styles/config/spacing';
import { tv, type VariantProps } from 'tailwind-variants';

const containerVariants = tv({
  slots: {
    root: 'flex flex-col relative transition-all duration-200 overflow-hidden',
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
    align: {
      center: { root: 'justify-center' },
    },
    yspace: verticalSpacing,
    xspace: horizontalSpacing,
    height: {
      none: { root: '' },
      full: { root: 'h-full' },
      fit: { root: 'h-fit' },
    },
    width: {
      full: { root: 'w-full max-w-full' },
      sm: { root: 'w-full max-w-sm' },
      md: { root: 'w-full max-w-md' },
      lg: { root: 'w-full max-w-lg' },
      xl: { root: 'w-full max-w-xl' },
      '2xl': { root: 'w-full max-w-2xl' },
      '3xl': { root: 'w-full max-w-3xl' },
    },
  },
  defaultVariants: {
    variant: 'default',
    height: 'fit',
    width: 'full',
    theme: 'default',
  },
  compoundVariants: [],
});

export type ContainerVariantProps = VariantProps<typeof containerVariants>;
export { containerVariants };

import { radiusConfigs, xPaddingSpacing, yPaddingSpacing } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const containerVariants = tv({
  slots: {
    root: 'flex flex-col relative transition-all duration-200',
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
    yspace: yPaddingSpacing,
    xspace: xPaddingSpacing,
    height: {
      none: { root: '' },
      full: { root: 'h-full' },
      fit: { root: 'h-fit' },
      auto: { root: 'h-auto' },
    },
    width: {
      none: { root: '' },
      full: { root: 'w-full max-w-screen-full' },
      fit: { root: 'w-fit' },
      auto: { root: 'w-auto' },
      sm: { root: 'w-full max-w-screen-sm' },
      md: { root: 'w-full max-w-screen-md' },
      lg: { root: 'w-full max-w-screen-lg' },
      xl: { root: 'w-full max-w-7xl' },
      '2xl': { root: 'w-full max-w-screen-2xl' },
      '3xl': { root: 'w-full max-w-screen-3xl' },
    },
    rounded: radiusConfigs,
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

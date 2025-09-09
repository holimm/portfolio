import { tv, type VariantProps } from 'tailwind-variants';

const scrollZoomVariants = tv({
  slots: {
    root: 'relative transition-all duration-200',
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
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
  },
  compoundVariants: [],
});

export type ScrollZoomVariantProps = VariantProps<typeof scrollZoomVariants>;
export { scrollZoomVariants };

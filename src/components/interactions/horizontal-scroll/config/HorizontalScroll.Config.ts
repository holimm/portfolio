import { tv, type VariantProps } from 'tailwind-variants';

const horizontalScrollVariants = tv({
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

export type HorizontalScrollVariantProps = VariantProps<
  typeof horizontalScrollVariants
>;
export { horizontalScrollVariants };

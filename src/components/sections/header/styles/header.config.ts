import { tv, type VariantProps } from 'tailwind-variants';

const headerVariants = tv({
  slots: {
    root: '!fixed top-0 z-50 w-full py-lg bg-[unset]',
  },
  variants: {
    theme: {
      default: { root: '' },
      dark: { root: '' },
      light: { root: '' },
    },
    variant: {
      default: {
        root: '',
      },
      dashboard: {
        root: '',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
  },
  compoundVariants: [],
});

export type HeaderVariantProps = VariantProps<typeof headerVariants>;
export { headerVariants };

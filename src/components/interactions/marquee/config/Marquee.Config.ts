import { tv, type VariantProps } from 'tailwind-variants';

const marqueeVariants = tv({
  slots: {
    root: '',
    item: '',
  },
  variants: {
    variant: {
      default: {
        root: 'mx-base',
      },
      hero: {
        item: 'gap-xs',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
export type MarqueeVariantProps = VariantProps<typeof marqueeVariants>;
export { marqueeVariants };

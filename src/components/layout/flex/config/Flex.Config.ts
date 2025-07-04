import { gapSpacing } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const flexVariants = tv({
  slots: {
    root: 'flex',
  },
  variants: {
    variant: {
      row: { root: 'flex-row' },
      col: { root: 'flex-col' },
    },
    justify: {
      start: { root: 'justify-start' },
      end: { root: 'justify-end' },
      center: { root: 'justify-center' },
      between: { root: 'justify-between' },
      around: { root: 'justify-around' },
      evenly: { root: 'justify-evenly' },
    },
    align: {
      stretch: { root: 'items-stretch' },
      start: { root: 'items-start' },
      end: { root: 'items-end' },
      center: { root: 'items-center' },
      baseline: { root: 'items-baseline' },
    },
    alignContent: {
      stretch: { root: 'content-stretch' },
      start: { root: 'content-start' },
      end: { root: 'content-end' },
      center: { root: 'content-center' },
      between: { root: 'content-between' },
      around: { root: 'content-around' },
    },
    wrap: {
      nowrap: { root: 'flex-nowrap' },
      wrap: { root: 'flex-wrap' },
    },
    gap: gapSpacing,
    reverse: {
      true: { root: '' },
      false: { root: '' },
    },
  },
  defaultVariants: {
    variant: 'row',
    gap: 'md',
  },
  compoundVariants: [
    // REVERSE
    {
      variant: 'row',
      reverse: true,
      className: {
        root: 'flex-row-reverse',
      },
    },
    {
      variant: 'col',
      reverse: true,
      className: {
        root: 'flex-col-reverse',
      },
    },
  ],
});

export type FlexVariantProps = VariantProps<typeof flexVariants>;
export { flexVariants };

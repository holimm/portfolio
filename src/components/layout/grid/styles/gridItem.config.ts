import { gridItemConfigs } from '@/styles/config/gridItem';
import { tv, type VariantProps } from 'tailwind-variants';

const gridItemVariants = tv({
  slots: {
    root: 'w-full',
  },
  variants: {
    variant: {
      default: { root: 'h-fit' },
    },
    layout: {
      cols: { root: '' },
      rows: { root: '' },
    },
    span: {
      none: { root: '' },
      full: { root: '' },
      auto: { root: '' },
      '1': { root: '' },
      '2': { root: '' },
      '3': { root: '' },
      '4': { root: '' },
      '5': { root: '' },
      '6': { root: '' },
      '7': { root: '' },
      '8': { root: '' },
      '9': { root: '' },
      '10': { root: '' },
      '11': { root: '' },
      '12': { root: '' },
    },
    start: {
      none: { root: '' },
      '1': { root: '' },
      '2': { root: '' },
      '3': { root: '' },
      '4': { root: '' },
      '5': { root: '' },
      '6': { root: '' },
      '7': { root: '' },
      '8': { root: '' },
      '9': { root: '' },
      '10': { root: '' },
      '11': { root: '' },
      '12': { root: '' },
    },
  },
  defaultVariants: {
    variant: 'default',
    layout: 'cols',
    span: 'auto',
  },
  compoundVariants: [...gridItemConfigs],
});

export type GridItemVariantProps = VariantProps<typeof gridItemVariants>;
export { gridItemVariants };

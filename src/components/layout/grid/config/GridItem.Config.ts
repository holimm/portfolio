import { gridItemConfigs } from '@/styles';
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
    height: {
      none: { root: '' },
      full: { root: 'h-full' },
      fit: { root: 'h-fit' },
      screen: { root: 'h-screen' },
      auto: { root: 'h-auto' },
    },
    width: {
      none: { root: '' },
      full: { root: 'w-full max-w-screen-full' },
      fit: { root: 'w-fit' },
      screen: { root: 'w-screen' },
      auto: { root: 'w-auto' },
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

import gridConfigs from '@/styles/config/grid';
import { gapSpacing } from '@/styles/config/spacing';
import { tv, type VariantProps } from 'tailwind-variants';

const gridVariants = tv({
  slots: {
    root: 'grid w-full',
  },
  variants: {
    variant: {
      cols: { root: '' },
      rows: { root: '' },
    },
    dimension: {
      none: { root: '' },
      auto: { root: '' },
      subgrid: { root: '' },
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
    gap: gapSpacing,
  },
  defaultVariants: {
    variant: 'cols',
    dimension: '12',
    gap: 'md',
  },
  compoundVariants: [...gridConfigs],
});

export type GridVariantProps = VariantProps<typeof gridVariants>;
export { gridVariants };

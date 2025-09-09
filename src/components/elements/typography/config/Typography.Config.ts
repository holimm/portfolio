import { fontWeight, textSize, letterSpacing } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const typographyVariants = tv({
  slots: {
    root: 'mt-1.5',
  },
  variants: {
    variant: {
      default: { root: '' },
    },
    ashtml: {
      h1: { root: '' },
      h2: { root: '' },
      h3: { root: '' },
      h4: { root: '' },
      h5: { root: '' },
      h6: { root: '' },
      strong: { root: '' },
      paragraph: { root: '' },
      bold: { root: '' },
      italic: { root: '' },
      underline: { root: '' },
      cite: { root: '' },
      deleted: { root: '' },
      emphasis: { root: '' },
      inserted: { root: '' },
      kbd: { root: '' },
      mark: { root: '' },
      strike: { root: '' },
      sample: { root: '' },
      sub: { root: '' },
      sup: { root: '' },
      span: { root: '' },
    },
    size: textSize,
    weight: fontWeight,
    contrast: {
      highest: { root: 'text-contrast-highest' },
      higher: { root: 'text-contrast-higher' },
      high: { root: 'text-contrast-high' },
      medium: { root: 'text-contrast-medium' },
      low: { root: 'text-contrast-low' },
      lower: { root: 'text-contrast-lower' },
      lowest: { root: 'text-contrast-lowest' },
    },
    color: {
      default: { root: '' },
      invert: { root: 'text-invert' },
      primary: { root: 'text-primary' },
      secondary: { root: 'text-secondary' },
      warning: { root: 'text-warning' },
      success: { root: 'text-success' },
      error: { root: 'text-error' },
    },
    align: {
      left: { root: 'text-start' },
      center: { root: 'text-center' },
      right: { root: 'text-end' },
    },
    wrap: {
      true: { root: 'text-wrap' },
      false: { root: 'text-nowrap' },
    },
    letterSpacing: letterSpacing,
  },
  defaultVariants: {
    variant: 'default',
    ashtml: 'paragraph',
    weight: 'normal',
    contrast: 'higher',
    align: 'left',
    wrap: true,
  },
  compoundVariants: [
    // INVERT
    {
      color: 'invert',
      contrast: 'highest',
      className: {
        root: 'text-invert-highest',
      },
    },
    {
      color: 'invert',
      contrast: 'higher',
      className: {
        root: 'text-invert-higher',
      },
    },
    {
      color: 'invert',
      contrast: 'high',
      className: {
        root: 'text-invert-high',
      },
    },
    {
      color: 'invert',
      contrast: 'medium',
      className: {
        root: 'text-invert-medium',
      },
    },
    {
      color: 'invert',
      contrast: 'low',
      className: {
        root: 'text-invert-low',
      },
    },
    {
      color: 'invert',
      contrast: 'lower',
      className: {
        root: 'text-invert-lower',
      },
    },
    {
      color: 'invert',
      contrast: 'lowest',
      className: {
        root: 'text-invert-lowest',
      },
    },
    // PRIMARY
    {
      color: 'primary',
      contrast: 'highest',
      className: {
        root: 'text-primary-darkest',
      },
    },
    {
      color: 'primary',
      contrast: 'higher',
      className: {
        root: 'text-primary-darker',
      },
    },
    {
      color: 'primary',
      contrast: 'high',
      className: {
        root: 'text-primary-dark',
      },
    },
    {
      color: 'primary',
      contrast: 'medium',
      className: {
        root: 'text-primary',
      },
    },
    {
      color: 'primary',
      contrast: 'low',
      className: {
        root: 'text-primary-light',
      },
    },
    {
      color: 'primary',
      contrast: 'lower',
      className: {
        root: 'text-primary-lighter',
      },
    },
    {
      color: 'primary',
      contrast: 'lowest',
      className: {
        root: 'text-primary-lightest',
      },
    },
    // SECONDARY
    {
      color: 'secondary',
      contrast: 'highest',
      className: {
        root: 'text-secondary-darkest',
      },
    },
    {
      color: 'secondary',
      contrast: 'higher',
      className: {
        root: 'text-secondary-darker',
      },
    },
    {
      color: 'secondary',
      contrast: 'high',
      className: {
        root: 'text-secondary-dark',
      },
    },
    {
      color: 'secondary',
      contrast: 'medium',
      className: {
        root: 'text-secondary',
      },
    },
    {
      color: 'secondary',
      contrast: 'low',
      className: {
        root: 'text-secondary-light',
      },
    },
    {
      color: 'secondary',
      contrast: 'lower',
      className: {
        root: 'text-secondary-lighter',
      },
    },
    {
      color: 'secondary',
      contrast: 'lowest',
      className: {
        root: 'text-secondary-lightest',
      },
    },
    // WARNING
    {
      color: 'warning',
      contrast: 'highest',
      className: {
        root: 'text-warning-darkest',
      },
    },
    {
      color: 'warning',
      contrast: 'higher',
      className: {
        root: 'text-warning-darker',
      },
    },
    {
      color: 'warning',
      contrast: 'high',
      className: {
        root: 'text-warning-dark',
      },
    },
    {
      color: 'warning',
      contrast: 'medium',
      className: {
        root: 'text-warning',
      },
    },
    {
      color: 'warning',
      contrast: 'low',
      className: {
        root: 'text-warning-light',
      },
    },
    {
      color: 'warning',
      contrast: 'lower',
      className: {
        root: 'text-warning-lighter',
      },
    },
    {
      color: 'warning',
      contrast: 'lowest',
      className: {
        root: 'text-warning-lightest',
      },
    },
    // SUCCESS
    {
      color: 'success',
      contrast: 'highest',
      className: {
        root: 'text-success-darkest',
      },
    },
    {
      color: 'success',
      contrast: 'higher',
      className: {
        root: 'text-success-darker',
      },
    },
    {
      color: 'success',
      contrast: 'high',
      className: {
        root: 'text-success-dark',
      },
    },
    {
      color: 'success',
      contrast: 'medium',
      className: {
        root: 'text-success',
      },
    },
    {
      color: 'success',
      contrast: 'low',
      className: {
        root: 'text-success-light',
      },
    },
    {
      color: 'success',
      contrast: 'lower',
      className: {
        root: 'text-success-lighter',
      },
    },
    {
      color: 'success',
      contrast: 'lowest',
      className: {
        root: 'text-success-lightest',
      },
    },
    // ERROR
    {
      color: 'error',
      contrast: 'highest',
      className: {
        root: 'text-error-darkest',
      },
    },
    {
      color: 'error',
      contrast: 'higher',
      className: {
        root: 'text-error-darker',
      },
    },
    {
      color: 'error',
      contrast: 'high',
      className: {
        root: 'text-error-dark',
      },
    },
    {
      color: 'error',
      contrast: 'medium',
      className: {
        root: 'text-error',
      },
    },
    {
      color: 'error',
      contrast: 'low',
      className: {
        root: 'text-error-light',
      },
    },
    {
      color: 'error',
      contrast: 'lower',
      className: {
        root: 'text-error-lighter',
      },
    },
    {
      color: 'error',
      contrast: 'lowest',
      className: {
        root: 'text-error-lightest',
      },
    },
  ],
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;
export { typographyVariants };

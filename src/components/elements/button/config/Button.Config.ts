import { paddingSpacing, radiusConfigs } from '@/styles';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  slots: {
    root: 'h-fit text-nowrap font-semibold',
  },
  variants: {
    variant: {
      default: {
        root: '',
      },
      icon: {
        root: '',
      },
    },
    custom: {
      solid: {
        root: 'font-primary flex justify-center items-center gap-xs',
      },
      outline: {
        root: 'font-primary flex justify-center items-center gap-xs',
      },
      ghost: {
        root: 'font-primary flex justify-center items-center gap-xs',
      },
      disabled: {
        root: 'font-primary flex justify-center items-center gap-xs cursor-not-allowed',
      },
      reset: {
        root: '',
      },
    },
    color: {
      primary: {
        root: '',
      },
      secondary: {
        root: '',
      },
      background: {
        root: '',
      },
      success: {
        root: '',
      },
      error: {
        root: '',
      },
      warning: {
        root: '',
      },
    },
    contrast: {
      highest: { root: '' },
      higher: { root: '' },
      high: { root: '' },
      medium: { root: '' },
      low: { root: '' },
      lower: { root: '' },
      lowest: { root: '' },
    },
    rounded: radiusConfigs,
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-sm' },
      md: { root: 'text-base' },
      lg: { root: 'text-xl' },
      xl: { root: 'text-2xl' },
    },
    width: {
      fit: {
        root: 'w-fit',
      },
      fluid: {
        root: 'w-full',
      },
    },
    upperCase: {
      true: {
        root: 'uppercase',
      },
    },
    padding: paddingSpacing,
  },
  defaultVariants: {
    variant: 'default',
    custom: 'solid',
    color: 'primary',
    contrast: 'medium',
    size: 'md',
    width: 'fit',
    rounded: 'sm',
  },
  compoundVariants: [
    // VARIANT
    {
      variant: 'default',
      custom: ['solid', 'outline', 'ghost', 'disabled'],
      className: {
        root: 'px-xl py-sm',
      },
    },
    {
      variant: 'icon',
      custom: ['solid', 'outline', 'disabled'],
      className: {
        root: 'p-xs',
      },
    },
    {
      variant: 'icon',
      custom: 'ghost',
      className: {
        root: '',
      },
    },
    // OUTLINE
    // PRIMARY
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'highest',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'higher',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-darker',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'high',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-dark',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'medium',
      className: {
        root: 'bg-background-lightest border-solid border border-primary',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'low',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-light',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'lower',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'primary',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest border-solid border border-primary-lightest',
      },
    },

    // SECONDARY
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'highest',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'higher',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-darker',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'high',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-dark',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'medium',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'low',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-light',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'lower',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'secondary',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest border-solid border border-secondary-lightest',
      },
    },

    // BACKGROUND
    {
      custom: 'outline',
      color: 'background',
      contrast: 'highest',
      className: {
        root: 'bg-background-lightest border-solid border border-background-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'higher',
      className: {
        root: 'bg-background-lightest border-solid border border-background-darker',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'high',
      className: {
        root: 'bg-background-lightest border-solid border border-background-dark',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'medium',
      className: {
        root: 'bg-background-lightest border-solid border border-background-base',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'low',
      className: {
        root: 'bg-background-lightest border-solid border border-background-light',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'lower',
      className: {
        root: 'bg-background-lightest border-solid border border-background-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'background',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest border-solid border border-background-lightest',
      },
    },

    // SUCCESS
    {
      custom: 'outline',
      color: 'success',
      contrast: 'highest',
      className: {
        root: 'bg-background-lightest border-solid border border-success-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'higher',
      className: {
        root: 'bg-background-lightest border-solid border border-success-darker',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'high',
      className: {
        root: 'bg-background-lightest border-solid border border-success-dark',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'medium',
      className: {
        root: 'bg-background-lightest border-solid border border-success',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'low',
      className: {
        root: 'bg-background-lightest border-solid border border-success-light',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'lower',
      className: {
        root: 'bg-background-lightest border-solid border border-success-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'success',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest border-solid border border-success-lightest',
      },
    },

    // ERROR
    {
      custom: 'outline',
      color: 'error',
      contrast: 'highest',
      className: {
        root: 'bg-background-lightest border-solid border border-error-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'higher',
      className: {
        root: 'bg-background-lightest border-solid border border-error-darker',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'high',
      className: {
        root: 'bg-background-lightest border-solid border border-error-dark',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'medium',
      className: {
        root: 'bg-background-lightest border-solid border border-error',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'low',
      className: {
        root: 'bg-background-lightest border-solid border border-error-light',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'lower',
      className: {
        root: 'bg-background-lightest border-solid border border-error-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'error',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest border-solid border border-error-lightest',
      },
    },

    // WARNING
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'highest',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-darkest',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'higher',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-darker',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'high',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-dark',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'medium',
      className: {
        root: 'bg-background-lighter border-solid border border-warning',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'low',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-light',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'lower',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-lighter',
      },
    },
    {
      custom: 'outline',
      color: 'warning',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lighter border-solid border border-warning-lightest',
      },
    },

    // GHOST
    {
      custom: 'ghost',
      color: 'primary',
      className: {
        root: 'bg-transparent text-primary ',
      },
    },
    {
      custom: 'ghost',
      color: 'secondary',
      className: {
        root: 'bg-transparent text-secondary',
      },
    },
    {
      custom: 'ghost',
      color: 'background',
      className: {
        root: 'bg-transparent',
      },
    },
    {
      custom: 'ghost',
      color: 'success',
      className: {
        root: 'bg-transparent text-success',
      },
    },
    {
      custom: 'ghost',
      color: 'error',
      className: {
        root: 'bg-transparent text-error',
      },
    },
    {
      custom: 'ghost',
      color: 'warning',
      className: {
        root: 'bg-transparent text-warning',
      },
    },
    // DISABLED
    {
      custom: 'disabled',
      color: ['primary', 'secondary', 'success', 'error', 'warning'],
      className: {
        root: 'bg-gray-100 text-gray-300',
      },
    },
    // CONTRAST
    // PRIMARY
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-primary-darkest',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-primary-darker',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-primary-dark',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-primary',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-primary-light',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-primary-lighter',
      },
    },
    {
      color: 'primary',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-primary-lightest',
      },
    },
    // SECONDARY
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-secondary-darkest',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-secondary-darker',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-secondary-dark',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-secondary',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-secondary-light',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-secondary-lighter',
      },
    },
    {
      color: 'secondary',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-secondary-lightest',
      },
    },
    // BACKGROUND
    {
      color: 'background',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-background-darkest',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-background-darker',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-background-dark',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-background-base',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-background-light',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-background-lighter',
      },
    },
    {
      color: 'background',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-background-lightest',
      },
    },
    // SUCCESS
    {
      color: 'success',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-success-darkest',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-success-darker',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-success-dark',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-success',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-success-light',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-success-lighter',
      },
    },
    {
      color: 'success',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-success-lightest',
      },
    },
    // ERROR
    {
      color: 'error',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-error-darkest',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-error-darker',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-error-dark',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-error',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-error-light',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-error-lighter',
      },
    },
    {
      color: 'error',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-error-lightest',
      },
    },
    // WARNING
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'highest',
      className: {
        root: 'bg-warning-darkest',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'higher',
      className: {
        root: 'bg-warning-darker',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'high',
      className: {
        root: 'bg-warning-dark',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'medium',
      className: {
        root: 'bg-warning',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'low',
      className: {
        root: 'bg-warning-light',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'lower',
      className: {
        root: 'bg-warning-lighter',
      },
    },
    {
      color: 'warning',
      custom: 'solid',
      contrast: 'lowest',
      className: {
        root: 'bg-warning-lightest',
      },
    },
  ],
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export { buttonVariants };

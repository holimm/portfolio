import { tv, type VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  slots: {
    root: 'w-full border-2 border-gray-200 p-4 transition-colors duration-300 outline-none focus:border-black rounded-sm',
  },
  variants: {
    variant: {
      default: 'shadow-xs',
    },
    size: {
      default: 'h-9',
      sm: 'h-8',
      lg: 'h-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
export { inputVariants };

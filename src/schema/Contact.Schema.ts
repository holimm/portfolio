import z from 'zod';
import { isProfane } from '@/utils';

export const ContactSchema = z.object({
  fullname: z
    .string()
    .min(2, '* Full name must be at least 2 characters')
    .max(100, '* Full name must be less than 100 characters')
    .refine((val) => !isProfane(val), {
      message: '* Full name contains inappropriate language',
    }),
  email: z
    .email('* Please enter a valid email address')
    .max(100, '* Email must be less than 100 characters')
    .refine((val) => !isProfane(val), {
      message: '* Email contains inappropriate language',
    }),
  message: z
    .string()
    .min(10, '* Message must be at least 10 characters')
    .max(1000, '* Message must be less than 1000 characters')
    .refine((val) => !isProfane(val), {
      message: '* Message contains inappropriate language',
    }),
});

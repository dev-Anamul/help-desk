import { z } from 'zod';
import { VerifyTokenSchema } from './verify-token';

export const ResetPasswordSchema = VerifyTokenSchema.extend({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  email: z.string().email(),
});

export const RefineResetPasswordSchema = ResetPasswordSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type RefineResetPassword = z.infer<typeof RefineResetPasswordSchema>;

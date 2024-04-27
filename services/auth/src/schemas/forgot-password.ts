import { z } from 'zod';
import { SignupSchema } from './signup';

export const ForgotPasswordSchema = SignupSchema.pick({
  email: true,
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

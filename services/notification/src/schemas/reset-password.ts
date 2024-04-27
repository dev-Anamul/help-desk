import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
  resetToken: z.string(),
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

import { z } from 'zod';

export const CreateVerificationSchema = z.object({
  code: z.string(),
  email: z.string().email(),
  expiredAt: z.string(),
});

export type CreateVerification = z.infer<typeof CreateVerificationSchema>;

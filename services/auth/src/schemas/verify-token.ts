import { z } from 'zod';

export const VerifyTokenSchema = z.object({
  token: z.string(),
});

export type VerifyToken = z.infer<typeof VerifyTokenSchema>;

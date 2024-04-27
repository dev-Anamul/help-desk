import { z } from 'zod';

export const UserSchema = z.object({
  authId: z.string(),
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  avatar: z.string().optional(),
  phone: z.string().min(10),
  address: z.string().min(10),
});

export type User = z.infer<typeof UserSchema>;

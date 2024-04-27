import { z } from 'zod';

export const UpdateUserSchema = z.object({
  firstName: z.string().min(2)?.optional(),
  lastName: z.string().min(2)?.optional(),
  phone: z.string().min(10)?.optional(),
  address: z.string().min(10)?.optional(),
  avatar: z.string().optional()?.optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

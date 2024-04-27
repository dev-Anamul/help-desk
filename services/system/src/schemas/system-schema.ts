import { z } from 'zod';

export const SystemSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(3).max(255),
  url: z.string().url(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  owner: z.string().min(3).max(255),
  description: z.string().max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type System = z.infer<typeof SystemSchema>;

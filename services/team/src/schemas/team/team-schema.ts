import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(3).max(255),
  description: z.string().max(255).optional(),
  members: z.array(z.string().cuid()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date(),
});

export type Team = z.infer<typeof TeamSchema>;

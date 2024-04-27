import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(3).max(255),
  email: z.string().email(),
  team: z.string().cuid(),
  teamId: z.string().cuid(),
  userId: z.string().cuid(),
  isLeader: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date(),
});

export type Member = z.infer<typeof MemberSchema>;

import { z } from 'zod';
import { MemberSchema } from './member-schema';

export const updateMemberSchema = MemberSchema.partial().pick({
  name: true,
  email: true,
  userId: true,
  teamId: true,
  isLeader: true,
  updatedAt: true,
});

export type UpdateMember = z.infer<typeof updateMemberSchema>;

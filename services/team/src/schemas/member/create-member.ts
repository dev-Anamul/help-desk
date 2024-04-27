import { z } from 'zod';
import { MemberSchema } from './member-schema';

export const CreateMemberSchema = MemberSchema.pick({
  name: true,
  email: true,
  userId: true,
  isLeader: true,
});

export type CreateMember = z.infer<typeof CreateMemberSchema>;

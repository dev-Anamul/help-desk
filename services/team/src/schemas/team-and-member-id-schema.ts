import { z } from 'zod';

export const TeamAndMemberIdSchema = z.object({
  id: z.string().cuid(),
  member_id: z.string().cuid(),
});

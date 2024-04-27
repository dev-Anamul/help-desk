import { z } from 'zod';
import { TeamSchema } from './team-schema';

export const UpdateTeamSchema = TeamSchema.partial().pick({
  name: true,
  description: true,
  updatedAt: true,
});

export type UpdateTeam = z.infer<typeof UpdateTeamSchema>;

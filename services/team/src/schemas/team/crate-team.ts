import { z } from 'zod';
import { TeamSchema } from './team-schema';

export const CreateTeamSchema = TeamSchema.pick({
  name: true,
  description: true,
});

export type CreateTeam = z.infer<typeof CreateTeamSchema>;

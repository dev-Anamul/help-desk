import { z } from 'zod';

export const AssignToTeamSchema = z.object({
  ticketId: z.string().cuid(),
  teamId: z.string().cuid(),
});

export const AssignToUserSchema = z.object({
  ticketId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type AssignToTeam = z.infer<typeof AssignToTeamSchema>;
export type AssignToUser = z.infer<typeof AssignToUserSchema>;

import { STATUS } from '@prisma/client';
import { z } from 'zod';

export const TicketSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  status: z.nativeEnum(STATUS).optional(),
  content: z.string(),
  submitter: z.string(),
  system: z.string().cuid(),
  category: z.string().cuid(),
  assignedUser: z.string().optional(),
  assignedTeam: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Ticket = z.infer<typeof TicketSchema>;

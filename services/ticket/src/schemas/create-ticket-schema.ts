import { z } from 'zod';
import { TicketSchema } from './ticket-schema';

export const CreateTicketSchema = TicketSchema.pick({
  title: true,
  content: true,
  assignedTeam: true,
  assignedUser: true,
  category: true,
  status: true,
  submitter: true,
  system: true,
});

export type CreateTicket = z.infer<typeof CreateTicketSchema>;

import { z } from 'zod';
import { CreateTicketSchema } from './create-ticket-schema';

export const UpdateTicketSchema = CreateTicketSchema.partial();
export type UpdateTicket = z.infer<typeof UpdateTicketSchema>;

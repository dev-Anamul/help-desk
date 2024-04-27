import { prisma } from '@/prisma/prisma-client';
import { CreateTicket } from '@/schemas/create-ticket-schema';

export const createTicket = async (input: CreateTicket) =>
  prisma.ticket.create({ data: input });

import { prisma } from '@/prisma/prisma-client';
import { UpdateTicket } from '@/schemas/update-ticket-schema';

export const updateTicket = async (id: string, input: UpdateTicket) => {
  return prisma.ticket.update({ where: { id }, data: input });
};

import { prisma } from '@/prisma/prisma-client';

export const deleteTicket = async (id: string) => {
  return prisma.ticket.delete({ where: { id } });
};

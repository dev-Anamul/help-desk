import { prisma } from '@/prisma/prisma-client';

export const ticketByUser = async (userId: string) => {
  return prisma.ticket.findMany({ where: { assignedUser: userId } });
};

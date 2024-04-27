import { prisma } from '@/prisma/prisma-client';

export const ticketsByTeam = async (teamId: string) => {
  return prisma.ticket.findMany({ where: { assignedTeam: teamId } });
};

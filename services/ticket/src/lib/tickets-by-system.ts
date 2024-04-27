import { prisma } from '@/prisma/prisma-client';

export const ticketsBySystem = async (systemId: string) => {
  return prisma.ticket.findMany({ where: { system: systemId } });
};

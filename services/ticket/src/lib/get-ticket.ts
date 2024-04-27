import { prisma } from '@/prisma/prisma-client';

export const ticketById = async (id: string) =>
  prisma.ticket.findUnique({ where: { id } });

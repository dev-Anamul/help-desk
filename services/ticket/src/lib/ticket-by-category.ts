import { prisma } from '@/prisma/prisma-client';

export const ticketByCategory = async (category: string) =>
  prisma.ticket.findMany({ where: { category } });

import { prisma } from '@/prisma/prisma-client';
import { AssignToUser } from '@/schemas/assign-ticket';

export const assignToUser = async (data: AssignToUser) => {
  return prisma.ticket.update({
    where: { id: data.ticketId },
    data: { assignedUser: data.userId },
  });
};

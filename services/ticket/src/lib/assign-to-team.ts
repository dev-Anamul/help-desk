import { prisma } from '@/prisma/prisma-client';
import { AssignToTeam } from '@/schemas/assign-ticket';

export const assignToTeam = async (input: AssignToTeam) => {
  return prisma.ticket.update({
    where: { id: input.ticketId },
    data: {
      assignedTeam: input.teamId,
    },
  });
};

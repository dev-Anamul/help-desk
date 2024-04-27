import { prisma } from '@/prisma/prisma-client';
import { UpdateTeam } from '@/schemas/team';

export const updateTeam = async (id: string, data: UpdateTeam) => {
  return prisma.team.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

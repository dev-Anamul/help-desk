import { prisma } from '@/prisma/prisma-client';

export const deleteTeam = async (id: string) => {
  return prisma.team.delete({
    where: {
      id,
    },
  });
};

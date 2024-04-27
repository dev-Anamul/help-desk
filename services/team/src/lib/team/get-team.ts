import { prisma } from '@/prisma/prisma-client';

export const teamById = async (id: string) => {
  return prisma.team.findUnique({
    where: {
      id,
    },
  });
};

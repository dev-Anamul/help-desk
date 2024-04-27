import { prisma } from '@/prisma/prisma-client';

export const deleteMember = async (teamId: string, userId: string) => {
  return prisma.member.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};

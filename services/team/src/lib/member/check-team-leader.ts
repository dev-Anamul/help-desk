import { prisma } from '@/prisma/prisma-client';

export const findTeamLeader = async (teamId: string) => {
  return prisma.member.findFirst({
    where: {
      AND: [
        {
          isLeader: true,
        },
        {
          teamId,
        },
      ],
    },
  });
};

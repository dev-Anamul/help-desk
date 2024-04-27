import { prisma } from '@/prisma/prisma-client';

export const memberByID = async (id: string) => {
  return prisma.member.findUnique({
    where: {
      id,
    },
  });
};

export const memberByTeamIdUserId = async (teamId: string, userId: string) => {
  return prisma.member.findFirst({
    where: {
      AND: [
        {
          teamId,
        },
        {
          userId,
        },
      ],
    },
  });
};

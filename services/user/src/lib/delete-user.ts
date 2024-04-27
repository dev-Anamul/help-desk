import { prisma } from '@/prisma/prisma-client';

export const deleteUserByAuthId = async (authId: string) =>
  prisma.user.delete({
    where: {
      authId,
    },
  });

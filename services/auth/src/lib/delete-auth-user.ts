import { prisma } from '@/prisma/prisma-client';

export const deleteAuthUser = async (id: string) =>
  await prisma.auth.delete({
    where: {
      id,
    },
  });

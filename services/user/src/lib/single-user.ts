import { prisma } from '@/prisma/prisma-client';

export const singleUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email: email },
  });

export const userByAuthId = async (authId: string) =>
  prisma.user.findUnique({
    where: { authId: authId },
  });

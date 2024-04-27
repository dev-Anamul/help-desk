import { prisma } from '@/prisma/prisma-client';

export const userById = async (id: string) =>
  prisma.auth.findUnique({ where: { id } });

export const userByEmail = async (email: string) =>
  prisma.auth.findUnique({ where: { email } });

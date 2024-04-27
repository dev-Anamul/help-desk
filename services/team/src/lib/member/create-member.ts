import { prisma } from '@/prisma/prisma-client';
import { CreateMember } from '@/schemas/member';

export const createMember = async (teamId: string, data: CreateMember) =>
  prisma.member.create({
    data: {
      ...data,
      teamId,
    },
  });

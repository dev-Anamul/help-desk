import { prisma } from '@/prisma/prisma-client';
import { UpdateMember } from '@/schemas/member';

export const updateMember = async (id: string, data: UpdateMember) => {
  return prisma.member.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

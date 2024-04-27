import { prisma } from '@/prisma/prisma-client';

export type NotExpiredVerification = {
  code: string;
  email: string;
};

// find not expired verification
export const findNotExpiredVerification = async (
  data: NotExpiredVerification
) =>
  prisma.verification.findFirst({
    where: {
      code: data.code,
      email: data.email,
      expired_at: {
        gte: new Date(),
      },
      deleted_at: null,
    },
  });

// delete verification
export const deleteVerification = async (id: string) =>
  prisma.verification.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

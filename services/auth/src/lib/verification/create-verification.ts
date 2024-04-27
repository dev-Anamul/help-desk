import { prisma } from '@/prisma/prisma-client';
import { CreateVerification } from '@/schemas/create-verification';

export const createVerification = async (data: CreateVerification) =>
  prisma.verification.create({
    data: {
      code: data.code,
      email: data.email,
      expired_at: data.expiredAt,
    },
  });

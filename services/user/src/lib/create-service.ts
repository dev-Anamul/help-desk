import { prisma } from '@/prisma/prisma-client';
import { User } from '@/schemas/user';

export const createUser = async (data: User) => {
  // create user
  const user = await prisma.user.create({
    data: data,
  });

  // return user
  return user;
};

import { prisma } from '@/prisma/prisma-client';
import { CreateAuthUser } from '@/schemas/auth-user';
import bcrypt from 'bcrypt';

export const createAuthUser = async (data: CreateAuthUser) => {
  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // create auth user
  const authUser = await prisma.auth.create({
    data: {
      usernameOrEmail: data.usernameOrEmail,
      password: hashedPassword,
    },
  });

  // return auth user
  return authUser;
};

import { prisma } from '@/prisma/prisma-client';
import {
  ChangePasswordByEmail,
  ChangePasswordById,
} from '@/schemas/change-password';
import bcrypt from 'bcrypt';

// change password by ID
export const changePassword = async (data: ChangePasswordById) => {
  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // update password
  const newUser = await prisma.auth.update({
    data: { password: hashedPassword },
    where: {
      id: data.id,
    },
  });

  return newUser;
};

// change password by email
export const changePasswordByEmail = async (data: ChangePasswordByEmail) => {
  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // update password
  const newUser = await prisma.auth.update({
    data: { password: hashedPassword },
    where: {
      email: data.email,
    },
  });

  return newUser;
};

import { prisma } from '@/prisma/prisma-client';
import { UpdateUser } from '@/schemas/update-user';

export const updateUser = async (id: string, data: UpdateUser) => {
  // update user
  const user = await prisma.user.update({
    where: {
      authId: id,
    },
    data: data,
  });

  // return user
  return user;
};

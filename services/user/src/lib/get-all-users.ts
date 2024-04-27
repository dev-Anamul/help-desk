import { prisma } from '@/prisma/prisma-client';
import { Pagination } from '@/schemas';

export const getAllUsers = async (data: Pagination) => {
  return prisma.user.findMany({
    skip: (data.page - 1) * data.limit,
    take: data.limit,
    orderBy: {
      [data.orderBy]: data.order,
    },
    where: {
      OR: [
        {
          firstName: {
            contains: data.search || '',
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: data.search || '',
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: data.search || '',
            mode: 'insensitive',
          },
        },
      ],
    },
    select: data?.fields?.split(',')?.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}),
  });
};

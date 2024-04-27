import { prisma } from '@/prisma/prisma-client';
import { Pagination } from '@/schemas/pagination-schema';

export const getTeams = async (data: Pagination) => {
  return prisma.team.findMany({
    skip: (data.page - 1) * data.limit,
    take: data.limit,
    orderBy: {
      [data.orderBy]: data.order,
    },
    where: {
      OR: [
        {
          name: {
            contains: data.search || '',
            mode: 'insensitive',
          },
        },
        {
          description: {
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

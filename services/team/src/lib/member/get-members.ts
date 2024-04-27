import { prisma } from '@/prisma/prisma-client';
import { Pagination } from '@/schemas/pagination-schema';

export const membersByTeamId = async (
  teamId: string,
  paginationData: Pagination
) => {
  return prisma.member.findMany({
    skip: (paginationData.page - 1) * paginationData.limit,
    take: paginationData.limit,
    orderBy: {
      [paginationData.orderBy]: paginationData.order,
    },
    where: {
      teamId,
      OR: [
        {
          name: {
            contains: paginationData.search || '',
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: paginationData.search || '',
            mode: 'insensitive',
          },
        },
      ],
    },
    select: paginationData?.fields?.split(',')?.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}),
  });
};

export const membersByUserId = async (userId: string) => {
  return prisma.member.findMany({
    where: {
      userId,
    },
  });
};

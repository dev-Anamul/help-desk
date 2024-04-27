import { prisma } from '@/prisma/prisma-client';
import { Pagination } from '@/schemas/pagination-schema';

// get tickets
export const getTickets = async (pagination: Pagination) => {
  return prisma.ticket.findMany({
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
    orderBy: {
      [pagination.orderBy]: pagination.order,
    },
    where: {
      OR: [
        {
          title: {
            contains: pagination.search || '',
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: pagination.search || '',
            mode: 'insensitive',
          },
        },
      ],
    },
    select: pagination?.fields?.split(',')?.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}),
  });
};

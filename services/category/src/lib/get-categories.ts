import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { Pagination } from '@/schemas';
import { generateRedisPaginationKey } from '@/utils/redis-key';

export const getCategories = async (data: Pagination) => {
  // get category from redis
  const cachedCategories = await redisClient.get(
    generateRedisPaginationKey(data)
  );

  if (cachedCategories) {
    return JSON.parse(cachedCategories);
  }

  // get categories
  const categories = await prisma.category.findMany({
    skip: (data?.page - 1) * data?.limit || 0,
    take: data?.limit || 10,
    orderBy: {
      [data?.orderBy]: data?.order,
    },
    select: data?.fields?.split(',')?.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}),
    where: {
      OR: [
        {
          name: {
            contains: data?.search || '',
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: data?.search || '',
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  // set category to redis
  if (categories?.length)
    await redisClient.set(
      generateRedisPaginationKey(data),
      JSON.stringify(categories),
      'EX',
      60 * 10
    );

  // return categories
  return categories;
};

import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { Pagination } from '@/schemas/pagination-schema';
import { generateRedisPaginationKey } from '@/utils/redis-key';

export const getSystems = async (pagination: Pagination) => {
  // get systems from redis
  const systemsCache = await redisClient.get(
    generateRedisPaginationKey(pagination)
  );

  // if systems exists in cache
  if (systemsCache) {
    return JSON.parse(systemsCache);
  }

  // get systems from database
  const systems = await prisma.system.findMany({
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
    orderBy: {
      [pagination.orderBy]: pagination.order,
    },
    where: {
      OR: [
        {
          name: {
            contains: pagination.search || '',
            mode: 'insensitive',
          },
        },
        {
          description: {
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

  // set to redis
  if (systems?.length)
    await redisClient.set(
      generateRedisPaginationKey(pagination),
      JSON.stringify(systems),
      'EX',
      60 * 10
    );

  // return the systems
  return systems;
};

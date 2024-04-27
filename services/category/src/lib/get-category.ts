import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { generateRedisKey } from '@/utils/redis-key';

export const categoryById = async (id: string) => {
  // get category from redis
  const categoryCache = await redisClient.get(generateRedisKey(id));

  // if category exists in cache
  if (categoryCache) {
    return JSON.parse(categoryCache);
  }

  // get category from database
  const category = await prisma.category.findUnique({ where: { id } });

  // if category set cache
  if (category) {
    await redisClient.set(
      generateRedisKey(id),
      JSON.stringify(category),
      'EX',
      60
    );
  }

  return category;
};

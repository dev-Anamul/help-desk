import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { CreateCategory } from '@/schemas/create-category';
import { generateRedisKey } from '@/utils/redis-key';
import { Prisma } from '@prisma/client';

export const createCategory = async (data: CreateCategory) => {
  // create category in database
  const newCategory = await prisma.category.create({ data });

  // delete all systems from redis
  const keys = await redisClient.keys('category:pagination:*');
  if (keys?.length) {
    const pipeline = redisClient.pipeline();
    for (const key of keys) {
      pipeline.del(key);
    }
    await pipeline.exec();
  }

  // store category in redis
  if (newCategory)
    await redisClient.set(
      generateRedisKey(newCategory.id),
      JSON.stringify(newCategory),
      'EX',
      60 * 10
    );

  // return category
  return newCategory;
};

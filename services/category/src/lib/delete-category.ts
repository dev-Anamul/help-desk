import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { generateRedisKey } from '@/utils/redis-key';

export const deleteCategoryById = async (id: string) => {
  await prisma.category.delete({ where: { id } });

  // delete all systems from redis
  const keys = await redisClient.keys('category:pagination:*');
  if (keys?.length) {
    const pipeline = redisClient.pipeline();
    for (const key of keys) {
      pipeline.del(key);
    }
    await pipeline.exec();
  }

  // delete category from redis
  await redisClient.del(generateRedisKey(id));

  return true;
};

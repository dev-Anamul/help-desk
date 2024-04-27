import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { generateRedisKey } from '@/utils/redis-key';

export const deleteSystem = async (id: string) => {
  // delete from database
  await prisma.system.delete({ where: { id } });

  // delete all systems from redis
  const keys = await redisClient.keys('system:pagination:*');

  if (keys?.length) {
    const pipeline = redisClient.pipeline();
    for (const key of keys) {
      pipeline.del(key);
    }
    await pipeline.exec();
  }

  // delete from redis
  await redisClient.del(generateRedisKey(id));

  // return true
  return true;
};

import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { UpdateSystem } from '@/schemas/update-schema';
import { generateRedisKey } from '@/utils/redis-key';

export const updateSystem = async (id: string, data: UpdateSystem) => {
  const updatedSystem = await prisma.system.update({
    where: { id },
    data: { ...data },
  });

  // clear redis cache
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

  // return the updated system
  return updatedSystem;
};

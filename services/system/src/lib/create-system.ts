import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { CreateSystem } from '@/schemas/create-schema';
import { generateRedisKey } from '@/utils/redis-key';

export const createSystem = async (data: CreateSystem) => {
  // save to database
  const newSystem = await prisma.system.create({ data });

  // delete all systems from redis
  const keys = await redisClient.keys('system:pagination:*');

  if (keys?.length) {
    const pipeline = redisClient.pipeline();
    for (const key of keys) {
      pipeline.del(key);
    }
    await pipeline.exec();
  }

  if (newSystem)
    // save to redis
    await redisClient.set(
      generateRedisKey(newSystem.id),
      JSON.stringify(newSystem),
      'EX',
      60 * 10
    );

  // return the new system
  return newSystem;
};

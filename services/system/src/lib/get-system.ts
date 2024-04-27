import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { generateRedisKey } from '@/utils/redis-key';

export const getSystem = async (id: string) => {
  // get system from redis
  const systemCache = await redisClient.get(generateRedisKey(id));

  // if system exists in cache
  if (systemCache) {
    return JSON.parse(systemCache);
  }

  // get system from database
  const system = await prisma.system.findUnique({ where: { id } });

  // save to redis
  if (system)
    await redisClient.set(
      generateRedisKey(system.id),
      JSON.stringify(system),
      'EX',
      60 * 10
    );

  // return the system
  return system;
};

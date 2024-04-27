import { prisma } from '@/prisma/prisma-client';
import { redisClient } from '@/redis';
import { UpdateCategory } from '@/schemas/update-category';

export const updateCategoryById = async (id: string, data: UpdateCategory) => {
  // update category
  const updateCategory = await prisma.category.update({ where: { id }, data });

  // delete all systems from redis
  const keys = await redisClient.keys('category:pagination:*');
  if (keys?.length) {
    const pipeline = redisClient.pipeline();
    for (const key of keys) {
      pipeline.del(key);
    }
    await pipeline.exec();
  }

  // clear cache from redis
  await redisClient.del(`category:${id}`);

  // return updated category
  return updateCategory;
};

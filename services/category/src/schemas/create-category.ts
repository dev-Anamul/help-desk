import { z } from 'zod';
import { CategorySchema } from './category-schema';

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
  description: true,
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

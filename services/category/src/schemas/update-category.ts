import { z } from 'zod';
import { CategorySchema } from './category-schema';

export const UpdateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

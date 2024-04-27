import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z
    .string()
    .transform((val) => Number(val))
    .default('1'),
  limit: z
    .string()
    .transform((val) => Number(val))
    .default('10'),
  order: z.enum(['asc', 'desc']).default('asc'),
  orderBy: z.string().default('id'),
  search: z.string().optional(),
  fields: z.string().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

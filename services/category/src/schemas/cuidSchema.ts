import { z } from 'zod';

export const CUIDSchema = z.object({
  id: z.string().cuid(),
});

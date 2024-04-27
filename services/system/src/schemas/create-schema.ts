import { z } from 'zod';
import { SystemSchema } from './system-schema';

export const CreateSystemSchema = SystemSchema.pick({
  name: true,
  url: true,
  owner: true,
  status: true,
  description: true,
});

export type CreateSystem = z.infer<typeof CreateSystemSchema>;

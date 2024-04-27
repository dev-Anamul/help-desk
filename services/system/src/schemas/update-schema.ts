import { z } from 'zod';
import { CreateSystemSchema } from './create-schema';

export const UpdateSystemSchema = CreateSystemSchema.partial();

export type UpdateSystem = z.infer<typeof UpdateSystemSchema>;

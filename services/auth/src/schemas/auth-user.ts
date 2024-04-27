import { z } from 'zod';
import { SignupSchema } from './signup';

export const CreateAuthUserSchema = SignupSchema.pick({
  email: true,
  password: true,
});

export type CreateAuthUser = z.infer<typeof CreateAuthUserSchema>;

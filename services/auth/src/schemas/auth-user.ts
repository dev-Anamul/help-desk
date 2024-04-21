import { SignupSchema } from './signup';

export const CreateAuthUserSchema = SignupSchema.pick({
  usernameOrEmail: true,
  password: true,
});

export type CreateAuthUser = (typeof CreateAuthUserSchema)['_output'];

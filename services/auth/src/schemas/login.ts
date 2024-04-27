import { SignupSchema } from './signup';

export const LoginSchema = SignupSchema.pick({
  email: true,
  password: true,
});

export type Login = (typeof LoginSchema)['_output'];

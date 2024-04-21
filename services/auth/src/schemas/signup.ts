import * as z from 'zod';

export const SignupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(10),
  usernameOrEmail: z.union([
    z
      .string({ invalid_type_error: 'Invalid username or email' })
      .regex(/^[a-zA-Z0-9]([_-](?![_-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, {
        message: 'Invalid username or email',
      }),
    z
      .string({ invalid_type_error: 'Invalid username or email' })
      .email({ message: 'Invalid username or email' }),
  ]),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const RefineSignupSchema = SignupSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export type Signup = z.infer<typeof SignupSchema>;

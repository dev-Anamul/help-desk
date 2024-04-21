import { z } from 'zod';

export const UserSchema = z.object({
  authId: z.string(),
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
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  avatar: z.string().optional(),
  phone: z.string().min(10),
  address: z.string().min(10),
});

export type User = z.infer<typeof UserSchema>;

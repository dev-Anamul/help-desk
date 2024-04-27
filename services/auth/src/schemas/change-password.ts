import { z } from 'zod';

// change password schema
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

// change password by ID schema
export const changePasswordByIdSchema = z.object({
  id: z.string().uuid(),
  password: z.string(),
});

// change password by email schema
export const changePasswordByEmailSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// refine change password schema
export const RefineChangePasswordSchema = ChangePasswordSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

// type of change password input
export type ChangePasswordInput = z.infer<typeof RefineChangePasswordSchema>;
export type ChangePasswordById = z.infer<typeof changePasswordByIdSchema>;
export type ChangePasswordByEmail = z.infer<typeof changePasswordByEmailSchema>;

import { RefineChangePasswordSchema } from '@/schemas/change-password';
import { NextFunction, Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from '@/middlewares/authenticate';
import { AppError } from '@/utils/appError';
import { changePassword, userById } from '@/lib';
import { asyncHandler } from '@/utils/asyncHandler';

export const changePasswordHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // validate request body
    const data = RefineChangePasswordSchema.safeParse(req.body);

    // if validation fails, return error
    if (!data.success)
      return res.status(400).json({ message: data.error.errors });

    // get user by id
    const userId = req?.headers?.['x-user-id'];
    const user = await userById(userId as string);

    // check if user exists
    if (!user) return next(new AppError('User not found', 404));

    // check if current password is correct
    const passwordMatch = await bcrypt.compare(
      data.data.currentPassword,
      user?.password
    );

    // if password is incorrect, return error
    if (!passwordMatch)
      return next(new AppError('Invalid current password', 400));

    // change password
    await changePassword({
      id: user.id,
      password: data.data.newPassword,
    });

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Password changed successfully. Please login again.',
    };

    // return response
    return res.status(200).json(response);
  }
);

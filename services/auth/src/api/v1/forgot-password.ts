import { userByEmail } from '@/lib';
import { ForgotPasswordSchema } from '@/schemas/forgot-password';
import { AppError } from '@/utils/appError';
import { asyncHandler } from '@/utils/asyncHandler';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import * as authService from '@/lib';

export const forgotPasswordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request body
    const data = ForgotPasswordSchema.safeParse(req.body);

    // if validation fails, return error
    if (!data.success)
      return res.status(400).json({ message: data.error.errors });

    // find user by email
    const user = await userByEmail(data.data.email);

    // if user not found, return error
    if (!user) return res.status(404).json({ message: 'User not found' });

    // generate password reset token
    const resetToken = randomBytes(32).toString('hex');

    // send password reset link to user's email
    try {
      await axios.post(
        `${process.env.NOTIFICATION_SERVICE_URL}/api/v1/reset-password`,
        {
          email: user.email,
          resetToken,
        }
      );
    } catch (error) {
      // send
    }

    // create verification record
    await authService.createVerification({
      code: resetToken,
      email: data?.data?.email,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60)?.toISOString(),
    });

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Password reset link sent to your email',
    };

    // return success response
    return res.status(200).json(response);
  }
);

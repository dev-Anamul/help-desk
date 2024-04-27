import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { RefineResetPasswordSchema } from '@/schemas/reset-password';
import {
  deleteVerification,
  findNotExpiredVerification,
} from '@/lib/verification/find-single';
import { changePasswordByEmail } from '@/lib';
import { generateValidationResponse } from '@/utils/format-zod-errors';

export const resetPasswordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = RefineResetPasswordSchema.safeParse(req.body);

    if (!data.success)
      return res
        .status(400)
        .json(generateValidationResponse(data.error.errors));

    // read and check verification code
    const verification = await findNotExpiredVerification({
      code: data.data.token,
      email: data.data.email,
    });

    // if verification code is invalid or expired, return error
    if (!verification)
      return res.status(400).json({ message: 'Invalid or expired token' });

    // update user password
    await changePasswordByEmail({
      email: data.data.email,
      password: data.data.password,
    });

    // delete verification record
    await deleteVerification(verification.id);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Password reset successful',
    };

    return res.status(200).json(response);
  }
);

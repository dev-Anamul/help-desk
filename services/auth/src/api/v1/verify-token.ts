import { VerifyTokenSchema } from '@/schemas/verify-token';
import { verifyToken } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AppError } from '@/utils/appError';
import { userById } from '@/lib/get-single-user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Auth } from '@prisma/client';
import { generateValidationResponse } from '@/utils/format-zod-errors';

type payload = {
  id: string;
  usernameOrEmail: string;
  role: string;
};

export const verifyTokenHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // validate request body
    const data = VerifyTokenSchema.safeParse(req.body);

    // check if validation failed
    if (!data.success) {
      res.status(400).json(generateValidationResponse(data.error.errors));
      return;
    }

    // verify token
    let decoded: JwtPayload | string = '';
    try {
      decoded = verifyToken(data.data.token);
    } catch (error) {
      next(new AppError('Invalid token or expired', 404));
      return;
    }
    // verify token

    // get user details
    let user: Auth | null = null;
    if (typeof decoded !== 'string') user = await userById(decoded.id);

    // check if user exists
    if (!user) {
      next(new AppError('Invalid token or expired', 404));
      return;
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Token verified successfully',
      user,
    };
    // validate token
    res.status(200).json(response);
  }
);

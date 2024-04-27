import { userById } from '@/lib/get-single-user';
import { verifyToken } from '@/utils';
import { AppError } from '@/utils/appError';
import { Auth } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    // take token from headers
    const token = req.headers?.['authorization']?.split(' ')[1];

    // if token is not present
    if (!token) {
      next(new AppError('Please login to access', 401));
      return;
    }

    // verify token
    const decoded = verifyToken(token);

    // get user details
    let user: Auth | null = null;
    if (typeof decoded !== 'string') user = await userById(decoded.id);

    // check if user exists
    if (!user) {
      next(new AppError('Invalid token or expired', 404));
      return;
    }

    // generate response
    req.user = user;

    // pass control to next middleware
    return next();
  } catch (error) {
    next(new AppError('Invalid token or expired', 401));
  }
};

import { userByEmail } from '@/lib';
import { LoginSchema } from '@/schemas';
import { AppError } from '@/utils';
import { Response, Request, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { generateToken } from '@/utils';
import { generateValidationResponse } from '@/utils';

export const loginHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //validate request body
    const data = LoginSchema.safeParse(req.body);

    //check if validation failed
    if (!data.success) {
      res.status(400).json(generateValidationResponse(data.error.errors));
      return;
    }

    // get user by username or email
    const user = await userByEmail(data.data.email);
    if (!user) {
      next(new AppError('User not found', 404));
      return;
    }

    // check password
    const passwordMatch = await bcrypt.compare(
      data.data.password,
      user.password
    );
    if (!passwordMatch) {
      next(new AppError('Invalid credentials', 400));
      return;
    }

    // generate jwt token
    const jwtToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // define response
    const response = {
      code: 200,
      status: 'success',
      message: 'Login successful',
      token: jwtToken,
    };

    // return response
    res.status(200).json(response);
  }
);

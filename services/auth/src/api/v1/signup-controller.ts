import { createAuthUser } from '@/lib/create-user';
import { RefineSignupSchema, SignupSchema } from '@/schemas/signup';
import { generateToken } from '@/utils';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as producers from '../../producers';
import { userByEmail } from '@/lib/get-single-user';
import { AppError } from '@/utils/appError';
import { generateValidationResponse } from '@/utils/format-zod-errors';

// signup handler
export const signupHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // validate request body
    const data = RefineSignupSchema.safeParse(req.body);

    // check if validation failed
    if (!data.success) {
      res.status(400).json(generateValidationResponse(data.error.errors));
      return;
    }

    // check if user already exists
    const currentUser = await userByEmail(data.data.email);
    if (currentUser) {
      next(new AppError('User already exists', 400));
      return;
    }

    // create auth user
    const authUser = await createAuthUser(data.data);

    // create user payload
    await axios.post(process.env.USER_SERVICE_URL + '/api/v1/', {
      ...data.data,
      authId: authUser.id,
    });

    // generate jwt token
    const jwtToken = generateToken({
      id: authUser.id,
      email: data.data.email,
      role: authUser.role,
    });

    // define response
    const response = {
      code: 200,
      status: 'success',
      message: 'Signup successful',
      token: jwtToken,
    };

    // return response
    res.status(200).json(response);

    // send welcome message
    producers.welcomeProducer({ message: 'Welcome to the platform' });
  }
);

import { createAuthUser } from '@/lib/create-user';
import { SignupSchema } from '@/schemas/signup';
import { generateToken } from '@/utils';
import axios from 'axios';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as producers from '../../producers';

export const signupHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request body
    const data = SignupSchema.safeParse(req.body);

    // check if validation failed
    if (!data.success) {
      res.status(400).json(data.error.errors);
      return;
    }

    console.log('data', data.data);

    // create auth user
    const authUser = await createAuthUser(data.data);

    // create user payload
    await axios.post(process.env.USER_SERVICE_URL + '/api/v1/', {
      ...data.data,
      authId: authUser.id,
    });

    // const jwtToken = 'token';
    // generate jwt token
    const jwtToken = generateToken({
      id: authUser.id,
      usernameOrEmail: data.data.usernameOrEmail,
      role: authUser.role,
    });

    console.log('jwtToken', jwtToken);

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

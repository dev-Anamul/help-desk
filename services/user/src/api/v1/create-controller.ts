import * as userServices from '@/lib';
import { UserSchema } from '@/schemas/user';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const createHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request body
    const data = UserSchema.safeParse(req.body);

    // check if validation failed
    if (!data.success) {
      res.status(400).json(data.error.errors);
      return;
    }

    // call user service to create user
    const newUser = await userServices.createUser(data.data);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'User created successfully',
      data: {
        user: newUser,
      },
    };

    // return response
    res.status(200).json(response);
  }
);

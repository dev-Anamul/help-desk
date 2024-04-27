import { userById } from '@/lib';
import { UpdateUserSchema } from '@/schemas/update-user';
import { AppError } from '@/utils/appError';
import { asyncHandler } from '@/utils/asyncHandler';
import { generateValidationResponse } from '@/utils/format-zod-errors';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const updateProfileHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // validate the request body
    const data = UpdateUserSchema.safeParse(req.body);

    // if validation fails, return error
    if (!data.success) {
      return res
        .status(400)
        .json(generateValidationResponse(data.error.errors));
    }

    // extract user id from request headers
    const userId = req?.headers?.['x-user-id'];

    // find user by id
    const authUser = await userById(userId as string);

    // check if user exists
    if (!authUser) {
      return next(new AppError('User not found', 404));
    }

    // call user service to update user profile
    let updatedUser;
    try {
      const response = await axios.patch(
        process.env.USER_SERVICE_URL + '/api/v1/' + userId,
        data.data
      );

      console.log('response', response.data.data.user);

      updatedUser = response.data.data.user;
    } catch (error) {
      console.log('error', error);
      return next(new AppError('Failed to update user profile', 500));
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          ...(authUser || {}),
          ...(updatedUser || {}),
        },
      },
    };
    // update user profile
    return res.status(200).json(response);
  }
);

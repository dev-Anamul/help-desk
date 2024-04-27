import { userById } from '@/lib';
import { AuthenticatedRequest } from '@/middlewares/authenticate';
import { asyncHandler } from '@/utils/asyncHandler';
import axios from 'axios';
import { Request, Response } from 'express';

export const userInfoHandler = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // extract user id from request headers
    const userId = req?.headers?.['x-user-id'];

    // get user by id
    const user = await userById(userId as string);

    // fetch user info from user service
    let userInfo: any | null = null;
    try {
      const res = await axios.get(
        `${process.env.USER_SERVICE_URL}/api/v1/${userId}`
      );
      if (res.status === 200) {
        userInfo = res?.data?.data;
      }
    } catch (error) {
      // do nothing
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'User info fetched successfully',
      user: {
        ...user,
        ...(userInfo ? userInfo : {}),
      },
    };

    // return response
    return res.status(200).json(response);
  }
);

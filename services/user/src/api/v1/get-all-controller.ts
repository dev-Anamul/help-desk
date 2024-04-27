import { PaginationSchema } from '@/schemas';
import { Request, Response } from 'express';
import * as userService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const getAllHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const pagination = PaginationSchema.safeParse(req.query);

    if (!pagination.success) {
      return res.status(400).json({ errors: pagination.error });
    }

    // get all user
    const users = await userService.getAllUsers(pagination.data);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    };

    // send response
    return res.status(200).json(response);
  }
);

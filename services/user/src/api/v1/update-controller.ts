import { CUIDSchema } from '@/schemas/cuid-schema';
import { UpdateUserSchema } from '@/schemas/update-user';
import { Request, Response } from 'express';
import * as userService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const updateHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request params
    const params = CUIDSchema.safeParse(req.params);

    // check if validation failed
    if (!params.success) {
      res.status(400).json(params.error.errors);
      return;
    }

    // validate request body
    const data = UpdateUserSchema.safeParse(req.body);

    // check if validation failed
    if (!data.success) {
      res.status(400).json(data.error.errors);
      return;
    }

    // update the user
    const updatedUser = await userService.updateUser(params.data.id, data.data);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      },
    };

    // return response
    return res.status(200).json(response);
  }
);

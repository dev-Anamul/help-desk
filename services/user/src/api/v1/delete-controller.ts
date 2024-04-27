import { CUIDSchema } from '@/schemas/cuid-schema';
import { Request, Response } from 'express';
import * as userService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const deleteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // const validate request params
    const params = CUIDSchema.safeParse(req.params);

    // check if validation failed
    if (!params.success) {
      res.status(400).json(params.error.errors);
      return;
    }

    // delete user
    await userService.deleteUserByAuthId(params.data.id);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'User deleted successfully',
    };

    // return response
    return res.status(200).json(response);
  }
);

import { singleUserByEmail, userByAuthId } from '@/lib/single-user';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const userByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userByAuthId(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const response = {
      code: 200,
      status: 'success',
      message: 'Successfully fetched user by id',
      data: user,
    };

    return res.status(200).json(response);
  }
);

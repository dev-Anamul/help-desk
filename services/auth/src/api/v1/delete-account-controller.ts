import { Request, Response } from 'express';
import * as producers from '../../producers';
import { deleteAuthUser } from '@/lib';
import axios from 'axios';
import { asyncHandler } from '@/utils';

export const deleteAccountHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // extract user id from request headers
    const userId = req?.headers?.['x-user-id'];

    // delete auth user
    await deleteAuthUser(userId as string);

    // call user service to delete user
    await axios.delete(process.env.USER_SERVICE_URL + '/api/v1/' + userId);

    // publish message to the queue
    producers.deleteAccountProducer({ message: 'Account deleted' });

    // return response
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Account deleted successfully',
    });
  }
);

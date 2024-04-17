import { Request, Response } from 'express';
import * as producers from '../../producers';

export const deleteAccountHandler = (req: Request, res: Response) => {
  // publish message to the queue
  producers.deleteAccountProducer({ message: 'Account deleted' });

  // return response
  return res.status(200).json({
    message: 'Account deleted successfully',
  });
};

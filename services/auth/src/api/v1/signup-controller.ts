import { Request, Response } from 'express';
import * as producers from '../../producers';

export const signupHandler = (req: Request, res: Response) => {
  // publish message to the queue
  producers.welcomeProducer({ message: 'Welcome to the platform' });

  // return response
  return res.status(200).json({
    message: 'Signup successful',
  });
};

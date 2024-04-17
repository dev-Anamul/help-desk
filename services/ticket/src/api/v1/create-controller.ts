import { Request, Response } from 'express';
import * as producers from '../../producers';

export const createHandler = async (req: Request, res: Response) => {
  // publish message to the queue
  producers.createTicketProducer({ message: 'Ticket created' });

  // return response
  return res.status(200).json({ message: 'Ticket created' });
};

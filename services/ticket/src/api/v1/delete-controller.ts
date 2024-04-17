import { Request, Response } from 'express';
import * as producers from '../../producers';

export const deleteHandler = async (req: Request, res: Response) => {
  // publish message to the queue
  producers.deleteTicketProducer({ message: 'Ticket deleted' });

  return res.status(200).json({ message: 'Ticket deleted' });
};

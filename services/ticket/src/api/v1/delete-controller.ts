import { Request, Response } from 'express';
import * as producers from '../../producers';
import { CUIDSchema } from '@/schemas/cuid-schema';
import * as ticketService from '@/lib';

export const deleteHandler = async (req: Request, res: Response) => {
  // validate the request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // delete the ticket
  await ticketService.deleteTicket(params.data.id);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket deleted successfully',
  };

  // publish message to the queue
  producers.deleteTicketProducer({ message: 'Ticket deleted' });

  return res.status(200).json(response);
};

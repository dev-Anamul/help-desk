import { Request, Response } from 'express';
import * as producers from '../../producers';
import { CreateTicketSchema } from '@/schemas/create-ticket-schema';
import * as ticketService from '@/lib';

export const createHandler = async (req: Request, res: Response) => {
  // validate the request body
  const ticketData = CreateTicketSchema.safeParse(req.body);

  // if validation fails, return an error
  if (!ticketData.success) {
    return res.status(400).json({ errors: ticketData.error });
  }

  // create the ticket
  const ticket = await ticketService.createTicket(ticketData.data);

  // generate response
  const response = {
    code: 201,
    status: 'success',
    message: 'Ticket created successfully',
    data: ticket,
  };

  // publish message to the queue
  producers.createTicketProducer({ message: 'Ticket created' });

  // return response
  return res.status(200).json(response);
};

import { Request, Response } from 'express';
import { CUIDSchema } from '@/schemas/cuid-schema';
import { UpdateTicketSchema } from '@/schemas/update-ticket-schema';
import * as ticketService from '@/lib';

export const updateHandler = async (req: Request, res: Response) => {
  console.log('Request URL:', req.originalUrl);

  // validate request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // validate request body
  const ticketData = UpdateTicketSchema.safeParse(req.body);

  // if validation fails, return an error
  if (!ticketData.success) {
    return res.status(400).json({ errors: ticketData.error });
  }

  // update the ticket
  const updatedTicket = await ticketService.updateTicket(
    params.data.id,
    ticketData.data
  );

  // publish message to the queue
  // producers.updateTicketProducer({ message: 'Ticket updated' });

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket updated successfully',
    data: {
      ticket: updatedTicket,
    },
  };
  return res.status(200).json(response);
};

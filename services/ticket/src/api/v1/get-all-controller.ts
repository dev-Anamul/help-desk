import { PaginationSchema } from '@/schemas/pagination-schema';
import { Request, Response } from 'express';
import * as ticketService from '@/lib';

export const getAllHandler = async (req: Request, res: Response) => {
  // validate the query params
  const pagination = PaginationSchema.safeParse(req.query);

  // if validation fails, return an error
  if (!pagination.success) {
    return res.status(400).json({ errors: pagination.error });
  }

  // get all tickets
  const tickets = await ticketService.getTickets(pagination.data);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Tickets retrieved successfully',
    data: tickets,
  };

  return res.status(200).json(response);
};

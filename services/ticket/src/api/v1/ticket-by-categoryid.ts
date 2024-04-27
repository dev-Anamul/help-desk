import { CUIDSchema } from '@/schemas/cuid-schema';
import { Request, Response } from 'express';
import * as ticketService from '@/lib';

export const ticketsByCategoryHandler = async (req: Request, res: Response) => {
  // validate request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // get ticket by category id
  const ticket = await ticketService.ticketByCategory(params.data.id);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket by category',
    data: ticket,
  };

  // return response
  return res.status(200).json(response);
};

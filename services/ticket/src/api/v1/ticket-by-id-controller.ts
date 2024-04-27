import { Request, Response } from 'express';
import { CUIDSchema } from '@/schemas/cuid-schema';
import * as ticketService from '@/lib';

export const ticketByIdHandler = async (req: Request, res: Response) => {
  // validate the request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // get ticket by id
  const ticket = await ticketService.ticketById(params.data.id);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket retrieved successfully',
    data: {
      ticket,
    },
  };

  // return response
  return res.status(200).json(response);
};

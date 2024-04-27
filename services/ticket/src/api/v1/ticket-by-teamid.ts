import { Request, Response } from 'express';
import { CUIDSchema } from '@/schemas/cuid-schema';
import * as ticketService from '@/lib';

export const ticketsByTeamHandler = async (req: Request, res: Response) => {
  // validate request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // get ticket by team id
  const ticket = await ticketService.ticketsByTeam(params.data.id);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket by team',
    data: ticket,
  };

  // return response
  return res.status(200).json(response);
};

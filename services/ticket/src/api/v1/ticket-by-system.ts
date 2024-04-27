import { CUIDSchema } from '@/schemas/cuid-schema';
import { Request, Response } from 'express';
import * as ticketService from '@/lib';

export const ticketsBySystemHandler = async (req: Request, res: Response) => {
  // validate request params
  const params = CUIDSchema.safeParse(req.params);

  // if validation fails, return an error
  if (!params.success) {
    return res.status(400).json({ errors: params.error });
  }

  // get the system by ticket
  const system = await ticketService.ticketsBySystem(params.data.id);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'System retrieved successfully',
    data: {
      system: system,
    },
  };

  return res.status(200).json(response);
};

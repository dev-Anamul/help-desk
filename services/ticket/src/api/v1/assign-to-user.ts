import { AssignToUserSchema } from '@/schemas/assign-ticket';
import { Request, Response } from 'express';
import * as ticketService from '@/lib';

export const assignToUserHandler = async (req: Request, res: Response) => {
  // validate request body
  const requestData = AssignToUserSchema.safeParse(req.body);

  // if validation fails, return an error
  if (!requestData.success) {
    return res.status(400).json({ errors: requestData.error });
  }

  // assign ticket to user
  await ticketService.assignToUser(requestData.data);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket assigned to user',
  };

  // return response
  return res.status(200).json(response);
};

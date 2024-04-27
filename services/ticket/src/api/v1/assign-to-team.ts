import { AssignToTeamSchema } from '@/schemas/assign-ticket';
import { Request, Response } from 'express';
import * as ticketService from '@/lib';
import axios from 'axios';

export const assignToTeamHandler = async (req: Request, res: Response) => {
  // validate the request body
  const input = AssignToTeamSchema.safeParse(req.body);

  // if validation fails, return an error
  if (!input.success) {
    return res.status(400).json({ errors: input.error });
  }

  // check if the team is valid
  // call the team service to check if the team exists
  const team = await axios.get(
    `${process.env?.TEAM_SERVICE_URL}/api/v1/${input.data.teamId}`
  );

  if (team.status !== 200) {
    return res.status(400).json({
      message: 'Team does not exist',
    });
  }

  // assign the ticket to the team
  await ticketService.assignToTeam(input.data);

  // generate response
  const response = {
    code: 200,
    status: 'success',
    message: 'Ticket assigned to team successfully',
  };

  return res.status(200).json(response);
};

import { CreateTeamSchema } from '@/schemas/team';
import { Request, Response } from 'express';
import { teamService } from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const createHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate the request body
    const data = CreateTeamSchema.safeParse(req.body);

    // if the data is invalid, return a 400 response
    if (!data.success) {
      return res.status(400).json({ message: data.error.errors });
    }

    // create the team
    const newTeam = await teamService.createTeam(data.data);

    // generate response
    const response = {
      code: 201,
      status: 'success',
      message: 'Team created successfully',
      data: newTeam,
    };

    // return the response
    return res.status(201).json(response);
  }
);

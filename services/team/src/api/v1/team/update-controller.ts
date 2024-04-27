import { teamService } from '@/lib';
import { CUIDSchema } from '@/schemas/member/cuid-schema';
import { UpdateTeamSchema } from '@/schemas/team';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const updateHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate params
    const params = CUIDSchema.safeParse(req.params);

    if (!params.success) {
      return res
        .status(400)
        .json({ message: `Invalid team ID: ${req?.params?.id}` });
    }

    // validate request body
    const data = UpdateTeamSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // update team
    const updatedTeam = await teamService.updateTeam(params.data.id, data.data);

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Team updated successfully',
      data: updatedTeam,
    };

    // return the response
    return res.status(200).json(response);
  }
);

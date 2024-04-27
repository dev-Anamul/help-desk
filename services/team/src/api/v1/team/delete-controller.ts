import { teamService } from '@/lib';
import { CUIDSchema } from '@/schemas/member/cuid-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const deleteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const params = CUIDSchema.safeParse(req.params);

    if (!params.success) {
      return res
        .status(400)
        .json({ message: `Invalid team ID: ${req?.params?.id}` });
    }

    const team = await teamService.teamById(params.data.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    await teamService.deleteTeam(params.data.id);

    const response = {
      code: 200,
      status: 'success',
      message: 'Team deleted successfully',
    };

    return res.status(200).json(response);
  }
);

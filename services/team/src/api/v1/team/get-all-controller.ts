import { teamService } from '@/lib';
import { PaginationSchema } from '@/schemas/pagination-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const getAllHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const pagination = PaginationSchema.safeParse(req.query);

    if (!pagination.success) {
      return res.status(400).json({ error: pagination.error });
    }

    const teams = await teamService.getTeams(pagination.data);

    const response = {
      code: 200,
      status: 'success',
      message: 'Teas fetched successfully',
      data: teams,
    };

    return res.status(200).json(response);
  }
);

import { PaginationSchema } from '@/schemas/pagination-schema';
import { Request, Response } from 'express';
import * as systemService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const getAllHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate query params
    const pagination = PaginationSchema.safeParse(req.query);

    // check if query params are valid
    if (!pagination.success) {
      return res.status(400).json({ error: pagination.error });
    }

    // get all systems
    const systems = await systemService.getSystems(pagination.data);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      data: systems,
    };

    // return the response
    return res.status(200).json(response);
  }
);

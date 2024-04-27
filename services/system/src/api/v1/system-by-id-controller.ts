import { CUIDSchema } from '@/schemas';
import { Request, Response } from 'express';
import * as systemService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const systemByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate the request params
    const params = CUIDSchema.safeParse(req.params);

    // if the data is invalid, return a 400 response
    if (!params.success) {
      return res
        .status(400)
        .json({ message: `Invalid system ID: ${req?.params?.id}` });
    }

    // get the system by id
    const system = await systemService.getSystem(params.data.id);

    // if the system is not found, return a 404 response
    if (!system) {
      return res.status(404).json({ message: 'System not found' });
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'System fetched successfully',
      data: system,
    };

    // return the response
    return res.status(200).json(response);
  }
);

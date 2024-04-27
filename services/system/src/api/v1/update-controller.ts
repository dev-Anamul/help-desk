import { CUIDSchema, UpdateSystemSchema } from '@/schemas';
import { Request, Response } from 'express';
import * as systemService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const updateHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate the query params
    const params = CUIDSchema.safeParse(req.params);

    // if the data is invalid, return a 400 response
    if (!params.success) {
      return res
        .status(400)
        .json({ message: `Invalid system ID: ${req?.params?.id}` });
    }

    // validate the request body
    const data = UpdateSystemSchema.safeParse(req.body);

    // if the data is invalid, return a 400 response
    if (!data.success) {
      return res.status(400).json({ message: data.error.errors });
    }

    // update the system
    const updateSystem = await systemService.updateSystem(
      params?.data?.id,
      data.data
    );

    // if the system is not found, return a 404 response
    if (!updateSystem) {
      return res.status(404).json({ message: 'System not found' });
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'System updated successfully',
      data: updateSystem,
    };

    // return the response
    return res.status(200).json(response);
  }
);

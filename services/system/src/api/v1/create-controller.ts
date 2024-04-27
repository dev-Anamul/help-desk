import { CreateSystemSchema } from '@/schemas/create-schema';
import { Request, Response } from 'express';
import * as systemService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const createHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate the request body
    const data = CreateSystemSchema.safeParse(req.body);

    // if the data is invalid, return a 400 response
    if (!data.success) {
      return res.status(400).json(data.error.errors);
    }

    // create the system
    const system = await systemService.createSystem(data.data);

    // generate response
    const response = {
      code: 201,
      status: 'success',
      message: 'System created successfully',
      data: system,
    };

    // createSystem(data.data);
    return res.status(201).json(response);
  }
);

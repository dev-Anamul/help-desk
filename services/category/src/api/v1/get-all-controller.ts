import { PaginationSchema } from '@/schemas';
import { Request, Response } from 'express';
import * as categoryService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const getAllHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate query params
    const pagination = PaginationSchema.safeParse(req.query);

    console.log(pagination);

    // check if pagination is valid
    if (!pagination.success) {
      return res.status(400).json({ message: pagination.error.errors });
    }

    // get all categories
    const categories = await categoryService.getCategories(pagination.data);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Categories fetched successfully',
      data: categories,
    };

    // send response
    return res.status(200).json(response);
  }
);

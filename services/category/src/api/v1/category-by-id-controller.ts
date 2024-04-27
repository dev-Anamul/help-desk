import { CUIDSchema } from '@/schemas';
import { Request, Response } from 'express';
import * as categoryService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const categoryByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate param
    const params = CUIDSchema.safeParse(req.params);

    // check if id is valid
    if (!params.success)
      return res.status(400).json({ message: params.error.errors });

    // get category by id
    const category = await categoryService.categoryById(params?.data?.id);

    // check if category exists
    if (!category)
      return res.status(404).json({ message: 'Category not found' });

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Category fetched successfully',
      data: category,
    };

    // send response
    return res.status(200).json(response);
  }
);

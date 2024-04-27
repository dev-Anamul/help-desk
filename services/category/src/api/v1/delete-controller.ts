import { CUIDSchema } from '@/schemas/cuidSchema';
import { Request, Response } from 'express';
import * as categoryService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const deleteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate params
    const params = CUIDSchema.safeParse(req.params);

    // check if id is valid
    if (!params.success) {
      return res.status(400).json({ message: params.error.errors });
    }

    // delete category
    await categoryService.deleteCategoryById(params.data.id);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Category deleted successfully',
    };

    // send response
    return res.status(200).json(response);
  }
);

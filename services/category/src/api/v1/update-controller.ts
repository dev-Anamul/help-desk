import { CUIDSchema } from '@/schemas/cuidSchema';
import { UpdateCategorySchema } from '@/schemas/update-category';
import { Request, Response } from 'express';
import * as categoryService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const updateHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate params id
    const id = CUIDSchema.safeParse(req.params);

    // check if id is valid
    if (!id.success) {
      return res.status(400).json({ message: id.error.errors });
    }

    // validate request body
    const data = UpdateCategorySchema.safeParse(req.body);

    // check if data is valid
    if (!data.success) {
      return res.status(400).json({ message: data.error.errors });
    }

    // update category
    const category = await categoryService.updateCategoryById(
      id.data.id,
      data.data
    );

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Category updated successfully',
      data: category,
    };

    // send response
    return res.status(200).json(response);
  }
);

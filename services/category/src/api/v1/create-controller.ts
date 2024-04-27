import { CreateCategorySchema } from '@/schemas/create-category';
import { Request, Response } from 'express';
import * as categoryService from '@/lib';
import { asyncHandler } from '@/utils/async-handler';

export const createHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request body
    const data = CreateCategorySchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({ message: data.error.errors });
    }

    // create category
    const category = await categoryService.createCategory(data.data);

    // generate response
    const response = {
      code: 201,
      status: 'success',
      message: 'Category created successfully',
      data: category,
    };

    // send response
    return res.status(201).json(response);
  }
);

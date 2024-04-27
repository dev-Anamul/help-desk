import { CUIDSchema } from '@/schemas';
import { asyncHandler } from '@/utils/async-handler';
import axios from 'axios';
import { Request, Response } from 'express';

export const categoryByTicketHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate params
    const params = CUIDSchema.safeParse(req.params);

    // check if id is valid
    if (!params.success) {
      return res.status(400).json({ message: params.error.errors });
    }

    // get tickets by category id
    const response = await axios.get(
      `${process.env.TICKET_SERVICE_URL}/api/v1/categories/${params?.data?.id}/tickets`
    );

    // send response
    return res.status(response.status).json(response.data);
  }
);

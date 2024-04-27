import { CUIDSchema } from '@/schemas';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';
import axios from 'axios';

export const ticketBySystemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate the request params
    const params = CUIDSchema.safeParse(req.params);

    // if validation fails, return an error
    if (!params.success) {
      return res.status(400).json({ errors: params.error });
    }

    // call tickets service to get tickets by system
    const response = await axios.get(
      `${process.env.TICKET_SERVICE_URL}/api/v1/systems/${params?.data?.id}/tickets`
    );

    // return response
    return res.status(response.status).json(response?.data);
  }
);

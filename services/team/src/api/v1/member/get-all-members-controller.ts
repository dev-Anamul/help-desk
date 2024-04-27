import { memberService } from '@/lib';
import { CUIDSchema } from '@/schemas/member/cuid-schema';
import { PaginationSchema } from '@/schemas/pagination-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const getAllMembersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request params
    const params = CUIDSchema.safeParse(req.params);

    // If the request parameters are invalid, return an error response
    if (!params.success) {
      return res.status(400).json(params.error.errors);
    }

    // Validate the request query
    const paginationData = PaginationSchema.safeParse(req.query);

    // If the request query is invalid, return an error response
    if (!paginationData.success) {
      return res.status(400).json(paginationData.error.errors);
    }

    // Get all members
    const members = await memberService.membersByTeamId(
      params.data.id,
      paginationData.data
    );

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Members fetched successfully',
      data: members,
    };

    // send response
    return res.status(200).json(response);
  }
);

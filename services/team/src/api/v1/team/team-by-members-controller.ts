import { memberService } from '@/lib';
import { CUIDSchema } from '@/schemas/member/cuid-schema';
import { PaginationSchema } from '@/schemas/pagination-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const teamByMembersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate the request params
    const params = CUIDSchema.safeParse(req.params);

    if (!params.success) {
      return res
        .status(400)
        .json({ message: `Invalid team ID: ${req?.params?.id}` });
    }

    // validate the request query
    const paginationData = PaginationSchema.safeParse(req.query);

    if (!paginationData.success) {
      return res.status(400).json(paginationData.error.errors);
    }

    // find the members of team by id
    const members = await memberService.membersByTeamId(
      params.data.id,
      paginationData.data
    );

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Team fetched successfully',
      data: members,
    };

    // send response
    return res.status(200).json(response);
  }
);

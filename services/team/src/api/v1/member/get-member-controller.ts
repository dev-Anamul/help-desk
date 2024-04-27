import { memberService } from '@/lib';
import { TeamAndMemberIdSchema } from '@/schemas/team-and-member-id-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const getMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request params
    const params = TeamAndMemberIdSchema.safeParse(req.params);

    // If the request parameters are invalid, return an error response
    if (!params.success) {
      return res.status(400).json(params.error.errors);
    }

    // Get member by id
    const member = await memberService.memberByTeamIdUserId(
      params.data.id,
      params.data.member_id
    );

    // If member is not found, return an error response
    if (!member) {
      return res.status(404).json({
        code: 404,
        status: 'error',
        message: 'Member not found',
      });
    }

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Member fetched successfully',
      data: member,
    };

    // send response
    return res.status(200).json(response);
  }
);

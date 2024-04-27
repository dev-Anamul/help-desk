import { memberService } from '@/lib';
import { TeamAndMemberIdSchema } from '@/schemas/team-and-member-id-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const deleteMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate the request parameters
    const params = TeamAndMemberIdSchema.safeParse(req.params);

    // If the request parameters are invalid, return an error response
    if (!params.success) {
      return res.status(400).json(params.error.errors);
    }

    // Check if the member exists
    const member = await memberService.memberByTeamIdUserId(
      params.data.id,
      params.data.member_id
    );

    // If the member does not exist, return an error response
    if (!member) {
      return res.status(400).json({
        message: 'Member does not exist',
      });
    }

    // Delete the member
    await memberService.deleteMember(params?.data?.id, params.data.member_id);

    // generate response
    const response = {
      code: 200,
      status: 'success',
      message: 'Member deleted successfully',
    };

    res.json(response);
  }
);

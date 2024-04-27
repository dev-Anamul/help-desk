import { CreateMemberSchema } from '@/schemas/member';
import { TeamAndMemberIdSchema } from '@/schemas/team-and-member-id-schema';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';
import { memberService } from '@/lib';
import { Member } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { CUIDSchema } from '@/schemas/member/cuid-schema';

type User = {
  name: string;
  email: string;
};

export const createMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate the request parameters
    const params = CUIDSchema.safeParse(req.params);

    // If the request parameters are invalid, return an error response
    if (!params.success) {
      return res.status(400).json(params.error.errors);
    }

    // Validate the request body
    const memberData = CreateMemberSchema.safeParse(req.body);

    // If the request body is invalid, return an error response
    if (!memberData.success) {
      return res.status(400).json(memberData.error.errors);
    }

    // if provided isLeader is true, check if team already has a leader
    let teamLeader: Member | null = null;
    if (memberData.data.isLeader) {
      teamLeader = await memberService.findTeamLeader(params.data.id);
    }

    // If team already has a leader, return an error response
    if (teamLeader) {
      return res.status(400).json({
        message: 'Team already has a leader',
      });
    }

    // check if member already exists in the team
    const existingMember = await memberService.memberByTeamIdUserId(
      params.data.id,
      memberData.data.userId
    );

    // If member already exists in the team, return an error response
    if (existingMember) {
      return res.status(400).json({
        message: 'Member already exists in the team',
      });
    }

    // Create the member
    const member = await memberService.createMember(
      params?.data?.id,
      memberData.data
    );

    // generate response
    const response = {
      code: 201,
      status: 'success',
      message: 'Member created successfully',
      data: member,
    };

    // Return the response
    return res.status(201).json(response);
  }
);

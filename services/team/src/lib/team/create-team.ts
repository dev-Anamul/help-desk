import { prisma } from '@/prisma/prisma-client';
import { CreateTeam } from '@/schemas/team';

export const createTeam = async (data: CreateTeam) => {
  return prisma.team.create({ data });
};

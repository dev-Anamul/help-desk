import { Request, Response } from "express";

export const teamByMembersHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Team by members" });
};

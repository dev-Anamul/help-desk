import { Request, Response } from "express";

export const teamByTicketHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Team by ticket" });
};

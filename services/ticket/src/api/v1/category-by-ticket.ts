import { Request, Response } from "express";

export const categoryByTicketHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Category by ticket handler" });
};

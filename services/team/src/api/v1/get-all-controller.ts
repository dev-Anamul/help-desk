import { Request, Response } from "express";

export const getAllHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Get all team" });
};

import { Request, Response } from "express";

export const createHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Create system" });
};

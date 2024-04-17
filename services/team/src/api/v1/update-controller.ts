import { Request, Response } from "express";

export const updateHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Update team" });
};

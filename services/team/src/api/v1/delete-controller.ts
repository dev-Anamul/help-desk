import { Request, Response } from "express";

export const deleteHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Delete team" });
};

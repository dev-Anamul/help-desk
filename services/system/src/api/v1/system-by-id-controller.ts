import { Request, Response } from "express";

export const systemByIdHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Get system by id" });
};

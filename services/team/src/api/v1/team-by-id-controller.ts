import { Request, Response } from "express";

export const teamByIdHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Get team by id" });
};

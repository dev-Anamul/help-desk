import { Request, Response } from "express";

export const userByIdHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "User by id" });
};

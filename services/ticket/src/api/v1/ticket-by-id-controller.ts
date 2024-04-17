import { Request, Response } from "express";

export const ticketByIdHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Ticket by id" });
};

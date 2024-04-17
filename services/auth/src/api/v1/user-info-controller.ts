import { Request, Response } from "express";

export const userInfoHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "User info fetched successfully",
  });
};

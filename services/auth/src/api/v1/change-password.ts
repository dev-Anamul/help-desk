import { Request, Response } from "express";

export const changePasswordHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Password changed successfully",
  });
};

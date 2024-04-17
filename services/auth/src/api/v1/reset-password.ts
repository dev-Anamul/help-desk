import { Request, Response } from "express";

export const resetPasswordHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Password reset successful",
  });
};

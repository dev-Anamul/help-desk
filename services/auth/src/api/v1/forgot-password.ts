import { Request, Response } from "express";

export const forgotPasswordHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Password reset link sent to your email",
  });
};

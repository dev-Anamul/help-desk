import { Request, Response } from "express";

export const updateProfileHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Profile updated successfully",
  });
};

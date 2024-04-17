import { Response, Request } from "express";

export const loginHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Login successful",
  });
};

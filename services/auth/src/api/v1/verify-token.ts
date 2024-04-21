import { Request, Response } from 'express';

export const verifyTokenHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Token verified successfully',
  });
};

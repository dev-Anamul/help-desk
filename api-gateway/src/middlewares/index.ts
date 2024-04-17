import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  },
});

export const applyMiddleware = (app: Application) => {
  // Middlewares
  app.use([cors(), morgan("dev"), helmet(), limiter]);
};

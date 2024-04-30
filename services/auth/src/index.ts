import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';
import { AppError } from './utils/appError';

// env configuration
dotenv.config();

// initialize express
const app = express();

// Middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  morgan('dev'),
]);

// health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: `${process.env.SERVICE_NAME} service is up` });
});

// Routes
app.use('/api', routes);

// 404 error handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
});

// global error handler
app.use(
  (error: AppError, _req: Request, res: Response, _next: NextFunction) => {
    if (error?.isOperational) {
      return res.status(error.statusCode).json({
        code: error.statusCode,
        status: error.status,
        message: error.message,
      });
    }

    console.log(error);

    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again' });
  }
);

// define port
const PORT = process.env.PORT || 5008;

// start server
app.listen(PORT, () => {
  console.log(`${process.env.SERVICE_NAME} is up and running on port ${PORT}`);
});

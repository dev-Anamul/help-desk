import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

// env configuration
dotenv.config();

// initialize express
const app = express();

// Middlewares
app.use([express.json(), cors(), morgan('dev')]);

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
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  res.status(500).json({
    code: 500,
    status: 'error',
    message: 'Internal Server Error. Please try again later.',
  });
});

// define port
const PORT = process.env.PORT || 5006;

// start server
app.listen(PORT, () => {
  console.log(`${process.env.SERVICE_NAME} is up and running on port ${PORT}`);
});

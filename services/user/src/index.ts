import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';

// env configuration
dotenv.config();

// initialize express
const app = express();

// Middlewares
app.use([express.json(), cors(), morgan('dev')]);

// health check
app.get('/health', (_req, res) => {
  console.log('user Id', _req.headers['x-user-id']);

  res
    .status(200)
    .json({ status: `${process.env.SERVICE_NAME} service is up and running` });
});

// Routes
app.use('/api', routes);

// 404 error handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
});

// global error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

// define port
const PORT = process.env.PORT || 5001;

// start server
app.listen(PORT, () => {
  console.log(`${process.env.SERVICE_NAME} is up and running on port ${PORT}`);
});

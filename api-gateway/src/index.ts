import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { useProxyService } from "./proxy-services";
import { applyMiddleware } from "./middlewares";
import * as yaml from "yamljs";
import * as swaggerUi from "swagger-ui-express";

// swagger documentation
const swaggerDocument = yaml.load("./src/spec/openapi.yaml");

// env configuration
dotenv.config();

// initialize express
const app = express();

// Middlewares
applyMiddleware(app);

// health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: `${process.env.SERVICE_NAME} service is up` });
});

// Routes
useProxyService(app);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 error handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

// global error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

// define port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`${process.env.SERVICE_NAME} is up and running on port ${PORT}`);
});

import winston from 'winston';
import 'winston-mongodb';

export const winstonMongoTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URL as string,
  options: { useUnifiedTopology: true },
  metaKey: 'meta',
  level: 'http',
  collection: 'logs',
  storeHost: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  dbName: 'logs',
  label: 'api-gateway',
  name: 'mongodb',
  tryReconnect: true,
});

export const winstonConsoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

import winston from 'winston';
import { winstonConsoleTransport, winstonMongoTransport } from './transports';

const { combine, timestamp, json, simple } = winston.format;

export const logger = winston.createLogger({
  level: 'http',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss SSS A' }), json()),
  defaultMeta: { service: 'api-gateway' },
  transports: [winstonConsoleTransport, winstonMongoTransport],
});
